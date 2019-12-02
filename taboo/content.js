// there's a bug where when switching back and there's already an overlay,
// it will take a screenshot with the overlay on top --> will consider it different than before
//
// remove overlay before taking screenshot

console.log(config)

var overlay = document.createElement("canvas");
overlay.id = "overlay";
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.pointerEvents = "none";
overlay.style.opacity = "0.2";
overlay.style.margin = "0";
overlay.style.padding = "0";
overlay.style.zIndex = "100";
overlay.width = config.imgWidth;
overlay.height = config.imgHeight; 
var context = overlay.getContext('2d');

//its something with overlay width and height i think -- default is used for some reason

var i = 0;

for (var j = 0; j < config.imgHeight; j+=50) {
    for (var k = 0; k < config.imgWidth; k+=50) {
        var bg;
        if(config.diffArr[i] == 0){
            bg = "#000000";
        }else{
            bg = "#e74c3c";
        }

        console.log(config.diffArr[i]);

        context.fillStyle = bg;
        context.fillRect(k, j, 50, 50);

        i++;
    }
}

var temp = document.getElementById("overlay");
if ((temp)) {
    console.log("already here...")
    document.body.removeChild(temp);
}
document.body.appendChild(overlay);
