let screenshotMap = new Map();

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ protection: false, color: "#dadada" }, function () {
        console.log("Thank you for installing this extension.")
    });
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        let matches = tabs[0].url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        let domain = matches && matches[1];
        console.log(domain)
        fetch(`http://taboo-dev.us-east-1.elasticbeanstalk.com/fetchURL?url=${domain}`, {
        method: 'GET',
        })
        .then(response => {
            return response.text()
        })
        .then(data => {
            alert(data)
        })
    });
    screenshotTab(activeInfo.tabId);
    // take a screenshot and every maybe 10s take a screenshot? (if protected)
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        console.log("Updated tabId:" + tabId);
        screenshotTab(tabId);
    }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    chrome.storage.sync.get('protection', function (data) {
        if (data.protection) {
            screenshotMap.delete(tabId);
            console.log("Removed tabId:" + tabId);
        }
    });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        if (key == 'protection') {
            if (changes[key].newValue) {
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
                    screenshotTab(tabArray[0].id);
                });
            } else {
                screenshotMap.clear();
            }
        }
    }
});

function screenshotTab(tabId) {
    chrome.storage.sync.get('protection', function (data) {
        if (data.protection) {
            chrome.tabs.captureVisibleTab(function (dataURL) {
                var oldURL = screenshotMap.get(tabId);
                if (oldURL != undefined) {
                    compareDataURLs(oldURL, dataURL, tabId);
                } else {
                    chrome.storage.sync.set({ color: "#dadada" }, null);
                }
                screenshotMap.set(tabId, dataURL);
            });
        }
    });
}

function compareDataURLs(oldURL, newURL, tabId) {
    var oldImage = new Image();
    var oldPieces = [];

    oldImage.src = oldURL;
    oldImage.onload = function () {
        console.log("loading old image...");
        for (var j = 0; j < oldImage.height; j += 50) {
            for (var k = 0; k < oldImage.width; k += 50) {
                var temp = document.createElement('canvas');
                var context = temp.getContext('2d');
                context.drawImage(oldImage, k, j, 50, 50, 0, 0, 50, 50);
                oldPieces.push(temp.toDataURL());
            }
        }
        console.log("completed loading old image");
    };

    var newImage = new Image();
    var newPieces = [];

    newImage.src = newURL;
    newImage.onload = function (){
        console.log("loading new image...")
        for (var j = 0; j < newImage.height; j += 50) {
            for (var k = 0; k < newImage.width; k += 50) {
                var temp = document.createElement('canvas');
                var context = temp.getContext('2d');
                context.drawImage(newImage, k, j, 50, 50, 0, 0, 50, 50);
                newPieces.push(temp.toDataURL());
            }
        }
        console.log("completed loading new image");

        finishLoading();
    };

    function finishLoading() {
        // go through all of the peices and do the resemble thing, id datamismatch greater than 50, matrix will have a 1, otherwise a 0
        var diff_arr = [];
        alert("Processing...")
        for (var i = 0; (i < oldPieces.length) && (i < newPieces.length); i++) {
            var diff = resemble(oldPieces[i]).compareTo(newPieces[i]).onComplete(function (data) {

                if(data.misMatchPercentage > 0.1){
                    diff_arr.push(1);
                } else {
                    diff_arr.push(0);
                }
                console.log("Processing...", ((diff_arr.length / oldPieces.length) * 100).toFixed(2), '%'); // print progress as a percentage (2 decimal places)

                if (diff_arr.length >= oldPieces.length) {
                    console.log(diff_arr);
                    sendData(diff_arr);
                }

            });

        }
    }

    function sendData(diff_arr) {
        var diff = resemble(oldURL).compareTo(newURL).onComplete(function (data) {
            var temp_color;
            if (data.misMatchPercentage < 10) {
                temp_color = "#2ecc71";
            } else if (data.misMatchPercentage < 40) {
                temp_color = "#f1c40f";
            } else {
                temp_color = "#e74c3c";
            }
            alert('whole data mismatch: ' + data.misMatchPercentage);

            chrome.storage.sync.set({ color: temp_color }, null);

            var diffImage = new Image();
            diffImage.src = data.getImageDataUrl();
            diffImage.onload = function () {
                var config = { diffArr: diff_arr, imgWidth: oldImage.width, imgHeight: oldImage.height };

                chrome.tabs.executeScript(tabId, { code: 'var config = ' + JSON.stringify(config) }, function () {
                    console.log("Sending to tab...")
                    chrome.tabs.executeScript(tabId, { file: 'content.js' }, null);
                });
            }
        });
    }
}