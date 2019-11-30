let protectionSwitch = document.getElementById('protectionSwitch');
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

chrome.storage.sync.get('color', function (data){
    indicator.style.color = data.color;
})

window.onload = function() {
    document.getElementById("changeColor").onclick = function fun() {
        fetch(`http://127.0.0.1:5000/fetchURL?url=youtube.com`, {
            method: 'GET',
        })
        .then(response => {
            console.log(response)
        })
    }
}