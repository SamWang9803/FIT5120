var userToken = document.getElementById('tokenNum').innerHTML;

const iconList = {
'../../icons/ocean/ocean_whale1.png': [1, 'ocean'],
'../../icons/ocean/ocean_shell.png': [1, 'ocean'],
'../../icons/ocean/ocean_whale2.png': [1, 'ocean'],
'../../icons/ocean/ocean_seal.png': [1, 'ocean'],
'../../icons/ocean/ocean_duckfeet.png': [1, 'ocean'],
'../../icons/ocean/ocean_fish4.png': [1, 'ocean'],
'../../icons/ocean/ocean_crab.png': [1, 'ocean'],
'../../icons/ocean/ocean_sailboat.png': [1, 'ocean'],
'../../icons/ocean/ocean_seahorse.png': [1, 'ocean'],
'../../icons/ocean/ocean_coral1.png': [1, 'ocean'],
'../../icons/ocean/ocean_fish3.png': [1, 'ocean'],
'../../icons/ocean/ocean_shark.png': [1, 'ocean'],
'../../icons/ocean/ocean_fish2.png': [1, 'ocean'],
'../../icons/ocean/ocean_coral2.png': [1, 'ocean'],
'../../icons/ocean/ocean_fish1.png': [1, 'ocean'],
'../../icons/ocean/ocean_dolphine.png': [1, 'ocean'],
'../../icons/ocean/ocean_ship2.png': [1, 'ocean'],
'../../icons/ocean/ocean_shrimp.svg': [1, 'ocean'],
'../../icons/ocean/ocean_ship1.png': [1, 'ocean'],
'../../icons/ocean/ocean_octopus.png': [1, 'ocean'],
'../../icons/ocean/ocean_shellPearl.png': [1, 'ocean'],
'../../icons/ocean/ocean_seeweed.png': [1, 'ocean'],
'../../icons/ocean/ocean_manetee.png': [1, 'ocean'],
'../../icons/ocean/ocean_nemo.png': [1, 'ocean'],
'../../icons/ocean/ocean_boat.png': [1, 'ocean'],
'../../icons/transport/transport_taxii.png': [1, 'transport'],
'../../icons/transport/transport_trolley.png': [1, 'transport'],
'../../icons/transport/transport_helicopter.png': [1, 'transport'],
'../../icons/transport/transport_tracktor.png': [1, 'transport'],
'../../icons/transport/transport_truck4.png': [1, 'transport'],
'../../icons/transport/transport_car1.png': [1, 'transport'],
'../../icons/transport/transport_f1.png': [1, 'transport'],
'../../icons/transport/transport_plane.png': [1, 'transport'],
'../../icons/transport/transport_car2.png': [1, 'transport'],
'../../icons/transport/transport_truck2.png': [1, 'transport'],
'../../icons/transport/transport_truck3.png': [1, 'transport'],
'../../icons/transport/transport_truck1.png': [1, 'transport'],
'../../icons/transport/transport_train.png': [1, 'transport'],
'../../icons/transport/transport_bike.png': [1, 'transport'],
'../../icons/clothes/clothes_shoe.png': [1, 'clothes'],
'../../icons/clothes/clothes_suit.png': [1, 'clothes'],
'../../icons/clothes/clothes_dress.png': [1, 'clothes'],
'../../icons/clothes/clothes_pants.png': [1, 'clothes'],
'../../icons/clothes/clothes_skirt.png': [1, 'clothes'],
'../../icons/clothes/clothes_shortShirt.png': [1, 'clothes'],
'../../icons/clothes/clothes_tshirt1.png': [1, 'clothes'],
'../../icons/clothes/clothes_tshirt2.png': [1, 'clothes'],
'../../icons/clothes/clothes_tshirt3.png': [1, 'clothes'],
'../../icons/clothes/clothes_sock.png': [1, 'clothes'],
'../../icons/clothes/clothes_beanie.png': [1, 'clothes'],
'../../icons/clothes/clothes_pullover.png': [1, 'clothes'],
'../../icons/magic/ghost.svg': [1, 'magic'],
'../../icons/magic/magic_alien1.png': [1, 'magic'],
'../../icons/magic/magic_fairyMale.png': [1, 'magic'],
'../../icons/magic/magic_alien2.png': [1, 'magic'],
'../../icons/magic/magic_pegasus.png': [1, 'magic'],
'../../icons/magic/magic_ocean_mermaidMale.png': [1, 'magic'],
'../../icons/magic/magic_fairyFemale.png': [1, 'magic'],
'../../icons/magic/magic_robot.png': [1, 'magic'],
'../../icons/magic/magic_magidLamp.png': [1, 'magic'],
'../../icons/magic/magic_witch.png': [1, 'magic'],
'../../icons/magic/magic_genome.png': [1, 'magic'],
'../../icons/magic/magic_dragon1.png': [1, 'magic'],
'../../icons/magic/magic_unicorn.png': [1, 'magic'],
'../../icons/magic/magic_dragon2.png': [1, 'magic'],
'../../icons/magic/magic_monster3.png': [1, 'magic'],
'../../icons/magic/magic_monster2.png': [1, 'magic'],
'../../icons/magic/magic_ocean_mermaidFemale.png': [1, 'magic'],
'../../icons/magic/magic_monster1.png': [1, 'magic'],
'../../icons/art/art_trumpet.png': [1, 'art'],
'../../icons/art/art_drum2.png': [1, 'art'],
'../../icons/art/art_speaker.png': [1, 'art'],
'../../icons/art/art_piano.png': [1, 'art'],
'../../icons/art/art_drum1.png': [1, 'art'],
'../../icons/art/art_xylophone.png': [1, 'art'],
'../../icons/art/art_origami.png': [1, 'art'],
'../../icons/art/art_note2.png': [1, 'art'],
'../../icons/art/art_note3.png': [1, 'art'],
'../../icons/art/art_violin.png': [1, 'art'],
'../../icons/art/art_note1.png': [1, 'art'],
'../../icons/art/art_model.png': [1, 'art'],
'../../icons/art/art_note4.png': [1, 'art'],
'../../icons/art/image12.png': [1, 'art'],
'../../icons/art/art_saxophone.png': [1, 'art'],
'../../icons/art/art_clown.png': [1, 'art'],
'../../icons/art/art_harp.png': [1, 'art'],
'../../icons/art/art_palette.png': [1, 'art'],
'../../icons/art/art_easle.png': [1, 'art'],
'../../icons/art/art_base.png': [1, 'art'],
'../../icons/art/art_molla.png': [1, 'art'],
'../../icons/art/art_jing.png': [1, 'art'],
'../../icons/art/art_flute2.png': [1, 'art'],
'../../icons/art/art_flute1.png': [1, 'art'],
'../../icons/art/art_guitar.png': [1, 'art'],
'../../icons/body/body_nose.png': [1, 'body'],
'../../icons/body/body_heart.png': [1, 'body'],
'../../icons/body/body_mustache.png': [1, 'body'],
'../../icons/body/body_eye.png': [1, 'body'],
'../../icons/body/body_tougne.png': [1, 'body'],
'../../icons/body/body_foot.png': [1, 'body'],
'../../icons/body/body_lip.png': [1, 'body'],
'../../icons/body/body_ear.png': [1, 'body'],
'../../icons/body/body_bone.png': [1, 'body'],
'../../icons/body/body_eyes.png': [1, 'body'],
'../../icons/bugs/bug_insect_spider.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_beehive.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_mosquito.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_butterfly.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_catepillar.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_grasshopper.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_beatle.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_spiderweb.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_ladybug.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_worm.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_beatle2.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_bee.png': [1, 'bugs'],
'../../icons/bugs/bug_insect_snail.png': [1, 'bugs'],
'../../icons/emoji/face-grin-tongue-wink.svg': [1, 'emoji'],
'../../icons/emoji/face-laugh.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-tongue.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-squint-tears.svg': [1, 'emoji'],
'../../icons/emoji/face-laugh-wink.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-wink.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-tongue-squint.svg': [1, 'emoji'],
'../../icons/emoji/face-smile-wink.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-stars.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-squint.svg': [1, 'emoji'],
'../../icons/emoji/face-smile.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-hearts.svg': [1, 'emoji'],
'../../icons/emoji/face-surprise.svg': [1, 'emoji'],
'../../icons/emoji/face-kiss-wink-heart.svg': [1, 'emoji'],
'../../icons/emoji/face-smile-beam.svg': [1, 'emoji'],
'../../icons/emoji/face-grin.svg': [1, 'emoji'],
'../../icons/emoji/face-kiss.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-beam.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-wide.svg': [1, 'emoji'],
'../../icons/emoji/face-grin-tears.svg': [1, 'emoji'],
'../../icons/emoji/face-laugh-beam.svg': [1, 'emoji'],
'../../icons/emoji/face-kiss-beam.svg': [1, 'emoji'],
'../../icons/emoji/face-laugh-squint.svg': [1, 'emoji'],
'../../icons/emoji/heart.svg': [1, 'emoji'],
'../../icons/nature/nature_tree4.png': [1, 'nature'],
'../../icons/nature/nature_tree5.png': [1, 'nature'],
'../../icons/nature/nature_tree.svg': [1, 'nature'],
'../../icons/nature/nature_sky_snow.png': [1, 'nature'],
'../../icons/nature/nature_tree6.png': [1, 'nature'],
'../../icons/nature/nature_tree2.png': [1, 'nature'],
'../../icons/nature/nature_tree3.png': [1, 'nature'],
'../../icons/nature/nature_tree1.png': [1, 'nature'],
'../../icons/nature/nature_sky_cloud.png': [1, 'nature'],
'../../icons/nature/nature_snowman.png': [1, 'nature'],
'../../icons/nature/nature_sky_planet.png': [1, 'nature'],
'../../icons/nature/nature_leaf.svg': [1, 'nature'],
'../../icons/nature/nature_cactus.png': [1, 'nature'],
'../../icons/nature/nature_water.png': [1, 'nature'],
'../../icons/nature/nature_island.png': [1, 'nature'],
'../../icons/nature/nature_mushroom.png': [1, 'nature'],
'../../icons/nature/nature_sky_star.png': [1, 'nature'],
'../../icons/nature/nature_bark.png': [1, 'nature'],
'../../icons/nature/nature_flower3.png': [1, 'nature'],
'../../icons/nature/nature_earth.svg': [1, 'nature'],
'../../icons/nature/nature_flower2.png': [1, 'nature'],
'../../icons/nature/nature_donguri.png': [1, 'nature'],
'../../icons/nature/nature_flower1.png': [1, 'nature'],
'../../icons/nature/nature_flower4.png': [1, 'nature'],
'../../icons/nature/nature_seedling.svg': [1, 'nature'],
'../../icons/nature/nature_volcano.svg': [1, 'nature'],
'../../icons/nature/nature_sky_airballoon.png': [1, 'nature'],
'../../icons/nature/nature_sky_sun.png': [1, 'nature'],
'../../icons/nature/nature_sky_rocket.png': [1, 'nature'],
'../../icons/nature/nature_sky_moon.png': [1, 'nature'],
'../../icons/sports/sports_badminton.png': [1, 'sports'],
'../../icons/sports/sports_rugby.png': [1, 'sports'],
'../../icons/sports/sports_pingpong.png': [1, 'sports'],
'../../icons/sports/sports_boomerang.png': [1, 'sports'],
'../../icons/sports/sports_volleyball.png': [1, 'sports'],
'../../icons/sports/sports_skate.png': [1, 'sports'],
'../../icons/sports/sports_board.png': [1, 'sports'],
'../../icons/sports/sports_basketball.png': [1, 'sports'],
'../../icons/sports/sports_soccer.png': [1, 'sports'],
'../../icons/sports/sports_nfl.png': [1, 'sports'],
'../../icons/food/food_chefHat.png': [1, 'food'],
'../../icons/food/food_corn.png': [1, 'food'],
'../../icons/food/food_fruit_pineapple.png': [1, 'food'],
'../../icons/food/food_popsicle.png': [1, 'food'],
'../../icons/food/food_fruit_peach.png': [1, 'food'],
'../../icons/food/food_bdayCake.png': [1, 'food'],
'../../icons/food/food_chili.png': [1, 'food'],
'../../icons/food/food_fruit_banana.png': [1, 'food'],
'../../icons/food/food_chickenLeg.png': [1, 'food'],
'../../icons/food/carrot.svg': [1, 'food'],
'../../icons/food/food_pea.png': [1, 'food'],
'../../icons/food/hotdog.svg': [1, 'food'],
'../../icons/food/food_tea.png': [1, 'food'],
'../../icons/food/food_fruit_grape.png': [1, 'food'],
'../../icons/food/food_fruit_strawberry.png': [1, 'food'],
'../../icons/food/food_fruit_cherry.png': [1, 'food'],
'../../icons/food/food_doughnut.png': [1, 'food'],
'../../icons/food/food_baguette.png': [1, 'food'],
'../../icons/food/food_fruit_apple.png': [1, 'food'],
'../../icons/food/food_pizza.svg': [1, 'food'],
'../../icons/food/food_manju.png': [1, 'food'],
'../../icons/food/egg.svg': [1, 'food'],
'../../icons/food/lemon.svg': [1, 'food'],
'../../icons/food/food_croissant.png': [1, 'food'],
'../../icons/house/house_alarm.png': [1, 'house'],
'../../icons/house/house_bed.png': [1, 'house'],
'../../icons/house/house_pony.png': [1, 'house'],
'../../icons/house/house_washingMachine.png': [1, 'house'],
'../../icons/house/house_stuffToy.png': [1, 'house'],
'../../icons/house/house_window.png': [1, 'house'],
'../../icons/house/house_houseGarden.png': [1, 'house'],
'../../icons/house/house_playground.png': [1, 'house'],
'../../icons/house/house_houseHeart.png': [1, 'house'],
'../../icons/house/house_dining.png': [1, 'house'],
'../../icons/house/house_farm_scarecrow.png': [1, 'house'],
'../../icons/house/house_sofa.png': [1, 'house'],
'../../icons/house/house_food_pumpkin.png': [1, 'house'],
'../../icons/house/house_farm_barn.png': [1, 'house'],
'../../icons/house/house_pram.png': [1, 'house'],
'../../icons/house/house_houseBrick.png': [1, 'house'],
'../../icons/house/house_school.png': [1, 'house'],
'../../icons/animal/animal_elk.png': [1, 'animal'],
'../../icons/animal/animal_bird_owl.png': [1, 'animal'],
'../../icons/animal/animal_crocodile.png': [1, 'animal'],
'../../icons/animal/animal_cameleon.png': [1, 'animal'],
'../../icons/animal/animal_bird_turkey.png': [1, 'animal'],
'../../icons/animal/animal_snake.png': [1, 'animal'],
'../../icons/animal/animal_swan.png': [1, 'animal'],
'../../icons/animal/animal_skunk.png': [1, 'animal'],
'../../icons/animal/animal_rabbit.png': [1, 'animal'],
'../../icons/animal/animal_puppy.png': [1, 'animal'],
'../../icons/animal/animal_bird_eagle.png': [1, 'animal'],
'../../icons/animal/animal_scorpion.png': [1, 'animal'],
'../../icons/animal/animal_mammot.png': [1, 'animal'],
'../../icons/animal/animal_dog.png': [1, 'animal'],
'../../icons/animal/animal_squirrel.png': [1, 'animal'],
'../../icons/animal/animal_farm_chick.png': [1, 'animal'],
'../../icons/animal/animal_farm_cow.png': [1, 'animal'],
'../../icons/animal/animal_farm_duck.png': [1, 'animal'],
'../../icons/animal/animal_bird_sparrow.png': [1, 'animal'],
'../../icons/animal/animal_lion.png': [1, 'animal'],
'../../icons/animal/animal_bird_penguin.png': [1, 'animal'],
'../../icons/animal/animal_mouse.png': [1, 'animal'],
'../../icons/animal/animal_duckling.png': [1, 'animal'],
'../../icons/animal/animal_sloth.png': [1, 'animal'],
'../../icons/animal/animal_dog2.png': [1, 'animal'],
'../../icons/animal/animal_farm_hen.png': [1, 'animal'],
'../../icons/animal/animal_kitty.png': [1, 'animal'],
'../../icons/animal/animal_otter.svg': [1, 'animal'],
'../../icons/animal/animal_hippo.png': [1, 'animal'],
'../../icons/animal/animal_fox.png': [1, 'animal'],
'../../icons/animal/animal_panda.png': [1, 'animal'],
'../../icons/animal/animal_bats.png': [1, 'animal'],
'../../icons/animal/animal_kangaroo.png': [1, 'animal'],
'../../icons/animal/animal_bird_peacock.png': [1, 'animal'],
'../../icons/animal/animal_farm_goat.png': [1, 'animal'],
'../../icons/animal/animal_camel.png': [1, 'animal'],
'../../icons/animal/animal_farm_horse.png': [1, 'animal'],
'../../icons/animal/animal_bear.png': [1, 'animal'],
'../../icons/animal/animal_zebra.png': [1, 'animal'],
'../../icons/animal/animal_farm_rooster.png': [1, 'animal'],
'../../icons/animal/animal_tiger.png': [1, 'animal'],
'../../icons/animal/animal_sheep.png': [1, 'animal'],
'../../icons/animal/animal_cat.png': [1, 'animal'],
'../../icons/animal/animal_bird_hummingbird.png': [1, 'animal'],
'../../icons/animal/animal_bird_flamingo.png': [1, 'animal'],
'../../icons/animal/animal_giraffe.png': [1, 'animal'],
'../../icons/animal/animal_wolf.png': [1, 'animal'],
'../../icons/animal/animal_farm_pig.png': [1, 'animal'],
'../../icons/animal/animal_bird_kiwi.svg': [1, 'animal'],
'../../icons/animal/animal_kingkong.png': [1, 'animal'],
'../../icons/animal/animal_elephant.png': [1, 'animal'],
'../../icons/animal/animal_goat3.png': [1, 'animal'],
'../../icons/animal/animal_goat2.png': [1, 'animal'],
'../../icons/animal/animal_frog.png': [1, 'animal'],
'../../icons/animal/animal_monkey.png': [1, 'animal']
};

