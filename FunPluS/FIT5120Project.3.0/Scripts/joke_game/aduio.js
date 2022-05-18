//1. Set up background music and sound effect

/*
All background music adopted from Mixkit with 'Mixkit Stock Music Free License'.
https://mixkit.co/ 
*/

var errorSound = new Audio('../../Audio/joke_game/mixkit-click-error-1110.wav');
var clickSound = new Audio('../../Audio/joke_game/mixkit-classic-click-1117.wav');
var postcardSend = new Audio('../../Audio/joke_game/mixkit-melodic-bonus-collect-1938.wav');
var arrowSound = new Audio('../../Audio/joke_game/mixkit-select-click-1109.wav');
var startGame = new Audio('../../Audio/joke_game/mixkit-opening-software-interface-2578.wav');

// https://www.codegrepper.com/code-examples/javascript/how+to+add+sound+onclick+in+html
//Sound effect when the user clicks 'Let's go' button
function startGameSond() {
    startGame.play();
}

//Sound effect when user clicks on any purple button
function purpleClick() {
    clickSound.play();
}

//https://codingshiksha.com/javascript/how-to-play-audio-in-browser-after-few-seconds-delay-using-settimeout-method-in-javascript-full-project-for-beginners/
//Sound effecty after sending out the postcard
function cardSentAudio() {
    setTimeout(function () { postcardSend.play() }, 100);
}