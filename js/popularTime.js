const popularTimesBlock = document.querySelector(".popular-times");

const popularTimes = [
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
    "8:30"
]


for(let i = 0; i < popularTimes.length; i++) {
    popularTimesBlock.innerHTML += `
    <span class="popular-time">
        <i class="fa fa-bell-o" aria-hidden="true"></i>
        ${popularTimes[i]}
    </span>`
}