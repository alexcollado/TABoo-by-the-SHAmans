let screenshotMap = new Map();

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ protection: false, color: "#dadada" }, function() {
        console.log("Thank you for installing this extension.")
    });
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    screenshotTab(activeInfo.tabId);
    // take a screenshot and every maybe 10s take a screenshot? (if protected)
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status == "complete"){
        console.log("Updated tabId:" + tabId);
        screenshotTab(tabId);
    }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    chrome.storage.sync.get('protection', function(data){
        if(data.protection){
            screenshotMap.delete(tabId);
            console.log("Removed tabId:" + tabId);
        }
    });
});

chrome.storage.onChanged.addListener(function(changes, namespace){
    for(var key in changes){ 
        if(key == 'protection'){
            if(changes[key].newValue){
                chrome.tabs.query({currentWindow: true, active: true}, function(tabArray){
                    screenshotTab(tabArray[0].id);
                });
            }else{
                screenshotMap.clear();
            }
        }
    }
});

function screenshotTab(tabId){
    chrome.storage.sync.get('protection', function(data){
        if(data.protection){
            chrome.tabs.captureVisibleTab(function(dataURL){
                console.log(dataURL);
                var oldURL = screenshotMap.get(tabId);
                if(oldURL != undefined){
                    compareDataURLs(oldURL, dataURL);
                }else{
                    chrome.storage.sync.set({color: "#dadada"}, null);
                }
                screenshotMap.set(tabId, dataURL);
                console.log(screenshotMap.keys());
            });
        }
    });
}

function compareDataURLs(oldURL, newURL){
    console.log("already contains a screenshot");
    var diff = resemble(oldURL).compareTo(newURL).onComplete(function(data){
        console.log(data);
        console.log(data.getImageDataUrl());
        var temp;
        if(data.misMatchPercentage < 10){
            temp = "#2ecc71";
        }else if(data.misMatchPercentage < 40){
            temp = "#f1c40f";
        }else{
            temp = "#e74c3c";
        }
        chrome.storage.sync.set({color: temp}, null);
        // now parse image in 10x10 pixels and map it onto an overlay?
    });
}