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
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            console.log(tabs[0].url);
            let matches = tabs[0].url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            let domain = matches && matches[1];
            console.log(domain)
            fetch(`http://taboo-dev.us-east-1.elasticbeanstalk.com/addURL?url=${domain}`, {
            method: 'GET',
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data)
            })
        });
    }
}