    function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

const msgs = [
  {'message_text': 'I draw art',
  'writer_emotion':'postcardBG_1.png', 
    'reader_emotion': 'happy'
  },
  
  {'message_text': 'I draw art',
  'reader_emotion': 'happy',
  'writer_emotion':'postcardBG_7.png'},
  
  {'message_text': 'I draw art',
  'reader_emotion': null,
  'writer_emotion':'postcardBG_3.png'}
];

const msgs_sent = [
  {'message_text': 'I draw art',
  'writer_emotion':'postcardBG_1.png', 
    'reader_emotion': 'happy'
  },
  
  {'message_text': 'I draw art',
  'reader_emotion': 'happy',
  'writer_emotion':'postcardBG_7.png'},
  
  {'message_text': 'I draw art',
  'reader_emotion': null,
  'writer_emotion':'postcardBG_3.png'}
];


const msgHolder = document.getElementById('msgHolder');
const emotions = document.getElementsByClassName('emotion');

const msgHolder_sent = document.getElementById('msgHolder_sent');


var msgBeingRead

function msgItemCreate(){
  
  for (i = 0; i < msgs.length; i++){
    
    var item = msgs[i]
    const msgItem = document.createElement('BUTTON'); 
    const msgId = document.createElement('p');
    const readIcon = document.createElement('p');
    
    msgItem.classList.add('msgItems'); 
    
    msgId.innerHTML = 'Message #' + (i+1);
    msgItem.setAttribute('value',i);
    
    if (item['reader_emotion'] === undefined || item['reader_emotion'] === null){
      msgItem.setAttribute('name', 'unread');
      readIcon.innerHTML = '<i class="fa-solid fa-envelope"></i>';
      
    } else{
      msgItem.setAttribute('name', 'read');
      readIcon.innerHTML = '<i class="fa-solid fa-envelope-open"></i>';
    };
    
    readIcon.setAttribute('id', 'readIcon');
    msgHolder.appendChild(msgItem);
    msgItem.appendChild(msgId);
    msgItem.appendChild(readIcon);
    
    msgItem.addEventListener("click", function () {
      
    var postcardId = Number(this.value);
    var postcard = msgs[postcardId];
    
    if (postcard['reader_emotion'] === undefined || postcard['reader_emotion'] === null){
      
      changeBg(postcardId, 'postcardD_reading');
      changeText(postcardId, 'postcardContent_reading'); 
    window.location.replace('#readingMsg');
    } else{
      
      changeBg(postcardId, 'postcardD_read');
      changeText(postcardId, 'postcardContent_read'); 
      chosenEmotion(postcardId, 'chosen_' + postcard.reader_emotion);
      window.location.replace('#msgRead'); 

    };
    });
  };
  
  for (x = 0; x < msgs_sent.length; x++){
    
    var item_sent = msgs[i]
    const msgItem_sent = document.createElement('BUTTON'); 
    const msgId_sent = document.createElement('p');
    const readIcon_sent = document.createElement('p');
    readIcon_sent.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    
    msgItem_sent.classList.add('msgItems_sent'); 
    
    msgId_sent.innerHTML = 'Message #' + (x+1);
    msgItem_sent.setAttribute('value',x);
    
    msgHolder_sent.appendChild(msgItem_sent);
    msgItem_sent.appendChild(msgId_sent);
    readIcon_sent.setAttribute('id', 'readIcon');
    msgItem_sent.appendChild(readIcon_sent);
    
    msgItem_sent.addEventListener('click', function(){
      var sentCardId = this.value;
      var sentCard = msgs_sent[sentCardId];
      
      changeBg(sentCardId, 'postcardD_sent');
      changeText(sentCardId, 'postcardContent_sent'); 
    window.location.replace('#msgSent');
    });

};

};

function changeBg(msgId, elementId){
  document.getElementById(elementId).style.backgroundImage =  `url('${msgs[msgId].writer_emotion}')`;
};
  
function changeText(msgId, elementId){
  document.getElementById(elementId).innerHTML = msgs[msgId].message_text;
};

function chosenEmotion(msgId, elementId){
  const emotionChosen = document.getElementById(elementId);
  emotionChosen.style.cssText += 'background:rgba(255, 255, 255, 0.67); border:7px solid #E3FF3F; border-radius: 25px;width: 200px';
};

window.onload(msgItemCreate());