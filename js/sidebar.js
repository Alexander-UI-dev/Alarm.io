const overlay = document.querySelector(".overlay");
const sideBarSettings = document.querySelector(".overlay .sidebar-settings");
const btnSettings = document.querySelector(".btn-preferens");
const closeBtnSettings = document.querySelector(".close-btn-settings");

btnSettings.addEventListener("click", () => {
    overlay.classList.add("active-overlay");
    sideBarSettings.classList.add("active-sidebar-settings");
})

overlay.addEventListener("click", (e) => {
    if(e.target === overlay) {
        overlay.classList.remove("active-overlay");
        sideBarSettings.classList.remove("active-sidebar-settings");
    }
})

closeBtnSettings.addEventListener("click", () => {
    overlay.classList.remove("active-overlay");
    sideBarSettings.classList.remove("active-sidebar-settings");
})

