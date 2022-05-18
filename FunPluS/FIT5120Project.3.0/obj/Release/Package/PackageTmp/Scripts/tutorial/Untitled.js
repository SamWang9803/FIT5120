var arrowSound = new Audio('../../Audio/joke_game/mixkit-select-click-1109.wav');
var givenWords = document.getElementById('gwList').getElementsByClassName('extVoc');
var chosenWords = document.getElementById('cwList').getElementsByClassName('voc');
var msgBox = document.getElementById('gb1_msgBox');
var clearButton = document.getElementById('clearButton');
var postcardBG = document.getElementById('postcardD');
var emotions = document.getElementsByClassName('emotion');
const x = document.getElementById('modal_top');

var demoSentence = {'I':'given', 'love':'given',
'gorillas':'chosen', '&':'given', 'their':'given', 'big':'chosen',
'nostrils':'chosen',
'<i class="fa-solid fa-face-grin-squint"></i>':'given'};

var arrows = [document.getElementById('arrow_left'),
      document.getElementById('arrow_right')];


const introWords = {
  1: "With ChattyFish LoveJokes, we are going to <span style = 'color: green'>write a positive postcard</span> with some words we choose.",
  2: "By writing a <span style = 'color: green'>positive message on the postcard</span>, we will earn some tokens for fun activities!",
  3: "What are we waiting for?<br>Let's get started!",
  4: "We can get the words given here!",
  5: 'These words are selected from some funny jokes here.',
  6: "If you don't like these words, simply click this button to check out more options.",
  7: "Let's use these words for our postcard for now.",
  8: "If you hover words in 'given words', you can see more options available.",
  9: "Here are the 'chosen words' that we obtained just now.",
  10: "Word block appears in this box whenever you click a word.",
  11: "With the words we chose, we can write a message like this.",
  12: "If you want to choose other words for the message, you can click this button to go back.",
  13: "If you want to rewrite the message, you can click this button.",
  14: "For now, let's try to send this message out!",
  15: "Here, you can choose different design of the postcard.",
  16: "And this will be the postcard we'll send out.",
  17: "Now we finished everything, should we sent it out?",
  18: "Will our message make someone <span style = 'color: green'>happy?</span>",
  19: "Will it sound <span style = 'color: orange'>neutral?</span>",
  20: "Or will it <span style = 'color: brown'>offend</span> someone?",
  21: "Before sending out postcards, we should always think of how it could make others feel!",
  22: "Once we reflect on our message, we can finally send out our postcard.",
  24: "Based on how the reader feels about our postcard, we'll be able to earn the tokens.",
  25: "We'll also receive postcard from others, and tell them how we felt of their postcards.",
  26: "Let's go and check if we got some postcards!"
};

const z_index = {
  1: ['gameLogo', 3],
  2: ['gameLogo', 1],
  3: ['letsgo', 3],
  4: ['gb2', 3],
  5: ['gb1', 3],
  6: ['gb1', 3],
  7: ['gb2', 3],
  8: ['givenWords', 3],
  9: ['chosenWords', 3],
  10:['gb1_msgBox', 3],
  11:['gb1_msgBox', 3],
  12: ['changeWords', 3],
  13: ['clearButton', 3],
  14: ['choosePostcard', 3],
  15: ['postcardBox', 3],
  16: ['postcardD', 3],
  17: ['sendout', 3],
  18:['happy', 3],
  19:['neutral', 3],
  20: ['offen', 3],
  21: ['postcardTextFinal', 3],
  22: ['empathyFinished', 3],
  24: ['tokenRule', 3],
  25: ['tokenRule', 3],
  26: ['checkPC', 3]
};

function zIndexNextBubble(idx){
  document.getElementById(z_index[idx][0]).style.zIndex = z_index[idx][1];
}

