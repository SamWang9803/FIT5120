const openedProj = {
  'Summer Highlight <i class="fa-solid fa-sun"></i>': '../../images/canvas/summerHighlights.png',
    'Spooky Spook <i class="fa-solid fa-ghost"></i>': '../../images/canvas/SpookySpook.png',
    'Into the Jungle <i class="fa-brands fa-pagelines"></i>':'../../images/canvas/IntoTheJungle.png'
}

const iconList = [
  '../../icons/ocean/ocean_whale1.png',
  '../../icons/ocean/ocean_shell.png',
  '../../icons/ocean/ocean_whale2.png',
  '../../icons/ocean/ocean_seal.png'
]

var openedProjKeys = Object.keys(openedProj);
var projName = document.getElementById('projName');
var projIcon = document.getElementById('projIcon');
var projNum = document.getElementById('projNum');
var purchasedSticker_holder = document.getElementById('purchasedSticker_holder');
var stickerCheck_icon = document.getElementById('stickerCheck_icon');

var renewedProj = String(sessionStorage.getItem('renewedProj')).split(',');

var tutePhoto1 = [
    ['../../images/tutePhotos/tute1_tokenShop0.png', 'This is where you can <span>buy the stickers</span> for the <span>art project</span> with the tokens you earned!'],
    ['../../images/tutePhotos/tute1_tokenShop1.png', 'Each sticker costs a token.<br>If you <span>like the sticker</span>, simply <span>press the green button</span> to put it into the shopping cart'],
    ['../../images/tutePhotos/tute1_tokenShop2.png', 'You can also choose <span>different types of stickers</span> here!'],
    ['../../images/tutePhotos/tute1_tokenShop3.png', 'All the stickers you chose can be shown if you click the <span>shopping cart</span> button'],
    ['../../images/tutePhotos/tute1_tokenShop4.png', 'Once you <span>chosoe all the stickers</span>, press the orange button highlighted.'],
    ['../../images/tutePhotos/tute1_tokenShop5.png', 'If you want to <span>make some changes</span>, simply go back by pressing this button'],
    ['../../images/tutePhotos/tute1_tokenShop6.png', 'Once you got the stickers, you can now put them onto the <span>art projects</span>!']
];

var tutePhoto2 = [
    ['../../images/tutePhotos/tute2_chooseProj_1.png', '<span>Every three days</span>, we open up <span>three different art projects</span>.'],
    ['../../images/tutePhotos/tute2_chooseProj_2.png', 'The <span>stickers you bought</span> from the sticker shop can be found here.'],
    ['../../images/tutePhotos/tute2_chooseProj_3.png', 'Once you decide to work on a project, press the green button highlighted!']
];

var tutePhoto3 = [
    ['../../images/tutePhotos/tute2_doProj_0.png', "Let's start working on our art projects!"],
    ['../../images/tutePhotos/tute2_doProj_0_1.png', "After choosing the project to work on, you can now put the <span>stickers into the canvas</span>."],
    ['../../images/tutePhotos/tute2_doProj_1.png', "The sticker will show up in the canvas once you click on it!"],
    ['../../images/tutePhotos/tute2_doProj_2.png', 'To change the <span>colour</span> of the sticker, simply click it once, and then <span>choose a colour option</span> above.'],
    ['../../images/tutePhotos/tute2_doProj_3.png', 'You can also <span>change the size</span> of the sticker by <span>dragging the corner</span>'],
    ['../../images/tutePhotos/tute2_doProj_4.png', "If you <span>don't want</span> to use the sticker, simply <span>double click them</span>"],
    ['../../images/tutePhotos/tute2_doProj_5.png', 'Once you <span>finish the painting</span>, you can see your artwork before submitting it'],
    ['../../images/tutePhotos/tute2_doProj_6.png', "You finished your part of the artwork! The project will be <span>published to our gallery</span> after the project deadline!"]
]

var tute = {
  'tute1':  tutePhoto1,
  'tute2': tutePhoto2, 
  'tute3': tutePhoto3
};

tutePhotoElem = document.getElementById('tutePhoto');
tuteTextElem = document.getElementById('tute').getElementsByTagName('p')[0]

