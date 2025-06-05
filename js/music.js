const musicSelect = document.querySelector(".music-alarm #selectMusic");
const addMusicBtn = document.getElementById("add-new-music");


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

const newMusic = []

addMusicBtn.addEventListener("click", () => {
    newMusic.push({[document.getElementById("name-input").value]: document.getElementById("url-input").value});
    localStorage.setItem("newMusic", JSON.stringify(newMusic));
})


function addMusic(newText) {
    musicSelect.innerHTML += `<option value="${newText}">${newText}</option>`
}

for(let i = 0; i < music.length; i++) { 
    musicSelect.innerHTML += `<option value="${Object.keys(music[i])[0]}">${Object.keys(music[i])[0]}</option>`
}

