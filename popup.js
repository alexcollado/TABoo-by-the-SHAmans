let protectionSwitch = document.getElementById('protectionSwitch');
let changeColor = document.getElementById('changeColor');
let indicator = document.getElementById('fire');

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
    chrome.storage.sync.get('color', function(data){
        indicator.style.color = data.color;
        alert(data.color);
    });
};