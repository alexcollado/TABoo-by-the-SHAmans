let changeColor = document.getElementById('changeColor');
let protectionSwitch = document.getElementById('protectionSwitch');

protectionSwitch.addEventListener('change', (event) => {
    if(event.target.checked){
        chrome.storage.sync.set({ protection: true}, null);
    }else{
        chrome.storage.sync.set({ protection: false}, null);
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