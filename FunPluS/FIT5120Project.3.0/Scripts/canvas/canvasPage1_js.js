var chosenProj = String(sessionStorage.getItem('chosenProj')).split(',');

const iconList = [
  '../../icons/ocean/ocean_whale1.png',
  '../../icons/ocean/ocean_shell.png',
  '../../icons/ocean/ocean_whale2.png',
    '../../icons/ocean/ocean_seal.png'
]


var lastClickedSticker;
var lastPainting;

var stickers = document.getElementsByClassName('sticker');
var stickerSpace = document.getElementById('canvas');
var stickerHolder = document.getElementById('stickerHolder');
var colourOptions = document.getElementsByClassName('colourOption');
var Idx = 0;
var canvasProgress;

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
var tagIds = Object.keys(tute);

var sectionId = 1;

var tuteIdx = 0;
var anchor = document.getElementById('tute').getElementsByTagName('a');
var tuteElem = document.getElementById('tute');
var modal = document.getElementById('modal_top');

var clickedTute;

var idx = 0;

var usedStickersFinal;

function loadTuteContent(i, tuteId){

  tutePhotoElem.src = tute[tuteId][i][0];

  tuteTextElem.innerHTML = '<br>'+tute[tuteId][i][1];
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
  var sectionId = clickedTute;
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

window.addEventListener('load', function() {

    clickedTute = 'tute3';
  changeTagColour(clickedTute);
      loadTuteContent(tuteIdx, clickedTute);

      document.getElementById('toTutorial').addEventListener('click', function(){
          tuteElem.style.display = 'block';
          modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
          modal.style.zIndex = 5;
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

  document.getElementById('getNewProj').addEventListener('click', function(){sendScreenshot();})

  document.getElementById('projTitle').innerHTML = chosenProj[0];

  stickerSpace.style.backgroundImage = `url('${chosenProj[1]}')`;

iconList.forEach((stickerPath) => {
  img = document.createElement('img');
  img.setAttribute('src', stickerPath);
  img.setAttribute('id', 'sticker'+Idx);
  img.classList.add('sticker');
  Idx +=1;

  stickerHolder.appendChild(img);

});

Array.from(stickers).forEach((item) => {
  item.addEventListener('click', function(){

    if (stickerSpace.getElementsByClassName('sticker').length === 3){
      alert('You already used three stickers on the canvas!')
    } else{
          const clone = item.cloneNode(true);
    clone.classList.add('resize-drag');
    clone.setAttribute('name', item.id);
    clone.removeAttribute('id');
    clone.setAttribute('onclick', 'retrieveStickerName(this)')

    stickerSpace.appendChild(clone);

    clone.addEventListener('dblclick', function(){
      document.getElementById(clone.getAttribute("name")).style = 'block';
      this.remove();
    });

    item.style.display = 'none';
    }

  })
});

Array.from(colourOptions).forEach((item) =>{
  item.style.backgroundColor = item.getAttribute("name");
  item.setAttribute('onclick', 'changeStickerColour(this)');
})

});

function changeStickerColour(elem){
  document.getElementsByName(lastClickedSticker)[0].style.cssText += elem.value;
  document.getElementsByName(lastClickedSticker)[0].style.border = null;
}

function retrieveStickerName(elem){
  elem.style.border = 'solid 1px black';
  lastClickedSticker = elem.getAttribute("name");
}

function showColours(){
  document.getElementById('colourButtons').style.display = 'flex';
}

function backToFormerPg(){
  window.location.replace('canvasPage_0.html');
}

function sendScreenshot(){

  sessionStorage.setItem('renewedProj', [chosenProj[0], canvasProgress]);
}

var iconPathRegex = RegExp('/icons.*');

function takeshot() {

    var div = document.getElementById('canvas');
    var usedStickers = Array.from(div.getElementsByTagName('img'));


    if (usedStickers.length <= 0) {
        alert('You need to put at least one sticker!');
    } else {

        usedStickersFinal = usedStickers.map(item => '../..' + String(item.src).match(iconPathRegex)[0]);
        console.log(usedStickersFinal);
        //  document.getElementById('modal_top').style.backgroundColor = rgba(0,0,0,0.25);
        //  document.getElementById('modal_top').style.zIndex = 2;

        if (document.getElementById('output').firstChild) {
            document.getElementById('output').firstChild.remove();
        }

        var canvasCopy = document.getElementById('canvas').cloneNode(true);
        var a = canvasCopy.getElementsByTagName('div')[0];
        a.remove();

        Array.from(canvasCopy.getElementsByTagName('img')).forEach((item) => {
            item.classList.remove('resize-drag');
        });
        console.log(canvasCopy);
        console.log(canvasCopy.style.cssText);
        document.getElementById('output').appendChild(canvasCopy);

        /*document.getElementById('colourButtons').style.display = 'none';

        Array.from(stickerSpace.getElementsByTagName('img')).forEach((image) => {
            image.style.border = null;
        });


        html2canvas(document.body, {
            allowTaint: true,
            foreignObjectRendering: true
        });
        html2canvas(div).then(
            function (canvas) {
                var img = new Image();
                img.id = 'screenShot';
                img.crossOrigin = '*';
                img.setAttribute('crossOrigin', 'anonymous');
                img.src = canvas.toDataURL('image/png');
                canvasProgress = img.src;
                document.getElementById('output').appendChild(img);
            })*/

        document.getElementById('confirmingWindow').style.display = 'flex';
    }
}


function closeWindow(elemId){
  document.getElementById(elemId).style.display = 'none';
}

function disableModal(){
//  document.getElementById('modal_top').style.backgroundColor = rgba(0,0,0,0);
//  document.getElementById('modal_top').style.zIndex = -1;
}


interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 50, height: 50 }
      })
    ],

    inertia: true
  })
.draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener
