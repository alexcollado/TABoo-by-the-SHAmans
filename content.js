// now parse image in 10x10 pixels and map it onto an overlay

// console.log("old:" + config.oldURL);
// console.log("new:" + config.newURL);

var oldURL = config.oldURL;
var newURL = config.newURL;

// console.log(oldURL);
// console.log(newURL);
var image1 = new Image();
image1.src = config.oldURL;
var image2 = new Image();
image2.src = config.newURL;

console.log(config)

var overlay = document.createElement("canvas");
overlay.id = "overlay";
overlay.style.backgroundColor = config.color;
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.pointerEvents = "none";
overlay.style.opacity = "0.2";
overlay.style.margin = "0";
overlay.style.padding = "0";
overlay.style.width = (config.imgWidth + "px");
overlay.style.height = (config.imgHeight + "px");

var temp = document.getElementById("overlay");
if((temp)){
    console.log("already here...")
    document.body.removeChild(temp);
}
document.body.appendChild(overlay);
