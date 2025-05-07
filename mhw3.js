const popup = document.querySelector("#popup");
const chiusuraPopupBtn = document.querySelector("#bottone-chiusura-popup");

const btnHelp = document.querySelector("#btn-help");
const submenu = document.querySelector("#submenu-help");
const freccia = document.querySelector("#icona-freccia");
const btnAltro = document.querySelector(".vedi_altro_btn");
const btnAltroNascondi = document.querySelector(".nascondi_altro_btn");
const btnMenuMobile = document.querySelector("#icona_menu_mobile");
const btnMenuMobileAperto = document.querySelector("#icona_menu_mobile_aperto");
const menumobile = document.querySelector("#mobile-menu");
const vociMenuDiscesa = document.querySelectorAll(".menu_discesa");
const likeButtons = document.querySelectorAll('[data-action="like"]');
const shareButtons = document.querySelectorAll('[data-action="condividi"]');
const modale = document.querySelector("#modale-condividi");

function closePopup() {
    popup.classList.remove("mostra-popup");
    popup.classList.add("nascondi");
    console.log("Popup chiuso");
}

function SottoMenu(event) {
    submenu.classList.toggle("nascondi");
    freccia.classList.toggle("ruotata");
    event.preventDefault();
    const menu = event.currentTarget;
    menu.classList.toggle("menu_selezionato");
}

function NascondiCliccandoOvunque(event) {
    if (!btnHelp.contains(event.target) && !submenu.contains(event.target)) {
        submenu.classList.add("nascondi");
        btnHelp.classList.remove("menu_selezionato");
        freccia.classList.remove("ruotata");
    }
    if (!btnMenuMobile.contains(event.target) && !menumobile.contains(event.target)) {
        menumobile.classList.add("nascondi");
        btnMenuMobileAperto.classList.add("nascondi");
        btnMenuMobile.classList.remove("nascondi");
    }
}

function MostraAltro() {
    const sez_altro = document.querySelector(".mostra_altro");
    sez_altro.classList.remove("nascondi");
    btnAltro.classList.add("nascondi");
}

function NascondiAltro() {
    const sez_altro = document.querySelector(".mostra_altro");
    sez_altro.classList.add("nascondi");
    btnAltro.classList.remove("nascondi");
}

function ApriMenu() {
    btnMenuMobileAperto.classList.remove("nascondi");
    btnMenuMobileAperto.addEventListener("click", ChiudiMenu)
    btnMenuMobile.classList.add("nascondi");
    menumobile.classList.remove("nascondi");
}

function ChiudiMenu() {
    btnMenuMobileAperto.classList.add("nascondi");
    btnMenuMobile.classList.remove("nascondi");
    menumobile.classList.add("nascondi");
}

function toggleSottoMenuMobile(event) {
    event.preventDefault();

    const targetId = this.dataset.target;
    const iconId = this.dataset.icon;

    const sottoMenu = document.getElementById(targetId);
    const iconaFreccia = document.getElementById(iconId);

    if (sottoMenu && iconaFreccia) {
        sottoMenu.classList.toggle("nascondi");
        iconaFreccia.classList.toggle("ruotata");
    }
}

function toggleHeartLike(event) {
    const button = event.currentTarget;
    const heart = button.querySelector("#icona-cuore");
    const heart2 = button.querySelector("#icona-cuore-premuto")

    if (heart) {
        heart.classList.toggle("nascondi");
    }

    if (heart2) {
        heart2.classList.toggle("nascondi");
    }
}

function ApriModaleCondividi() {
    modale.classList.remove("nascondi");
    modale.classList.add("mostra-modale");
    document.body.classList.add("no-scroll");

    const btnChiudi = document.querySelector("#chiudi-modale");

    btnChiudi.addEventListener("click", ChiudiModale);
}

function ChiudiModale() {
    modale.classList.add("nascondi");
    modale.classList.remove("mostra-modale");
    document.body.classList.remove("no-scroll");
}

chiusuraPopupBtn.addEventListener("click", closePopup);
btnHelp.addEventListener("click", SottoMenu);
btnAltro.addEventListener("click", MostraAltro);
btnAltroNascondi.addEventListener("click", NascondiAltro);
btnMenuMobile.addEventListener("click", ApriMenu);
for (let i = 0; i < vociMenuDiscesa.length; i++) {
    vociMenuDiscesa[i].addEventListener("click", toggleSottoMenuMobile);
}
document.addEventListener("click", NascondiCliccandoOvunque);

for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", toggleHeartLike);
}

for (let i = 0; i < shareButtons.length; i++) {
    shareButtons[i].addEventListener("click", ApriModaleCondividi);
}

var weatherstackKey = "secure";


var meteoBox = document.createElement("div");
meteoBox.classList.add("meteo-box");
meteoBox.textContent = "Caricamento meteo...";

var ricerca = document.querySelector(".ricerca_eventi");
if (ricerca) {
    ricerca.parentNode.insertBefore(meteoBox, ricerca);
}

function onResponse(response) {
    return response.json();
}

function onJsonPosizione(json) {
    var city = json.city;
    if (!city) {
        meteoBox.textContent = "Impossibile determinare la località.";
        return;
    }

    fetch("http://api.weatherstack.com/current?access_key=" + weatherstackKey + "&query=" + encodeURIComponent(city))
        .then(onResponse)
        .then(function(json) {
            onJsonWeatherstack(json, city);
        });
}

function onJsonWeatherstack(json, city) {
    if (json.success === false || !json.current) {
        meteoBox.textContent = "Meteo non disponibile per " + city;
        return;
    }

    meteoBox.innerHTML = "";

    var container = document.createElement("div");
    container.classList.add("meteo-box-container");

    var header = document.createElement("div");
    header.classList.add("meteo-header");

    var icon = document.createElement("img");
    icon.src = json.current.weather_icons[0];
    icon.alt = "Icona meteo";
    icon.classList.add("meteo-icon-big");

    var temp = document.createElement("div");
    temp.classList.add("meteo-temp");
    temp.innerHTML = json.current.temperature + "°C";

    var cond = document.createElement("div");
    cond.classList.add("meteo-condizioni");
    cond.textContent = json.current.weather_descriptions[0];

    var luogo = document.createElement("div");
    luogo.classList.add("meteo-luogo");
    luogo.textContent = json.location.name + ", " + json.location.region + ", " + json.location.country;

    var dettagli = document.createElement("div");
    dettagli.classList.add("meteo-dettagli");
    dettagli.innerHTML = `
        Vento: ${json.current.wind_speed} km/h<br>
        Pioggia: ${json.current.precip} mm<br>
        Pressione: ${json.current.pressure} hPa
    `;

    header.appendChild(icon);
    header.appendChild(temp);
    header.appendChild(cond);

    container.appendChild(luogo);
    container.appendChild(header);
    container.appendChild(dettagli);

    meteoBox.appendChild(container);
}

function erroremeteo(){
    meteoBox.textContent = "Errore nel caricamento meteo.";
}

fetch("https://get.geojs.io/v1/ip/geo.json")
    .then(onResponse)
    .then(onJsonPosizione)
    .catch(erroremeteo);
