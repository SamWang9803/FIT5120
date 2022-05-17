const galleryVar = {
  0:['../../images/demoCompletedProj/manWithTheFlute_frame.png', 21],
    1: ['../../images/demoCompletedProj/strongCinderella_frame.png', 10],
    2: ['../../images/demoCompletedProj/winterWonderland_frame.png', 30],
    3: ['../../images/demoCompletedProj/zombieAttack_frame.png', 6],
}

var gallery = document.getElementById('gallery');
var galleryItems = document.getElementsByClassName('galleryItems');
var galleryVarKeys = Object.keys(galleryVar);

var gallVarIdx = 0;

var iconPathRegex = RegExp('...*');

window.addEventListener('load', function() {
  
      loadGalleryItems(0, gallVarIdx);
      loadGalleryItems(1, gallVarIdx+1);
      
      Array.from(document.getElementsByClassName('galleryButtons')).forEach((item) => {
        item.addEventListener('click', function(){
          var galleryImg = item.parentElement.getElementsByTagName('img')[0];
          var likeNum = String(item.parentElement.getElementsByTagName('p')[0].innerHTML).split('</i> ')[1];

            sessionStorage.setItem('chosenGalleryItem', [galleryImg.src.match(iconPathRegex)[0], likeNum]); 
        
            console.log([galleryImg.src.match(iconPathRegex)[0], likeNum])
            window.location.replace('https://fit5120projectfunplusfinal.azurewebsites.net/Stickers/galleryItemPage');
        })
      })
});

function flipRight(elem){
  
  if (gallVarIdx +1 >= galleryVarKeys.length-1){
    alert("You have reached the last artwork in the gallery!")
  } else{
      gallVarIdx += 1;
  
  loadGalleryItems(0, gallVarIdx);
    loadGalleryItems(1, gallVarIdx+1);

  }

}

function flipLeft(elem){
 if (gallVarIdx-1 <0){
   alert("This is the first piece of artwork in the gallery!")
 } else{
   gallVarIdx = gallVarIdx - 1
   loadGalleryItems(0, gallVarIdx);
   loadGalleryItems(1, gallVarIdx + 1);
 }}

function loadGalleryItems(elemIdx, gallIdx){
  var itemImg = galleryItems[elemIdx].getElementsByTagName('img')[0];
    var itemLikes = galleryItems[elemIdx].getElementsByTagName('p')[0];
    var itemEnter = galleryItems[elemIdx].getElementsByTagName('BUTTON')[0];
    
    itemImg.src = galleryVar[gallIdx][0];
    itemLikes.innerHTML = '<i class="fa-solid fa-heart"></i> '+galleryVar[gallIdx][1];
}