const iconList_path = Object.keys(iconList);
const radio = Array.from(document.getElementsByTagName('input'));
var stickerHolder = document.getElementById('stickerHolder');
var regex = /_([a-z0-9]+)\./;
var cart = document.getElementById('cartItems');
var itemNum = document.getElementById('itemNum');
var cartIcon = document.getElementById('cartIcon');
var inCartItems_confirm = document.getElementById('inCartItems_confirm');
var shopConfirmPage = document.getElementById('shopConfirmPage');

var stickerID = 0

window.addEventListener('load', function() {
  
  document.getElementById('tokenNum').innerHTML = userToken + ' tokens';
  
  createStickerButtons(false);

  radio.forEach((item)=>{
  item.setAttribute('onclick', 'createStickerButtons(this.value)');  
  })
  
});

function clearStickers(){
    while (stickerHolder.firstChild) {
    stickerHolder.removeChild(stickerHolder.lastChild);
  };
};

function createStickerButtons(stickerCategory){
  
  clearStickers();
  
  if (stickerCategory != false){
    var iconPath = iconList_path.filter(i => iconList[i][1] === stickerCategory)
  } else{
    var iconPath = iconList_path
  };
    
  iconPath.forEach((path) =>{
    
  var sticker = document.createElement('BUTTON');
  sticker.classList.add('stickerButton');
  sticker.classList.add('tooltip');
  sticker.setAttribute('value', path); 
  sticker.setAttribute('name',iconList[path][1]); 
  sticker.setAttribute('id', 'sticker' + stickerID);
  stickerID+=1;
  
  var stickerImg = document.createElement('img');
  stickerImg.classList.add('stickerImg');
  stickerImg.setAttribute('src', path);
  sticker.appendChild(stickerImg); 
  
  var stickerPrice = document.createElement('p');
  stickerPrice.style.textAlign = 'center'; 
  stickerPrice.innerHTML = "<br><img src = '../../images/WechatIMG2978.png' width = 20>  1<br>";
  sticker.appendChild(stickerPrice); 
  
  var purchaseButton = document.createElement('BUTTON');
  purchaseButton.innerHTML = 'add to cart';
  purchaseButton.classList.add('purchaseButton');
  purchaseButton.setAttribute('onclick', 'addItem(this)');
  sticker.appendChild(purchaseButton); 
  
  stickerHolder.appendChild(sticker);
})};


