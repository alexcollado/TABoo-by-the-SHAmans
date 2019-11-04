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
overlay.style.width = (config.imgWidth + "px");
overlay.style.height = (config.imgHeight + "px");

var context = overlay.getContext('2d');

var i = 0;

for (var j = 0; j < config.imgWidth; j+=10) {
    for (var k = 0; k < config.imgHeight; k+=10) {
        var bg;
        if(config.diffArr[i] == 0){
            bg = "#000000";
        }else{
            bg = "#e74c3c";
        }

        console.log(config.diffArr[i]);

        context.fillStyle = bg;
        context.fillRect(j, k, 10, 10);

        i++;
    }
}

var temp = document.getElementById("overlay");
if ((temp)) {
    console.log("already here...")
    document.body.removeChild(temp);
}
document.body.appendChild(overlay);
