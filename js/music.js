const musicSelect = document.querySelector(".music-alarm #selectMusic");
const addMusicBtn = document.getElementById("add-new-music");

const musicForm = document.getElementById("music-form");

let sound;

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

function addMusicToLocalStrorage(el, mode) {
    newMusic[sidebarMusicNameInput.value] = el.value;
    newMusic.isFile = mode;
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
    addMusic(sidebarMusicNameInput.value, el.value, mode);
}

function replaceMusic(el, mode) {
    const storedData = localStorage.getItem("newMusic");
    const itemsArray = JSON.parse(storedData);
    const index = musicSelect.selectedIndex - 10;

    itemsArray[index] = {[sidebarMusicNameInput.value]: el.value, isFile: mode};

    const updateData = JSON.stringify(itemsArray);
    localStorage.setItem("newMusic", updateData);
    updateSelect(document.querySelectorAll("#selectMusic > option")[musicSelect.selectedIndex], false, mode);
}

musicForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(sidebarMusicMainBtn.textContent === "Добавить музыку") {
        addMusicToLocalStrorage(sidebarMusicUrlInput.style.display === "none" ? sidebarMusicFileInput : sidebarMusicUrlInput,
            sidebarMusicUrlInput.style.display === "none" ?? true
        );
    } else {
        replaceMusic(sidebarMusicUrlInput.style.display === "none" ? sidebarMusicFileInput : sidebarMusicUrlInput, 
            sidebarMusicUrlInput.style.display === "none" ?? true
        );
    }
    clearSidebar()
})

function updateSelect(indexElement, deleteMode = false, isFile) {
    if(!deleteMode) {
        indexElement.textContent = document.getElementById("name-input").value;
        indexElement.setAttribute("value", document.getElementById("name-input").value + "-new");
        indexElement.setAttribute("data-is-file", isFile);
        indexElement.setAttribute("title", sidebarMusicUrlInput.style.display === "none" ? sidebarMusicFileInput.value : sidebarMusicUrlInput.value);
    } else {
        indexElement.remove()
        visibleBtn()
    }
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

musicSelect.addEventListener("change", (e) => {
    visibleBtn(e)
})

function addMusic(newText, url, isFile) {
    musicSelect.innerHTML += `<option value="${newText}-new" title="${url}" data-is-file="${isFile}">${newText}</option>`;
}


for(let i = 0; i < music.length; i++) { 
    musicSelect.innerHTML += `<option value="${Object.keys(music[i])[0]}" data-url="${Object.values(music[i])[0]}">
        ${Object.keys(music[i])[0]}
    </option>`
}

function playAndStopMusic(mode = "play", src, volume, isLoop = true) {
    if(mode === "play") {
        sound = new Audio();
        sound.src = src;
        sound.volume = volume;
        sound.loop = isLoop;
        sound.setAttribute("crossorigin", "anonymous")
        sound.play()
    } else {
        sound.pause()
    }
}