var Idx = 0;

function addItem(elem){
  
  var iconPath = elem.parentElement.value; 
  elem.parentElement.style.display = 'none';
  
  var cartItem = document.createElement('div'); 
  var cartIcon = document.createElement('img'); 
  var cancelButton = document.createElement('BUTTON'); 
  
  cartItem.classList.add('cartItem');
  cartItem.classList.add('itemIdx'+Idx);
  cartItem.setAttribute('name', elem.parentElement.id);
  
  cartIcon.setAttribute('src', iconPath); 
  cartIcon.classList.add('cartItemIcon');
  cancelButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  cancelButton.setAttribute('onclick', 'removeCartItem(this)');
  
  cartItem.appendChild(cartIcon); 
  cartItem.appendChild(cancelButton); 
  cart.appendChild(cartItem);
  
  const clone = cartItem.cloneNode(true);
  clone.getElementsByTagName('img')[0].className = "inCartItems_icons";
  clone.className = "confirmingItem";
  clone.classList.add('itemIdx'+Idx);
  
  inCartItems_confirm.appendChild(clone);
  itemNum.innerHTML = cart.getElementsByClassName('cartItem').length;
  
  Idx+=1
}

function removeCartItem(elem){
  parentClassName = elem.parentNode.classList[1];
  document.getElementById(elem.parentNode.getAttribute("name")).style.display = 'block';
  
  Array.from(inCartItems_confirm.getElementsByClassName(parentClassName)).forEach((item) => {item.remove()});
    Array.from(cart.getElementsByClassName(parentClassName)).forEach((item) => {item.remove()});
  
  elem.parentNode.remove();
  
  itemNum.innerHTML = cart.getElementsByClassName('cartItem').length;
  document.getElementById('tokenCost_confirm').innerHTML = 'This will cost ' + itemNum.innerHTML+ ' tokens'
}

