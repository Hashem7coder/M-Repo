// setting up variables
let inputKentta = document.querySelector(".lisaa-tehtava input");
let painike = document.querySelector(".lisaa-tehtava .plus");
let tehtavanSailio = document.querySelector(".tehtavan-sisalto");
let tehtavienMaara = document.querySelector(".tehtavan-maara span");
let valmisTehtava = document.querySelector(".completed-tehtavat span");

// Focus On inputKentta Field
window.onload = function () {
    inputKentta.focus();
};

// tehtävien lisääminen
painike.onclick = function () {

    // jos inputKentta olisi tyhjä
    if (inputKentta.value === '') {

        console.log("No Value");

    } else {

        let eiViestia = document.querySelector(".ei-tehtava-viesti");

        if (document.body.contains(document.querySelector(".ei-tehtava-viesti"))) {

            // poista ei viestia muuttuja
            eiViestia.remove();

        }

        // Luo pää Span Elementti
        let mainSpan = document.createElement("span");

        // luo poista painiketta
        let deleteElement = document.createElement("span");

        // luodaan pää Span Teksti
        let text = document.createTextNode(inputKentta.value);

        // luodaan Delete painiketta Teksti
        let deleteText = document.createTextNode("Delete");

        // lisää Teksti main Spanniin
        mainSpan.appendChild(text);

        // Adding Class To Main Span
        mainSpan.className = 'tehtavan-box';

        // lisätään teksti  Delete -painikkeeseen
        deleteElement.appendChild(deleteText);

        // lisätään Class Delete -painikkeeseen
        deleteElement.className = 'delete';

        // lisätään Delete -painike Main Spanniin
        mainSpan.appendChild(deleteElement);

        // lisätään tehtävää tehtävän säiliöön
        tehtavanSailio.appendChild(mainSpan);

        // tyhjennä inputKenttä
        inputKentta.value = '';

        // Focus On input kenttään
        inputKentta.focus();

        // laskenta function käynnistäminen
        tehtavienLaskenta();

    }

};

document.addEventListener('click', function (e) {

    // Delete Tehtävää
    if (e.target.className == 'delete') {

        // Remove nykyinen Tehtävää
        e.target.parentNode.remove();

        // Tarkista säiliön sisällä olevien tehtävien määrä
        if (tehtavanSailio.childElementCount == 0) {

            eiTehtavia();

        }

    }

    // Finish Tehtävää
    if (e.target.classList.contains('tehtavan-box')) {

        // Toggle Class 'finished'
        e.target.classList.toggle("finished");

    }

    tehtavienLaskenta();

});

// function Ei tehtäviä -viestin luomiseen
function eiTehtavia() {

    // Luo viesti span elementti
    let spanViesti = document.createElement("span");

    // Luo tekstiviesti
    let tekstinViesti = document.createTextNode("No Tasks To Show");

    // Lisää tekstiä Span Viesti elementtiin
    spanViesti.appendChild(tekstinViesti);

    // Add Class To SpanViesti
    spanViesti.className = 'ei-tehtava-viesti';

    // Liitä Span Viesti -elementti tehtäväsäilöyn
    tehtavanSailio.appendChild(spanViesti);

}

//luodaan laskenta Function
function tehtavienLaskenta() {

    // Laske kaikki tehtävät
    tehtavienMaara.innerHTML = document.querySelectorAll('.tehtavan-sisalto .tehtavan-box').length;

    // Laske valmiit tehtävät
    valmisTehtava.innerHTML = document.querySelectorAll('.tehtavan-sisalto .finished').length;

}