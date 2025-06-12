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

function replaceMainButton() {
    const btn = document.querySelector(".main-button");
    btn.style.backgroundColor = "rgb(206, 105, 117)";
    btn.textContent = "СТОП";
}

function playAlarm(nowDate) {
    const numberDay = nowDate.getDate();
    const dayOfWeek = nowDate.getDay();
    const hours = nowDate.getHours();
    const minutes = nowDate.getMinutes();

    const alarms = JSON.parse(localStorage.getItem("alarms"));
    
    
    for(let i = 0; i < alarms.length; i++) {
        if(numberDay >= alarms[i].day && dayOfWeek >= alarms[i].dayOfWeek && hours >= alarms[i].hours && minutes >= alarms[i].minutes) {
            replaceMainButton()
            playAndStopMusic("play", alarms[i].music, sliderVolume.value/100, repeatSound.checked);
            alarms.splice(i-1, 1);
            localStorage.setItem("alarms", JSON.stringify(alarms));
            if(localStorage.alarms === "[]") {
                localStorage.removeItem("alarms");
            }      
        }
    }

    
}

document.querySelector(".main-button").addEventListener("click", () => {
    if(document.querySelector(".main-button").textContent === "Установить будильник") {
        const currentHours = document.getElementById("selectHours").value;
        const currentMinutes = document.getElementById("selectMinutes").value;
        const currentDayOfWeek = document.getElementById("day-of-week").value; //k+
        const currentMusic = document.querySelectorAll("#selectMusic > option")[musicSelect.selectedIndex].getAttribute("data-url");

        const currentName = document.getElementById("inputNameAlarm").value;
        let day;
        const k = new Date().getDay() === 0 ? new Date().getDay() + 7 : new Date().getDay();
        const n = new Date().getDate();
        
        if(k > +currentDayOfWeek) {
            day = n + (7 - k) + +currentDayOfWeek
        } else {
            day = (+currentDayOfWeek - k) + n
        }

        let newAlarm = {day: day, dayOfWeek: +currentDayOfWeek, hours: +currentHours, minutes: +currentMinutes, music: currentMusic, name: currentName};

        if(!localStorage.alarms) {
            localStorage.setItem("alarms", JSON.stringify([newAlarm]))
        } else {
            const storedArray = JSON.parse(localStorage.getItem("alarms"));
            
            for(let i = 0; i < storedArray.length; i++) {
                if(storedArray[i].name === newAlarm.name) {
                    alert("Если не изменить имя будильника, то прошлый будильник будет потерян!");
                }
            }
            
            storedArray.push(newAlarm);
            localStorage.setItem("alarms", JSON.stringify(storedArray));
        }
    } else {
        playAndStopMusic("stop")
        const btn = document.querySelector(".main-button");
        btn.style = ""
        btn.textContent = "Установить будильник";
    }
})


if(localStorage.settingsAlarm) 
        loadSettings()

let isCheckedAutoChangeSwitch = document.getElementById("change-value-select").checked;

let selectH, selectM, selectD;

let isChangeH = false;
let isChangeM = false;
let isChangeD = false;



if(isCheckedAutoChangeSwitch) {
    selectH = document.getElementById("selectHours");
    selectM = document.getElementById("selectMinutes");
    selectD = document.getElementById("day-of-week");

    selectH.addEventListener("change", () => isChangeH = true);
    selectM.addEventListener("change", () => isChangeM = true);
    selectD.addEventListener("change", () => isChangeD = true);
}


function changeValueSelectTime(nowDate) {
    if(!isChangeH)
        document.getElementById("selectHours").value = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : String(nowDate.getHours());
    if(!isChangeM) 
        document.getElementById("selectMinutes").value = String(nowDate.getMinutes());
    if(!isChangeD) 
        document.getElementById("day-of-week").value = String(nowDate.getDay())
}



setInterval(() => {
    const nowDate = new Date();
    fillTime(nowDate);
    fillAttr(nowDate);
    if(isCheckedAutoChangeSwitch && !isChangeH && !isChangeM && !isChangeD) changeValueSelectTime(nowDate);
    if(localStorage.alarms) playAlarm(nowDate);
}, 1000)
