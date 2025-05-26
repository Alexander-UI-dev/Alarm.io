document.addEventListener("DOMContentLoaded", () => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById("selectHours").style.display = "none";
        document.getElementById("selectMinutes").style.display = "none";
    } else {
        document.querySelector(".title-time-hours").style.gridRow = "1";
        document.querySelector(".title-time-minutes").style.gridRow = "1";
        document.querySelector(".hours_swiper").style.display = "none";
        document.querySelector(".minutes_swiper").style.display = "none";
    }
})

