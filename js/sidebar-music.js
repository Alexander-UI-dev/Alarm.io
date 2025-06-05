const sideBarMusic = document.querySelector(".overlay .sidebar-music");
const btnMusic = document.getElementById("btn-music");

btnMusic.addEventListener("click", () => {
    overlay.classList.add("active-overlay");
    sideBarMusic.classList.add("active-sidebar-music");
})

overlay.addEventListener("click", (e) => {
    if(e.target === overlay) {
        overlay.classList.remove("active-overlay");
        sideBarMusic.classList.remove("active-sidebar-music");
    }
})

closeBtnsSettings[1].addEventListener("click", () => {
    overlay.classList.remove("active-overlay");
    sideBarMusic.classList.remove("active-sidebar-music");
})