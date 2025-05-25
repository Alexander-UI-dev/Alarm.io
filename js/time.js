const hoursEl = document.querySelector(".time-box .hours");
const minutesEl = document.querySelector(".time-box .minutes");


setInterval(() => {
    const nowDate = new Date();
    hoursEl.textContent = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : String(nowDate.getHours())
    minutesEl.textContent = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : String(nowDate.getMinutes());
}, 1000)