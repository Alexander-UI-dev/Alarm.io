const musicSelect = document.querySelector(".music-alarm #selectMusic");
const addMusicBtn = document.getElementById("add-new-music");

const musicForm = document.getElementById("music-form");

const music = [
    {"Будильник": "./audio/alarm.mp3"},
    {"Прерывистый сигнал": "./audio/signal.mp3"},
    {"Ку-ка-ре-ку": "./audio/petuha.mp3"},
    {"Сирена": "./audio/sirena.mp3"},
    {"Ядерная тревога": "./audio/trevoga.mp3"},
    {"НЛО": "./audio/nlo.mp3"},
    {"Бомба": "./audio/bomba.mp3"},
    {"Мистика": "./audio/mistika.mp3"},
    {"Колокольчик": "./audio/kolok.mp3"},
    {"Белый шум": "./audio/shum.mp3"}
];

let newMusic = {}

musicForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(sidebarMusicMainBtn.textContent === "Добавить музыку") {
        if(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%=~_|$?!:,.]*)/gi.test(document.getElementById("url-input").value)) {
            newMusic[document.getElementById("name-input").value] = document.getElementById("url-input").value;
            if(!localStorage.newMusic) {
                localStorage.setItem("newMusic", JSON.stringify([newMusic]))
                newMusic = {}
            }
            else {
                const storedArray = JSON.parse(localStorage.getItem("newMusic"));
                storedArray.push(newMusic);
                localStorage.setItem("newMusic", JSON.stringify(storedArray));
                newMusic = {}
            }
            addMusic(document.getElementById("name-input").value, document.getElementById("url-input").value);
        } else {
            alert("Неправильно введён URL композиции!")
        }
    } else {
        const storedData = localStorage.getItem("newMusic");
        const itemsArray = JSON.parse(storedData);
        const index = musicSelect.selectedIndex - 10;
        
        itemsArray[index] = {[document.getElementById("name-input").value]: document.getElementById("url-input").value};
        
        const updateData = JSON.stringify(itemsArray);
        localStorage.setItem("newMusic", updateData);
        updateSelect(document.querySelectorAll("#selectMusic > option")[musicSelect.selectedIndex])
    }
    clearSidebar()
})

function updateSelect(indexElement, deleteMode = false) {
    if(!deleteMode) {
        indexElement.textContent = document.getElementById("name-input").value;
        indexElement.setAttribute("value", document.getElementById("name-input").value + "-new");
        indexElement.setAttribute("title", document.getElementById("url-input").value);
    } else {
        indexElement.remove()
        visibleBtn()
    }
}



musicSelect.addEventListener("change", (e) => {
    visibleBtn(e)
})

function addMusic(newText, url) {
    musicSelect.innerHTML += `<option value="${newText}-new" title="${url}">${newText}</option>`;
}

function visibleBtn(eventMode) {
    if(eventMode) {
        if(eventMode.target.value.includes("new")) {
            document.getElementById("btn-change-music").style.display = "block";
        } else {
            document.getElementById("btn-change-music").style.display = "none";
        }
    } else {
        if(musicSelect.value.includes("new")) {
            document.getElementById("btn-change-music").style.display = "block";
        } else {
            document.getElementById("btn-change-music").style.display = "none";
        }
    }
}

for(let i = 0; i < music.length; i++) { 
    musicSelect.innerHTML += `<option value="${Object.keys(music[i])[0]}">${Object.keys(music[i])[0]}</option>`
}