function showCart(){
    cart.style.display = 'flex';
}

function closeConfirmPage(){
    shopConfirmPage.style.display = 'none';
}

function returnToShop(){
  document.getElementById('shopApprovedPage').style.display = 'none';
  
}

function openGetStickers(){
  
  shopConfirmPage.style.display = 'flex';
  
  var renewedItemNum = document.getElementById('itemNum').innerHTML;
  document.getElementById('tokenCost_confirm').innerHTML = 'This will cost ' + renewedItemNum+ ' tokens'
}

var iconPurchased;
var iconPathRegex = RegExp('/icons.*');

function confirmPurchase() {
    //path
    iconPurchased = [];

    Array.from(inCartItems_confirm.getElementsByClassName('inCartItems_icons')).forEach((icon) => {
        iconPurchased.push('../..' + String(icon.src).match(iconPathRegex)[0])
    });

    shopConfirmPage.style.display = 'none';

    var renewedItemNum = Number(document.getElementById('itemNum').innerHTML);

    
    var renewedUserToken = Number(document.getElementById('tokenNum').innerHTML.match(/[0-9]+/)[0]);
    //token
    var renewedTokenNum = renewedUserToken - renewedItemNum;

    if (renewedItemNum > 0) {

        if (renewedTokenNum < 0) {
            alert("You don't have enough tokens!");
        } else {
            document.getElementById('tokenNum').innerHTML = renewedTokenNum;
            window.location.replace('#');
        };
    } else {
        alert("You did not choose any stickers!");
    };

    document.getElementById("icon_number").value = renewedItemNum;
    document.getElementById("user_token").value = renewedTokenNum;
    document.getElementById("icon_path").value = iconPurchased;

}

function closeWindow(elem){
  elem.parentNode.style.display = 'none';
}