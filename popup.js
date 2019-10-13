let protectionSwitch = document.getElementById('protectionSwitch');
let indicator = document.getElementById('fire');
let changeColor = document.getElementById('changeColor');

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

chrome.storage.sync.get('color', function (data){
    indicator.style.color = data.color;
})

changeColor.onclick = function (element) {
    chrome.storage.sync.get('color', function(data){
        indicator.style.color = data.color;
    });
};