function nextBubble(elem, idx){
  var cbt_p = elem.parentElement.getElementsByClassName('intro')[0];

  var cursor = document.getElementById('cursur_top');
  var letgo = document.getElementById('letsgo');

  cbt_p.innerHTML = introWords[idx];
  elem.setAttribute('onclick', `nextBubble(this, ${idx+1})`)

  zIndexNextBubble(idx);

  if (idx === 3){
    document.getElementById('cursur_top').style.display = 'block';
    elem.remove();
    document.getElementById('letsgo').addEventListener('click', function(){
      window.location.replace('#page1');
      loadJokes(1);
    })

  } else if (idx === 6){
      arrows.forEach((item) => {item.style.animation = 'cursorJump 1s infinite'});

    } else if (idx == 7){
      document.getElementById('cursur_page1').style.display = 'block';
      arrows.forEach((item) => {
        item.style.animation = null;
        item.setAttribute('onclick', null); });
      loadJokes(4);
      elem.remove();
      document.getElementById('takeWordsButton').addEventListener('click', function(){
        window.location.replace('#page2');})

    } else if (idx === 8){
      document.getElementById('chosenWords').style.zIndex = 0;
      document.getElementById('cursur_givenWords').style.display = 'block';
      document.getElementById('demoBox').style.display = 'block';

    } else if (idx === 9){
       document.getElementById('givenWords').style.zIndex = 0;
      document.getElementById('cursur_givenWords').style.display = 'none';
      document.getElementById('demoBox').style.display = 'none';

    }else if (idx === 10){
      addWordBox_demo('chosen', 'gorillas');
      document.getElementById('cursur_chosenWords').style.display = 'block';

    } else if (idx === 11){
      clearMsg();
      document.getElementById('cursur_chosenWords').style.display = 'none';

      Object.keys(demoSentence).forEach((key) =>
      addWordBox_demo(demoSentence[key], key));

    } else if (idx === 14){
      document.getElementById('changeWords').style.zIndex = 0;
      clearButton.setAttribute('onclick', null);
      clearButton.style.zIndex = 0;

      clearMsg();

      Object.keys(demoSentence).forEach((key) =>
      addWordBox_demo(demoSentence[key], key));
      elem.remove();

      document.getElementById('cursur_page2').style.display = 'block';
      document.getElementById('choosePostcard').addEventListener('click', function(){
        window.location.replace('#page3');})

    } else if (idx === 17){
      document.getElementById('cursur_page3').style.display = 'block';
      elem.remove();
      document.getElementById('sendout').addEventListener('click', function(){
        window.location.replace('#page4');})

    } else if (idx === 19){
      document.getElementById('happy').style.zIndex = 0;
      document.getElementById('offen').style.zIndex = 0;

    } else if (idx === 20){
      document.getElementById('happy').style.zIndex = 0;
      document.getElementById('neutral').style.zIndex = 0;

    } else if (idx === 21){
      Array.from(emotions).forEach((item) => {item.style.zIndex = 3})

    }else if (idx === 22){
          document.getElementById('cursur_page4').style.display = 'block';
          elem.remove();
          document.getElementById('empathyFinished').addEventListener('click', function(){
            window.location.replace('#page5')})
      } else if (idx === 26){
        document.getElementById('checkMsg').style.display = 'block';
          elem.remove();
          document.getElementById('empathyFinished').addEventListener('click', function(){
            window.location.replace('#page5')})
      };
};


var jks =
{1:["Two <span style = 'color:#F707C2'>artists</span> had an art <span style = 'color:#F707C2'>contest</span>... <br><br> It <span style = 'color:#F707C2'>ended</span> in a <span style = 'color:#F707C2'>draw</span>",
['artists', 'contest', 'ended', 'draw']],
2:["What did the <span style = 'color:#F707C2'>number</span> <span style = 'color:#F707C2'>zero</span> say to the number eight? <br>' <span style = 'color:#F707C2'>Nice</span> <span style = 'color:#F707C2'>belt</span>.'",
['number', 'zero', 'nice', 'belt']],
3:["<span style = 'color:#F707C2'>Knock</span> Knock Who's there <span style = 'color:#F707C2'>Boo</span>!! <br>Boo who? <br>Don't <span style = 'color:#F707C2'>cry</span>, it's only a <span style = 'color:#F707C2'>joke</span>",
['knock', 'boo', 'cry', 'joke']],
4:["Why do <span style = 'color:#F707C2'>gorillas</span> have such <span style = 'color:#F707C2'>big</span> <span style = 'color:#F707C2'>nostrils</span>? <br>Cos they got big <span style = 'color:#F707C2'>fingers</span>.",
['gorillas', 'big', 'nostrills', 'fingers']]};


