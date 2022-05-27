//add chosen word and button for each word, 
//the user can chose the word from the 'chosen word list'

var select_word;

function start_chose_word() {
    add_chosen_word();
    add_given_word();
}



function add_chosen_word()
{

    clearMsg();

    var x = document.getElementById('tb2').innerHTML.toString();
    var retrievedWords = x.match(/[a-z']+/ig);

    var cw = document.getElementById('cwList');

    while (cw.firstChild)
    {
        cw.removeChild(cw.lastChild);
    };

    retrievedWords.forEach(w =>
    {
        elem = document.createElement('BUTTON');
        elem.classList.add('voc');
        elem.setAttribute('id', "cw_voc" + w);
        elem.style.margin = '10px';
        elem.innerHTML = w;
        cw.appendChild(elem);

        elem.addEventListener("click", function ()
        {
            var wordStr = this.textContent;

            var el = document.createElement('div');
            el.classList.add('wordSelected');
            el.setAttribute('id', 'cwSelected');
            el.textContent = wordStr;

            var closeButton = document.createElement('BUTTON');
            closeButton.innerHTML = 'X';
            closeButton.setAttribute('id', 'closingButton');

            document.getElementById('gb1_msgBox').appendChild(el);
            el.appendChild(closeButton);

            closeButton.addEventListener("click", function () {
                select_word = wordStr;
                update_chosen_word();
                this.parentNode.remove();
            });

            //remove select word from cw_list
            var del_word = document.getElementById("cw_voc" + wordStr);

            del_word.parentNode.removeChild(del_word);

            updateCount();
        })
    })
}

function update_chosen_word() {

    var cw = document.getElementById('cwList');

    elem = document.createElement('BUTTON');
    elem.classList.add('voc');
    elem.setAttribute('id', "cw_voc" + select_word);
    elem.style.margin = '10px';
    elem.innerHTML = select_word;
    cw.appendChild(elem);

    elem.addEventListener("click", function () {
        var wordStr = this.textContent;

        var el = document.createElement('div');
        el.classList.add('wordSelected');
        el.setAttribute('id', 'cwSelected');
        el.textContent = wordStr;

        var closeButton = document.createElement('BUTTON');
        closeButton.innerHTML = 'X';
        closeButton.setAttribute('id', 'closingButton');

        document.getElementById('gb1_msgBox').appendChild(el);
        el.appendChild(closeButton);

        closeButton.addEventListener("click", function () {
            select_word = wordStr;
            update_chosen_word();
            this.parentNode.remove();
        })
        updateCount();

        var del_word = document.getElementById("cw_voc" + wordStr);

        del_word.parentNode.removeChild(del_word);
    });

}

function reset_chosen_words() {

    var x = document.getElementById('tb2').innerHTML.toString();
    var retrievedWords = x.match(/[a-z']+/ig);

    var cw = document.getElementById('cwList');

    while (cw.firstChild) {
        cw.removeChild(cw.lastChild);
    };

    retrievedWords.forEach(w => {
        elem = document.createElement('BUTTON');
        elem.classList.add('voc');
        elem.setAttribute('id', "cw_voc" + w);
        elem.style.margin = '10px';
        elem.innerHTML = w;
        cw.appendChild(elem);

        elem.addEventListener("click", function () {
            var wordStr = this.textContent;

            var el = document.createElement('div');
            el.classList.add('wordSelected');
            el.setAttribute('id', 'cwSelected');
            el.textContent = wordStr;

            var closeButton = document.createElement('BUTTON');
            closeButton.innerHTML = 'X';
            closeButton.setAttribute('id', 'closingButton');

            document.getElementById('gb1_msgBox').appendChild(el);
            el.appendChild(closeButton);

            closeButton.addEventListener("click", function () {
                select_word = wordStr;
                update_chosen_word();
                this.parentNode.remove();
            });

            //remove select word from cw_list
            var del_word = document.getElementById("cw_voc" + wordStr);

            del_word.parentNode.removeChild(del_word);

            updateCount();
        })
    })

}




window.onload = function add_given_word() {

    var words = document.getElementsByClassName("extVoc");

    for (var i = 0; i < words.length; i++) {
        words[i].addEventListener("click", function () {

            var wordStr = this.textContent;
            // wordStr is the stopword itself 

            // when the user clicks on the button, create a new div tag
            // whose class name is 'wordSelected'
            // whose ID is gwSelected
            // whose inhalt text is the text clicked by the user
            var el = document.createElement('div');
            el.classList.add('wordSelected');
            el.setAttribute('id', 'gwSelected');
            el.textContent = wordStr;
            // For all the div tag, add a button 
            // whose id is 'closingButton'
            // whose text content is X -> closing button of the word box 
            var closeButton = document.createElement('BUTTON');
            closeButton.innerHTML = 'X';
            closeButton.setAttribute('id', 'closingButton');

            // msgbox is where all the newly-created div tag will be inserted
            document.getElementById('gb1_msgBox').appendChild(el);
            el.appendChild(closeButton);


            // whenever the user clicks on closeButton, the div tag disappears
            closeButton.addEventListener("click", function () {
                this.parentNode.remove();
            });

            updateCount();
        });
    }

}

function reset_basic_word() {

    var words = document.getElementsById("gwList");

    while (words.firstChild) {
        words.removeChild(cw.lastChild);
    };
}

//clean all the message from message box
function clearMsg() {
    // get the latest msgbox status (gb1_msgBox)
    const msgbox = document.getElementById('gb1_msgBox');

    // remove all the contents within gb1_msgBox div tag 
    while (msgbox.firstChild) {
        document.getElementById('gb1_msgBox').removeChild(document.getElementById('gb1_msgBox').lastChild);
    };
}


// 4. Alert system
/*
Alert div for errorneous behaviours when writing a message 

When the user uses more than 18 words (wordSelected div), a message pops up. 
When the user does not use any chosen words from the joke, a message pops up. 

The message is written in a div tag with ID of 'warn'.
*/

// add 'none' display to hide warn tag 
// the style is added here to prevent any changes to 'display:flex' in css 
function closeWindow() {
    document.getElementById('warn').style.display = 'none';
};

/*
4.1 Reminder when the user uses more than 18 words
*/
// keep checking the number of newly created wordSelected in gb1_msgBox
function updateCount() {

    listItems = document.getElementById('gb1_msgBox').getElementsByClassName('wordSelected');

    // if the user uses more than 18 words
    if (listItems.length > 18) {

        // delete the rest of the words
        // https://stackoverflow.com/questions/54845058/how-to-remove-the-last-3-div-inside-a-div
        [...document.getElementById('gb1_msgBox').children].slice(18,).forEach(document.getElementById('gb1_msgBox').removeChild.bind(document.getElementById('gb1_msgBox')));

        // show div tag with ID 'warn' with sound effect and animation
        // write a warning message 
        document.getElementById('warningMsg').innerHTML = 'You can use only up to 18 boxes!'
        document.getElementById('warn').style.height = '100px'
        document.getElementById('warn').style.display = 'block';
        document.getElementById('squid3').style.animation = 'shake 0.3s'
        //errorSound.play();
    };
}

/*
4.2 Reminder when the user does not use any chosen words 

The function is activated when the user is trying to go to the next page 
after finishing their message. 
If the user did not use any given words, the user cannot be directed to the 
next page. 
*/

function checkCW() {
    // when the user clicks 'Write down message' button 
    // retirieve all the tags with the ID of 'cwSelected'
    // count the number of these tags 
    var usedCW = document.querySelectorAll('#cwSelected').length;


    if (usedCW > 0) {

        // if the user used at least one chosen words
        // move to the next page 
        window.location.replace('#page3');

    } else {
        // otherwise, unhide 'warn' div tag 
        // display reminder with sound effect 
        x = document.getElementById('warn')
        document.getElementById('warningMsg').innerHTML = 'You need to use at least one word on the right!'
        x.style.height = '150px'
        x.style.display = 'block';
        errorSound.play();
    }
}

document.getElementById('gb1_msgBox').addEventListener('DOMSubtreeModified', updateCount, false);
// keep an eye on any changes to msgbox tag
// https://stackoverflow.com/questions/31419700/javascript-how-to-update-count
