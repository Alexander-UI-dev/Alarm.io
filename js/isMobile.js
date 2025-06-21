let isMobile = false;
document.addEventListener("DOMContentLoaded", () => {
    selectD = document.getElementById("day-of-week");
    selectD.addEventListener("change", () => isChangeD = true);

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
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
        if(isCheckedAutoChangeSwitch) {
            selectH = document.getElementById("selectHours");
            selectM = document.getElementById("selectMinutes");
            selectH.addEventListener("change", () => isChangeH = true);
            selectM.addEventListener("change", () => isChangeM = true);
        }
    }
    
    
    if(localStorage.newMusic) {
        const addNewMusic = JSON.parse(localStorage.getItem("newMusic"));
        for(let i = 0; i < addNewMusic.length; i++) {
            addMusic(Object.keys(addNewMusic[i])[0], Object.values(addNewMusic[i])[0], Object.values(addNewMusic[i])[0], false);
        }
    }

    if(localStorage.indexedDB) {
        const request = indexedDB.open("newMusicDataBase", 1);
        request.onerror = () => {
            console.error(e.target.error);
        }

        request.onsuccess = () => {
            const db = request.result;
            const tr = db.transaction("musicFiles", "readwrite");
            const store = tr.objectStore("musicFiles");
            const allData = store.getAll();

            allData.onsuccess = () => {
                const result = allData.result;
                console.log(result);
                for(let i = 0; i < result.length; i++) {
                    addMusic(result[i].name, result[i].type, result[i].name, true);
                }
            }

            allData.onerror = e => console.error(e.target.error);
            
        }
    }

    window.onerror = function(message, source, lineno, colno, error) {
        alert(message, source, lineno, colno, error);
    }

    initInputFile()
})

