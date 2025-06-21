const overlay = document.querySelector(".overlay");

const sideBarSettings = document.querySelector(".overlay .sidebar-settings");

const btnSettings = document.querySelector(".btn-preferens");
const closeBtnsSettings = document.querySelectorAll(".close-btn-settings");

const numberFontEl = document.getElementById("number-font-checkbox");

const sliderVolume = document.getElementById("range-volume");
const numberVolume = document.getElementById("number-volume");

const btnColorContainer = document.querySelectorAll(".btn-color-container > button");

const btnMemory = document.getElementById("btn-memory-settings");

const repeatSound = document.getElementById("repeat-sound");
const autoChangeValueSelect = document.getElementById("change-value-select");

const objSettings = {repeatSound: true, autoChangeValueSelect: true, numberFont: false, volume: 20, colorTime: "white"};

btnSettings.addEventListener("click", () => {
    overlay.classList.add("active-overlay");
    sideBarSettings.classList.add("active-sidebar-settings");
    document.body.style.overflow = "hidden";
})

overlay.addEventListener("click", (e) => {
    if(e.target === overlay) {
        overlay.classList.remove("active-overlay");
        sideBarSettings.classList.remove("active-sidebar-settings");
        document.body.style.overflow = "auto";
    }
})

closeBtnsSettings[0].addEventListener("click", () => {
    overlay.classList.remove("active-overlay");
    sideBarSettings.classList.remove("active-sidebar-settings");
    document.body.style.overflow = "auto";
})

numberFontEl.addEventListener("change", () => {
    document.querySelector(".time-box").classList.toggle("number-font");
    objSettings.numberFont = document.querySelector(".time-box").classList.contains("number-font");
})

autoChangeValueSelect.addEventListener("change", (e) => {
    objSettings.autoChangeValueSelect = e.target.checked;
    isCheckedAutoChangeSwitch = e.target.checked;
})


repeatSound.addEventListener("change", (e) => {
    objSettings.repeatSound = e.target.checked;
})

sliderVolume.addEventListener("input", (e) => {
    numberVolume.value = e.target.value;
    objSettings.volume = +e.target.value;
})

numberVolume.addEventListener("input", (e) => {
    sliderVolume.value = e.target.value;
    objSettings.volume = +e.target.value;
})

btnColorContainer.forEach(el => {
    el.addEventListener("click", (e) => {
        const activeColorBtn = document.querySelector(".btn-color-container > .active-color");
        if(e.target !== activeColorBtn) {
            activeColorBtn.classList.remove("active-color");
            e.target.classList.add("active-color");
            document.querySelector(".hours").style.color = e.target.style.color;
            document.querySelector(".r").style.color = e.target.style.color;
            document.querySelector(".minutes").style.color = e.target.style.color;
            objSettings.colorTime = e.target.style.color;
        }
    })
})

btnMemory.addEventListener("click", () => {
    localStorage.setItem("settingsAlarm", JSON.stringify(objSettings))
})

function loadSettings() {
    const settings = JSON.parse(localStorage.settingsAlarm);
    if(settings.numberFont) {
        document.querySelector(".time-box").classList.add("number-font");
        numberFontEl.checked = true;
    }
    if(!settings.repeatSound) {
        repeatSound.checked = settings.repeatSound;
    }
    if(!settings.autoChangeValueSelect) {
        autoChangeValueSelect.checked = settings.autoChangeValueSelect;
    }
    if(settings.volume !== 20) {
        sliderVolume.value = settings.volume;
        numberVolume.value = settings.volume;
    }
    if(settings.colorTime !== "white") {
        const activeColorBtn = document.querySelector(".btn-color-container > .active-color");
        activeColorBtn.classList.remove("active-color");
        document.querySelector(`#${settings.colorTime}`).classList.add("active-color");
        document.querySelector(".hours").style.color = settings.colorTime;
        document.querySelector(".r").style.color = settings.colorTime;
        document.querySelector(".minutes").style.color = settings.colorTime;
    }
}

