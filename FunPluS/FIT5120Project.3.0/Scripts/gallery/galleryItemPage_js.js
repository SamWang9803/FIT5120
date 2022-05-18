const artDetail = {
    '../../images/demoCompletedProj/manWithTheFlute_frame.png': ['../../images/canvasProjBg/PublicGarden.jpg', 32, 11],
    '../../images/demoCompletedProj/strongCinderella_frame.png': ['../../images/canvasProjBg/BackyardGarden.jpg', 23, 8],
    '../../images/demoCompletedProj/winterWonderland_frame.png': ['../../images/canvasProjBg/ChristmasWinterBackground_jpg-01.jpg', 33, 11],
    '../../images/demoCompletedProj/zombieAttack_frame.png': ['../../images/canvasProjBg/Bus.jpg', 24, 8],
}
var chosenArt = String(sessionStorage.getItem('chosenGalleryItem')).split(',');
var chosenArtSrc = chosenArt[0];
var chosenArtLikes= chosenArt[1];

//var originalBg = artDetail[chosenArtSrc][0];
//var stickerUsed = artDetail[chosenArtSrc][1];
//var usersParticipated = artDetail[chosenArtSrc][2];

var voteCount = 0;
var original = document.getElementById('originalBg').getElementsByTagName('img')[0];

window.addEventListener('load', function() {
  
  var chosenArtwork = document.getElementById('chosenArtwork');
  chosenArtwork.addEventListener('click', function(){
    document.getElementById('originalBg').style.display = 'block';
  });
  
  chosenArtwork.src = chosenArtSrc;
  //original.src = originalBg;
  
    document.getElementById('vote').innerHTML = '<i class="fa-solid fa-heart fa-flip" style="--fa-animation-duration: 2s;"></i> ' + chosenArtLikes;
    //document.getElementById('artworkDetail').innerHTML = 'This awesome artwork is created by <span>' + usersParticipated + ' users</span> with <span>' + stickerUsed + ' stickers</span>!'
})

function closeWindow(elem){
  document.getElementById(elem).style.display = 'none'
}



function addVote(elem){
  voteCount+=1;
  console.log(voteCount);
  if (voteCount >3){
    alert('You can give only three votes per artwork!');
  } else{
    elem.innerHTML = '<i class="fa-solid fa-heart fa-flip" style="--fa-animation-duration: 2s;"></i> '+ (Number(chosenArtLikes) + voteCount);
  }
}