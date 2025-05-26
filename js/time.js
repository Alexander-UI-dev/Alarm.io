const hoursEl = document.querySelector(".time-box .hours");
const minutesEl = document.querySelector(".time-box .minutes");
const dateEl = document.querySelector(".main-container .date");

const daysFull = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

const daysShortcat = [
    "Вс",
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб"
]


const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];


function fillTime(nowDate) {
    hoursEl.textContent = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : String(nowDate.getHours())
    minutesEl.textContent = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : String(nowDate.getMinutes());
    dateEl.textContent = daysFull[nowDate.getDay()] + ", " + nowDate.getDate() + " " + months[nowDate.getMonth()];
}

function fillAttr(nowDate) {
    const numberDay = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : String(nowDate.getDate());
    const numberMonth = nowDate.getMonth() < 10 ? "0" + nowDate.getMonth() : String(nowDate.getMonth());

    dateEl.setAttribute("data-shortcat", daysShortcat[nowDate.getDay()] + ", " + numberDay + "." + numberMonth);
}


setInterval(() => {
    const nowDate = new Date();
    fillTime(nowDate);
    fillAttr(nowDate);
}, 1000)