//Choose a postcard design
/*
Change Page3 postcard design based on the user choice

All the postcard designs available for choice are button tags.
When the user clicks on the image, the .postcard div changes its background
to the chosen image.
*/
var imgSrc;

function compose_message() {

    var msg = document.getElementById('gb1_msgBox').innerText;

    msg = msg.replace(/X\n/g, "");
    msg = msg.substring(0, msg.length - 1).match(/[a-z'\.\,\?\!]+/ig);

    document.getElementById('postcardContent').innerHTML = msg.join('  ');
    document.getElementById('finalMsg').innerHTML = msg.join(' ');
}

function chose_postcard() {
    //retrieve postcard tag 
    var btns = document.getElementsByClassName("postcard");

    // for all the buttons of 'postcard' class 
    for (var i = 0; i < btns.length; i++) {
        // add an event listener
        btns[i].addEventListener("click", function () {
            // value is the source/path to the postcard design in the folder
            imgSrc = this.value;
            // the css tag for changing the postcard tag backgroud 
            var commd = `url('${imgSrc}')`;
            //change .postcardD tag's background using commd
            document.getElementById('postcardD').style.backgroundImage = commd;
        });
    };
}