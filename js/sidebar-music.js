const sideBarMusic = document.querySelector(".overlay .sidebar-music");

const sidebarMusicTitle = document.querySelector(".overlay .sidebar-music ul > li > span");

const sidebarMusicNameInput = document.getElementById("name-input");
const sidebarMusicUrlInput = document.getElementById("url-input");

const sidebarMusicNameLabel = document.getElementById("label-name");
const sidebarMusicUrlLabel = document.getElementById("label-url");

const sidebarMusicMainBtn = document.getElementById("add-new-music");
const sidebarMusicDeleteBtn = document.getElementById("delete-new-music");

const btnMusic = document.getElementById("btn-music");
const btnChangeMusic = document.getElementById("btn-change-music");



btnMusic.addEventListener("click", () => {
    if(sidebarMusicTitle.textContent === "Добавить композицию") {
        overlay.classList.add("active-overlay");
        sideBarMusic.classList.add("active-sidebar-music");
        document.body.style.overflow = "hidden";
    } else {
        replaceInterfaceMusicSidebar({
            title: "Добавить композицию",
            nameValue: "",
            urlValue: "",
            labelName: "Введите имя композиции:",
            labelURL: "Введите URL композиции:",
            mainBtnText: "Добавить музыку",
            displayBtn: "none"
        })
        overlay.classList.add("active-overlay");
        sideBarMusic.classList.add("active-sidebar-music");
    }
})

btnChangeMusic.addEventListener("click", () => {
    overlay.classList.add("active-overlay");
    sideBarMusic.classList.add("active-sidebar-music");
    replaceInterfaceMusicSidebar({
        title: "Настройки композиции",
        nameValue: musicSelect.value.slice(0, -4),
        urlValue: document.querySelectorAll("#selectMusic > option")[document.querySelector("#selectMusic").selectedIndex].getAttribute("title"),
        labelName: "Имя композиции",
        labelURL: "URL композиции",
        mainBtnText: "Изменить настройки",
        displayBtn: "block"
    })
    document.body.style.overflow = "hidden";
})

overlay.addEventListener("click", (e) => {
    if(e.target === overlay) {
        overlay.classList.remove("active-overlay");
        sideBarMusic.classList.remove("active-sidebar-music");
        document.body.style.overflow = "auto";
    }
})

closeBtnsSettings[1].addEventListener("click", () => {
    overlay.classList.remove("active-overlay");
    sideBarMusic.classList.remove("active-sidebar-music");
    document.body.style.overflow = "auto";
})

function clearSidebar() {
    overlay.classList.remove("active-overlay");
    sideBarMusic.classList.remove("active-sidebar-music");
    sidebarMusicNameInput.value = "";
    sidebarMusicUrlInput.value = "";
}

sidebarMusicDeleteBtn.addEventListener("click", () => {
    //confirm("Вы точно хотите удалить композицию?");
    updateSelect(document.querySelectorAll("#selectMusic > option")[musicSelect.selectedIndex], true);
    const items = JSON.parse(localStorage.getItem("newMusic"));
    items.splice(musicSelect.selectedIndex - 10, 1);
    if(JSON.stringify(items) === "[]") {
        localStorage.removeItem("newMusic");
        clearSidebar()
        return;
    }
    localStorage.setItem("newMusic", JSON.stringify(items));
    clearSidebar()
})



function replaceInterfaceMusicSidebar(objNewInterface) {
    sidebarMusicTitle.textContent = objNewInterface.title; 

    sidebarMusicNameInput.value = objNewInterface.nameValue; 
    sidebarMusicUrlInput.value = objNewInterface.urlValue;

    sidebarMusicNameLabel.textContent = objNewInterface.labelName; 
    sidebarMusicUrlLabel.textContent = objNewInterface.labelURL;

    sidebarMusicMainBtn.textContent = objNewInterface.mainBtnText; 
    sidebarMusicDeleteBtn.style.display = objNewInterface.displayBtn;
}