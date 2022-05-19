const x = document.getElementById('modal_top'); 
var emotions = document.getElementsByClassName('emotion');
var demoEmotion = document.getElementById('demoEmotion');
var guide_sent = document.getElementById('guide_sent').getElementsByTagName('p')[0];

var emotionClicked = false;

var introWords = {
  1: 'Here, we can check the postcards we received from others.',
  2: "We have received one postcard from someone! Let's check it out!",
  3: "Once we read the postcard, we'll tell the writer on how we felt by reading the message they wrote.",
  4: "By telling the writer on how we felt of their message, we can help them reflect on the message they write to others.", 
  5: "Once we chose the emotion we perceived from the message, let's send the comment back to the writer!",
  6: 'The writer of the postcard will get some tokens based on our comment.',
  7: "Let's check out the postcard we sent out just now!",
  8: "As such, to get more tokens, we should do our best send out positive postcards!"
};

const z_index = {
  1: ['receivedDir', 3],
  2: ['demoReceivedPC', 3], 
  3: ['postcardD_reading', 3], 
  4: ['emotionButtons', 3], 
  5: ['evalFinished', 3], 
  6: ['evalFinishedMsg', 3], 
  7: ['backToSent', 3], 
  8: ['sentCommented', 3]
}
  
window.addEventListener('load', function() {
   x.style.backgroundColor = 'rgba(0,0,0,0.5)';
   Array.from(emotions).forEach((item) => {item.setAttribute('onclick', 'checkEmotionClicked()')})});
   
function zIndexNextBubble(idx){
  document.getElementById(z_index[idx][0]).style.zIndex = z_index[idx][1];
}; 

function checkEmotionClicked(){
  emotionClicked = true; 
};

function nextBubble(elem, idx){
  var cbt_p = elem.parentElement.getElementsByClassName('intro')[0];
  
  cbt_p.innerHTML = introWords[idx];
  elem.setAttribute('onclick', `nextBubble(this, ${idx+1})`)
  
  zIndexNextBubble(idx);
  
  if (idx === 2){
    document.getElementById('checkMsg').style.display = 'block'; 
    elem.remove();
    
  } else if (idx === 5){
      document.getElementById('cursur_sendMsg').style.opacity = 1;
      elem.remove();
      document.getElementById('evalFinished').addEventListener('click', function(){

        if (emotionClicked === true){
          window.location.replace('#emotionChecked');
        } else{
          document.getElementById('emotionButtons').style.border = '5px solid red';
        };
        
      });
    } else if (idx === 7){
      elem.remove();
      document.getElementById('cursur_sentMsg').style.display = 'block';
      document.getElementById('sentDemo').style.zIndex = 3;
      
      demoEmotion.innerHTML = '<i class="fa-solid fa-face-laugh"></i>';
    };
    
};

function iconBlink(){
  demoEmotion.style.animation = 'blinks 1.7s';
  document.getElementById('cursur_sentMsgClick').style.display = 'block';
}

function openSentMessage(){
  window.location.replace('#msgSent');
  document.getElementById('sentCommented').style.zIndex = 3;
}

function tokenWindow(){
  document.getElementById('tokenNotice').style.display = 'block';
  document.getElementsByClassName('token')[0].style.animation = 'tokenEnlarge 1.5s ease-in-out 2';
  guide_sent.innerHTML = 'It looks like your postcard made the reader felt happy! Thank you for sending out positive postcard!';
}

function finishTutorial(){
  window.location.replace('#finishTutorial');
  
  x.style.backgroundColor = 'rgba(0,0,0,0)';
  document.getElementById('finished').style.marginLeft = '0';
  document.getElementById('finishedNotification').style.opacity = 1;
  document.getElementsByClassName('token')[1].style.animation = 'tokenEnlarge 1.5s ease-in-out 2';
}