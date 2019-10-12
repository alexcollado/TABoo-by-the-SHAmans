chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ protection: false, tabs: null}, function() {
        console.log("Thank you for installing this extension.")
    });
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    console.log("Activated tabId:" + activeInfo.tabId + " windowID:" + activeInfo.windowId);
    screenshotTab();
    // take a screenshot and every maybe 10s take a screenshot? (if protected)
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status == "complete"){
        console.log("Updated tabId:" + tabId);
        screenshotTab();
    }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    console.log("Removed tabId:" + tabId);
    // remove map entry? if id is in there
});

chrome.storage.onChanged.addListener(function(changes, namespace){
    for(var key in changes){
        if(key == 'protection'){
            console.log('protection changed');
            screenshotTab();
        }
    }
});

function screenshotTab(){
    chrome.storage.sync.get('protection', function(data){
        if(data.protection){
            chrome.tabs.captureVisibleTab(function(dataURL){
                chrome.storage.sync.set({}, function(){

                });
                console.log(dataURL);
            });
            console.log('Taking a screenshot');
        }else{
            console.log('nah');
        }
    })
}