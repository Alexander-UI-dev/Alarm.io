const musicSelect = document.querySelector(".music-alarm #selectMusic");

const musics = [
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

for(let i = 0; i < musics.length; i++) { 
    musicSelect.innerHTML += `<option value="${Object.keys(musics[i])[0]}">${Object.keys(musics[i])[0]}</option>`
}