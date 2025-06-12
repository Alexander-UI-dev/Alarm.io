document.addEventListener("DOMContentLoaded", () => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById("selectHours").style.display = "none";
        document.getElementById("selectMinutes").style.display = "none";
        document.querySelector(".title-time-hours").style.alignSelf = "start";
        document.querySelector(".title-time-minutes").style.alignSelf = "start";
        document.querySelectorAll(".close-btn-settings").forEach(el => el.style.display = "block");
    } else {
        document.querySelector(".title-time-hours").style.gridRow = "1";
        document.querySelector(".title-time-minutes").style.gridRow = "1";
        document.querySelector(".hours_swiper").style.display = "none";
        document.querySelector(".minutes_swiper").style.display = "none";
    }
    
    
    if(localStorage.newMusic) {
        const addNewMusic = JSON.parse(localStorage.getItem("newMusic"));
        for(let i = 0; i < addNewMusic.length; i++) {
            addMusic(Object.keys(addNewMusic[i])[0], Object.values(addNewMusic[i])[0], Object.values(addNewMusic[i])[1]);
        }
    }
    
    initInputFile()
})

