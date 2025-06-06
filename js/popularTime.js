const popularTimesBlock = document.querySelector(".popular-times");

const popularTime = [
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
    "8:30"
]


for(let i = 0; i < popularTime.length; i++) {
    popularTimesBlock.innerHTML += `
    <span class="popular-time" data-hours-time="${popularTime[i].at(0)}" data-minutes-time="${popularTime[i].at(2) === '0' ? popularTime[i].slice(3) : popularTime[i].slice(2)}">
        <i class="fa fa-bell-o" aria-hidden="true"></i>
        ${popularTime[i]}
    </span>`
}

const popularTimes = document.querySelectorAll(".popular-times > span");

popularTimes.forEach(element => {
    element.addEventListener("click", (e) => {
        const selectH = document.getElementById("selectHours");
        const selectM = document.getElementById("selectMinutes");
        if(selectH.style.display === "") {
            selectH.value = e.target.getAttribute("data-hours-time");
            selectM.value = e.target.getAttribute("data-minutes-time");
        }
    })
})