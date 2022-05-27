var tutePhoto1_cf = [
    ['../../images/chattyFish_tute/cflj_1_start.png', '', "Let's start <span>writing a postcard with ChattyFish!</span>"],
    ['../../images/chattyFish_tute/cflj_2_chooseJk0.png', '1. Choose vocabularies', "Before writing a postcard, we need to <span>first get some words</span>"],
    ['../../images/chattyFish_tute/cflj_2_chooseJk1.png', '1. Choose vocabularies', "You can use the <span>words in the lower box</span>, which are <span>chosen from the jokes</span> above"],
    ['../../images/chattyFish_tute/cflj_2_chooseJk2.png', '1. Choose vocabularies', "If you <span>don't like the words</span>, you can <span>press the arrow</span> for more options"],
    ['../../images/chattyFish_tute/cflj_2_chooseJk3.png', '1. Choose vocabularies', "Once you found the <span>words you want to use</span>, press the <span>purple button</span> to start writing!"],
    ['../../images/chattyFish_tute/cflj_3_clickWord.png', '2. Write a message', "With the <span>chosen words</span>, let's <span>write a message</span> for our postcard."],
    ['../../images/chattyFish_tute/cflj_4_writemsg0.png', '2. Write a message', "You can simply <span>click the words</span> in the green and yellow box"],
    ['../../images/chattyFish_tute/cflj_4_writemsg.png', '2. Write a message', "With the words you click, you can write a message like this!"],
    ['../../images/chattyFish_tute/cflj_4_writemsg_finish.png', '2. Write a message', "Once we finish writing the message, we should put it onto a <span>nice postcard</span>"],
    ['../../images/chattyFish_tute/cflj_5_choosepostcard.png', '2. Write a message', "Simply <span>choose the postcard design</span> that you like the most!"],
    ['../../images/chattyFish_tute/cflj_6_finalPc.png', '3. Choose a postcard', "This is our final postcard we will send out to someone at Fun+!"],
    ['../../images/chattyFish_tute/cflj_7_review.png', '4. Reflect on our message', "Before we send our our postcard, we should <span>reflect on our messages</span>."],
    ['../../images/chattyFish_tute/cflj_7_review0.png', '4. Reflect on our message', "<span>How will our messages make the reader feel?</span>"],
    ['../../images/chattyFish_tute/cflj_7_review1.png', '4. Reflect on our message', "Once we <span>reflect on our message</span>, let's send the postcard out!"],
    ['../../images/chattyFish_tute/cflj_8_sent.png', 'Postcard Sent!', "We sent out our postcard! We can either <span>read the messages we received or sent</span> with these buttons!"]];

var tutePhoto2_msg = [
    ['../../images/chattyFish_tute/msg_0.png', 'Messages', "Here we can check all the postcards we got"],
    ['../../images/chattyFish_tute/msg_1_received.png', 'Messages', "If you click <span>'Received'</span>, you can check all the <span>postcards others have sent</span> to you"],
    ['../../images/chattyFish_tute/msg_1_received0.png', 'Messages', "The postcards with <span>closed envelops</span> are the ones we haven't read. Let's click it"],
    ['../../images/chattyFish_tute/msg_2_reading0.png', 'Postcards', "This is the postcard we received."],
    ['../../images/chattyFish_tute/msg_2_reading1.png', 'Postcards Received', "Once we read the postcard, we should <span>tell the writer how their message make us feel</span>."],
    ['../../images/chattyFish_tute/msg_2_reading2.png', 'Postcards Received', "Once we choose how we felt from the postcard, let's send our comment to the writer."],
    ['../../images/chattyFish_tute/msg_3_sent.png', 'Postcards Received', "Now the writer of the postcard knows how we felt of their postcard!<br>They'll <span>earn token based on our comments</span>."],
    ['../../images/chattyFish_tute/msg_4_sent.png', 'Postcards Sent', "Let's check out the postcards we sent out."],
    ['../../images/chattyFish_tute/msg_4_sentCheck.png', 'Postcards Sent', "The messages with the <span>paper planes</span> are the ones we sent out so far."],
    ['../../images/chattyFish_tute/msg_4_sentCheck.png', 'Postcards Sent', "Based on how the readers felt, we will earn the tokens accordingly."],
    ['../../images/chattyFish_tute/msg_5_token.png', 'Messages', "With the tokens earned, we can <span>buy stickers for our artwork</span>!"],
];

var tute = {
    'tute1': tutePhoto1_cf,
    'tute2': tutePhoto2_msg,
};

var tuteElem = document.getElementById('tute_cf_0');
var modal = document.getElementById('modal_top');
var tutePhotoElem = document.getElementById('tutePhoto');
var tuteTitleElem = document.getElementById('jokeTute');
var tuteTextElem = document.getElementById('tuteText');

function loadTuteContent(i, tuteId) {
    document.getElementById('tutePhoto').src = tute[tuteId][i][0];
    document.getElementById('jokeTute').innerHTML = tute[tuteId][i][1];
    document.getElementById('tuteText').innerHTML = '<br>' + tute[tuteId][i][2];
};

var tagIds = Object.keys(tute);

var sectionId = 1;

var tuteIdx = 0;

var clickedTute;

var idx = 0;

window.addEventListener('load', function () {
    clickedTute = 'tute1';

    changeTagColour(clickedTute);
    loadTuteContent(tuteIdx, clickedTute);

    Array.from(document.getElementById('tute_cf_0').getElementsByClassName('aa1')).forEach((item) => {
        item.addEventListener('click', function () {
            clickedTute = item.id;
            tuteIdx = 0;
            item.style.cssText += 'background-color: #1C5858; color:white;'
            loadTuteContent(tuteIdx, item.id);
            changeTagColour(item.id);
        })
    });

});

function directToCompleteTute() {
    if (clickedTute === 'tute1') {
        window.location.href = 'tutorial/tutorial_html_1.html'
    } else {
        window.location.href = 'tutorial/msgTutorial.html'
    };
}

function changeTagColour(elem_id) {

    tagIds.forEach((tag) => {
        if (tag === elem_id) {
            document.getElementById(tag).style.backgroundColor = '#1C5858';
            document.getElementById(tag).style.color = 'white';
        } else {
            document.getElementById(tag).style.backgroundColor = '#56B2E7';
            document.getElementById(tag).style.color = '#073853';
        }
    })
};

function prevPage() {
    var sectionId = clickedTute;
    if (tuteIdx <= 0) {
        tuteIdx = tute[sectionId].length - 1;
    } else {
        tuteIdx = tuteIdx - 1;
    };

    loadTuteContent(tuteIdx, sectionId)
};

function nextPage() {
    var sectionId = clickedTute;
    if (tuteIdx === tute[sectionId].length - 1) {
        tuteIdx = 0;
    } else {
        tuteIdx += 1;
    };

    loadTuteContent(tuteIdx, sectionId)
}

function noModal() {
    document.getElementById('tute_cf_0').style.display = 'none';
    document.getElementById('modal_top').style.backgroundColor = 'rgba(0,0,0,0)'
    document.getElementById('modal_top').style.zIndex = -1;
}

function closeWindow(elem) {
    document.getElementById(elem).style.display = 'none'
}

function displayTute() {
    document.getElementById('tute_cf_0').style.display = 'block';
    document.getElementById('modal_top').style.backgroundColor = 'rgba(0,0,0,0.7)'
    document.getElementById('modal_top').style.zIndex = 10;
}
