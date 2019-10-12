let changeColor = document.getElementById('changeColor');
let protectionSwitch = document.getElementById('protectionSwitch');

protectionSwitch.addEventListener('change', (event) => {
    if(event.target.checked){
        chrome.storage.sync.set({ protection: true}, function() {
            console.log("Protected");
        });
        chrome.storage.sync.get('tabs', function (data){
            // if(data.tabs == null){
                // chrome.storage.sync.set({})
            // }
        });
    }else{
        chrome.storage.sync.set({ protection: false}, function() {
            console.log("Not protected");
        });
        chrome.storage.sync.get('tabs', function (data){
            if(data.tabs == null){
                console.log("Tabs is null");
            }else{
                console.log("Removing the tabs saved in tabs array");
            }
        });
    }
});

chrome.storage.sync.get('protection', function (data){
    protectionSwitch.checked = data.protection;
});

changeColor.onclick = function (element) {
    let color = "red";
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'document.body.style.backgroundColor = "' + color + '";' });
    });
};