function loadJokes(jk_idx){
  var jokeHolder = document.getElementById('jokeText');
  var wordBox = document.getElementById('tb2');
  var jokeID = document.getElementById('jokeNum');

  jokeHolder.innerHTML = jks[jk_idx][0];
  wordBox.innerHTML= jks[jk_idx][1].join('&emsp;');
  jokeID.innerHTML = jk_idx + '/4'
}

// when clicking on the right arrow
function flipRight(){
  var jkID = Number(document.getElementById('jokeNum').innerHTML[0]);
  if (jkID<4){
    // change jkID by adding 1
    jkID = jkID + 1;
  } else{
    // return to the first joke if jkID >4
    jkID = 1
  }

  loadJokes(jkID);
  arrowSound.play();
};

function flipLeft(){
  var jkID = Number(document.getElementById('jokeNum').innerHTML[0]);
  console.log(jkID);
  if (jkID>1){
    jkID = jkID - 1;
  } else{
    // return to the last joke if jkID >1
    jkID = 4
  }

  loadJokes(jkID);
  arrowSound.play();
};

// sound effect when the user clicks on the arrow
function playArrowSound(){
  arrowSound.play();
}

function clearMsg(){
  // get the latest msgbox status (gb1_msgBox)
  const msgbox = document.getElementById('gb1_msgBox');

  // remove all the contents within gb1_msgBox div tag
  while (msgbox.firstChild) {
    msgbox.removeChild(msgbox.lastChild);
  };
};

function addWordBox(property, elem){
  var wordBlock = document.createElement('div');
  wordBlock.classList.add('wordSelected');
  wordBlock.innerHTML = elem.innerHTML;

  var closeButton = document.createElement('BUTTON');
  closeButton.innerHTML = 'X';
  closeButton.setAttribute('id', 'closingButton');
  closeButton.setAttribute('onclick', 'closeButton(this)');

  wordBlock.appendChild(closeButton);

  if (property === 'chosen'){
    wordBlock.setAttribute('id', 'cwSelected');
  }else{
    wordBlock.setAttribute('id', 'gwSelected');
  };

  msgBox.appendChild(wordBlock);
}

function closeButton(elem){
  elem.parentNode.remove();
}

function addWordBox_demo(property, wd){
  var wordBlock = document.createElement('div');
  wordBlock.classList.add('wordSelected');
  wordBlock.innerHTML = wd;

  if (property === 'chosen'){
    wordBlock.setAttribute('id', 'cwSelected');
  }else{
    wordBlock.setAttribute('id', 'gwSelected');
  };

  msgBox.appendChild(wordBlock);
}

function closeButton(elem){
  elem.parentNode.remove();
}

function changePostcardDesign(elem){
  postcardBG.style.backgroundImage = `url(${elem.value})`;
}

postcards = document.getElementsByClassName('postcard');


window.addEventListener('load', function() {
   x.style.backgroundColor = 'rgba(0,0,0,0.5)';

   Array.from(givenWords).forEach((item) =>
   {item.addEventListener('click', function (){addWordBox('given', this)})});

   Array.from(chosenWords).forEach((item) =>
   {item.addEventListener('click', function (){addWordBox('chosen', this)})});

   Array.from(postcards).forEach((item) =>
   {item.addEventListener('click', function (){changePostcardDesign(this)})});

}
   );
