const sideBarMusic = document.querySelector(".overlay .sidebar-music");

const sidebarMusicTitle = document.querySelector(".overlay .sidebar-music ul > li > span");

const sidebarMusicNameInput = document.getElementById("name-input");
const sidebarMusicNameLabel = document.getElementById("label-name");

const sidebarMusicUrlInput = document.getElementById("url-input");
const sidebarMusicUrlLabel = document.getElementById("label-url");

const sidebarMusicFileInput = document.getElementById("file-input");
const sidebarMusicFileLabel = document.getElementById("label-file");

const sidebarMusicMainBtn = document.getElementById("add-new-music");
const sidebarMusicDeleteBtn = document.getElementById("delete-new-music");

const btnMusic = document.getElementById("btn-music");
const btnChangeMusic = document.getElementById("btn-change-music");

const fakeFileButton = document.getElementById("fake-file-input");

btnMusic.addEventListener("click", () => {
    if(btnMusic.textContent === "Добавить свою композицию") {
        overlay.classList.add("active-overlay");
        sideBarMusic.classList.add("active-sidebar-music");
        document.body.style.overflow = "hidden";
    } else {
        replaceInterfaceMusicSidebar({
            title: "Добавить композицию",
            nameValue: "",
            valueToMusic: "",
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
        fileMode: JSON.parse(document.querySelectorAll("#selectMusic > option")[document.querySelector("#selectMusic").selectedIndex].getAttribute("data-is-file")),
        valueToMusic: document.querySelectorAll("#selectMusic > option")[document.querySelector("#selectMusic").selectedIndex].getAttribute("title"),
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

function changeIntrefaceToSelection() {
    if(document.getElementById("url-file").value === "file") {
        sidebarMusicUrlLabel.style.display = "none";
        sidebarMusicUrlInput.style.display = "none";
        fakeFileButton.style.display = "block";
        sidebarMusicFileLabel.style.display = "block";
        document.querySelector(".overlay .sidebar-music ul li form div").style.display = "grid";
        sidebarMusicUrlInput.removeAttribute("required")
        fakeFileButton.setAttribute("required", "true");
    } else {
        sidebarMusicUrlLabel.style.display = "block";
        sidebarMusicUrlInput.style.display = "block";
        fakeFileButton.style.display = "none";
        sidebarMusicFileLabel.style.display = "none";
        document.querySelector(".overlay .sidebar-music ul li form div").style.display = "none";
        fakeFileButton.removeAttribute("required");
        sidebarMusicUrlInput.setAttribute("required", "true");
    }
}

document.getElementById("url-file").addEventListener("change", changeIntrefaceToSelection)

function clearSidebar() {
    overlay.classList.remove("active-overlay");
    sideBarMusic.classList.remove("active-sidebar-music");
    sidebarMusicNameInput.value = "";
    sidebarMusicUrlInput.style.display === "none" ? setInitialFileName("") : sidebarMusicUrlInput.value = "";
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
    if(objNewInterface.fileMode === true) 
        document.getElementById("url-file").value = "file" 
    else 
        document.getElementById("url-file").value = "URL";

    changeIntrefaceToSelection()
    sidebarMusicNameInput.value = objNewInterface.nameValue; 
    sidebarMusicUrlInput.style.display === "none" ? setInitialFileName(objNewInterface.valueToMusic) :   
                                            sidebarMusicUrlInput.value = objNewInterface.valueToMusic;

    sidebarMusicNameLabel.textContent = objNewInterface.labelName; 
    sidebarMusicUrlLabel.textContent = objNewInterface.labelURL;

    sidebarMusicMainBtn.textContent = objNewInterface.mainBtnText; 
    sidebarMusicDeleteBtn.style.display = objNewInterface.displayBtn;
}

function setInitialFileName(filename) {
    if (filename) {
        fakeFileButton.textContent = filename;
    }
}

function initInputFile() {
    const realFileInput = document.getElementById("file-input");

    realFileInput.addEventListener('change', function() {
        if(this.files && this.files[0]) {
            fakeFileButton.textContent = this.files[0].name;
        }
    });

    fakeFileButton.addEventListener('click', function() {
        realFileInput.click(); 
    });
}