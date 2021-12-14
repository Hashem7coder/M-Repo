// select the start game button
document.querySelector(".ohjauspainike span").onclick = function () {

    //prompt window to ask for name
    let sunNimi = prompt("Mikä sinun nimi on?");

    // if name is empty
    if (sunNimi == null || sunNimi == "") {
        // setting name as unknown 
        document.querySelector(".nimi span").innerHTML = 'Tuntematon pelaaja'
    }

    // if name is not empty
    else {

        //set name as sunNimi muuttuja
        document.querySelector(".nimi span").innerHTML = sunNimi;
    }

    // Removing Splash screen
    document.querySelector(".ohjauspainike").remove();
};

// Effect duration when the card is flipping
let kesto = 1000;

// select blocks Container 
let korttiensailio = document.querySelector(".muisti-pelin-kortit");

// create array from game blocks 
let kortit = Array.from(korttiensailio.children);

// create range of keys 
let orderRange = Array.from(Array(kortit.length).keys());

// this is second way how to make range of keys to give them randomly to the cards
//  let orderRange = [...Array(blocks.length).keys()]

korttienSekoitus(orderRange);

// Adding order css property to game blocks 
kortit.forEach((kortti, index) => {
    kortti.style.order = orderRange[index];

    //adding click event
    kortti.addEventListener('click', function () {

        // trigger the flip block function
        kaannaKortti(kortti)

    });
});



// flip block function
function kaannaKortti(valittuKortti) {

    //adding class is-flipped
    valittuKortti.classList.add('on-kaannetty');

    // collecting all flipped card
    let kaikkiKaannetytkortit = kortit.filter(kaannetytKortit => kaannetytKortit.classList.contains('on-kaannetty'))

    //if there are 2 selected blocks ?
    if (kaikkiKaannetytkortit.length === 2) {
        // console.log('Tow card clicked')

        // stop clicking function that we cannot continue clicking after we clicked 2 card
        stopClicking();

        //check matched block function
        tarkistaKortit(kaikkiKaannetytkortit[0], kaikkiKaannetytkortit[1]);
    }
}


// console.log(orderRange)

// stop clicking function that we cannot continue clicking after we clicked 2 card
function stopClicking() {

    // adding class no clicking in main container
    korttiensailio.classList.add('no-clicking')

    setTimeout(() => {
        korttiensailio.classList.remove('no-clicking')
    }, kesto);
}

//ckeck matched block function that ckecking if the clickid tow cards the same cardor not
function tarkistaKortit(ekaKortti, tokaKortti) {
    let yrityksetElement = document.querySelector('.yritykset span');

    if (ekaKortti.dataset.anime === tokaKortti.dataset.anime) {

        ekaKortti.classList.remove('on-kaannetty');
        tokaKortti.classList.remove('on-kaannetty');

        ekaKortti.classList.add('samaKortti');
        tokaKortti.classList.add('samaKortti');

    } else {
        yrityksetElement.innerHTML = parseInt(yrityksetElement.innerHTML) + 1;

        ekaKortti.classList.remove('on-kaannetty');
        tokaKortti.classList.remove('on-kaannetty');

    }
    setTimeout(() => {

        ekaKortti.classList.remove('on-kaannetty');
        tokaKortti.classList.remove('on-kaannetty');

    }, kesto)
}


// korttienSekoitus function
function korttienSekoitus(array) {

    // setting Variables
    let nykyinenElementti = array.length,
        temp,
        random;

    while (nykyinenElementti > 0) {

        //getting random number
        random = Math.floor(Math.random() * nykyinenElementti);

        // decrease length by one 
        nykyinenElementti--;

        // [1] saving nykyinenElementti elemnt in stash
        temp = array[nykyinenElementti];

        // [2] nykyinenElementti element = random element
        array[nykyinenElementti] = array[random];

        //[3] rndom element = getting element from satsh
        array[random] = temp;

    }
    return array;
}