function loadTuteContent(i, tuteId){

  tutePhotoElem.src = tute[tuteId][i][0];

  tuteTextElem.innerHTML = '<br>'+tute[tuteId][i][1];
};


var tagIds = Object.keys(tute);

var sectionId = 1;

var tuteIdx = 0;
var anchor = document.getElementById('tute').getElementsByTagName('a');
var tuteElem = document.getElementById('tute');
var modal = document.getElementById('modal_top');

var clickedTute;

var idx = 0;

window.addEventListener('load', function() {
  clickedTute = 'tute2';
  changeTagColour(clickedTute);
      loadTuteContent(tuteIdx, clickedTute);
      
      document.getElementById('toTutorial').addEventListener('click', function(){
          tuteElem.style.display = 'block';
          modal.style.backgroundColor = 'rgba(0,0,0,0.7)'
          modal.style.zIndex = 4;
      });
    
  Array.from(anchor).forEach((item) => {
    item.addEventListener('click', function(){
      clickedTute = item.id;
      tuteIdx = 0;
      item.style.cssText+= 'background-color: #1C5858; color:white;'
      loadTuteContent(tuteIdx, item.id);
      changeTagColour(item.id);
    })
  });
  
  stickerCheck_icon.addEventListener('click', function(){
    purchasedSticker_holder.style.display = 'flex';
  });
  
  iconList.forEach((item)=>{
      var purchasedSticker = document.createElement('div');


  var stickerImg = document.createElement('img'); 
  stickerImg.src = item;
  purchasedSticker.appendChild(stickerImg);
  purchasedSticker_holder.appendChild(purchasedSticker);
  });
  
  if (renewedProj === undefined || renewedProj === null){
    
    loadProj(idx);
  projNum.innerHTML = (idx +1)+ '/' + openedProjKeys.length;
    
  }else {
    openedProj[renewedProj[0]]= renewedProj[1] + renewedProj[2];
        loadProj(idx);
  projNum.innerHTML = (idx +1)+ '/' + openedProjKeys.length;
  }});

function arrowRight(){
  if (idx === openedProjKeys.length-1){
    idx = 0;
  } else{
    idx +=1
  };
  projNum.innerHTML = (idx +1)+ '/' + openedProjKeys.length
  loadProj(idx);
}

function arrowLeft(){
  if (idx === 0){
    idx = 2;
  } else{
    idx = idx - 1
  };
  
  projNum.innerHTML = (idx +1)+ '/' + openedProjKeys.length
  loadProj(idx);
}

function loadProj(index){
    projName.innerHTML = openedProjKeys[index]; 
  projIcon.src = openedProj[openedProjKeys[index]];
}

function saveChosenProj(){
 
sessionStorage.setItem('chosenProj', [openedProjKeys[idx], openedProj[openedProjKeys[idx]]]); 
}

function closeWindow(elem){
  document.getElementById(elem).style.display = 'none'
}

function changeTagColour(elem_id){
  
  tagIds.forEach((tag) => {
    if (tag === elem_id){ 
    document.getElementById(tag).style.backgroundColor =  '#1C5858'; 
    document.getElementById(tag).style.color = 'white';
  } else{
        document.getElementById(tag).style.backgroundColor ='#56B2E7'; 
    document.getElementById(tag).style.color = '#073853';
  }})
};

function prevPage(){
  var sectionId = clickedTute;
  if (tuteIdx <=0){
    tuteIdx = tute[sectionId].length -1;
  } else{
    tuteIdx = tuteIdx -1;
  };
  
  loadTuteContent(tuteIdx, sectionId)
};

function nextPage(){
  console.log(clickedTute);
  var sectionId = clickedTute;s
  if (tuteIdx === tute[sectionId].length -1){
    tuteIdx = 0;
  } else{
    tuteIdx +=1;
  };
  
  loadTuteContent(tuteIdx, sectionId)
}

function noModal(){
      tuteElem.style.display = 'none';
      modal.style.backgroundColor = 'rgba(0,0,0,0)'
      modal.style.zIndex = -1;
}