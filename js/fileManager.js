function addMusicToIndexedDB(nameMusic) {
    const file = sidebarMusicFileInput.files[0]
    const request = indexedDB.open("newMusicDataBase", 1);

    request.onerror = e => {
        console.error(e.target.error);
    }

    request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore("musicFiles", {keyPath: "id", autoIncrement: true});
        store.createIndex("name", "name", {unique: true});
    }

    request.onsuccess = () => {
        const db = request.result;
        const tr = db.transaction("musicFiles", "readwrite");
        const store = tr.objectStore("musicFiles");
        store.put({
            name: nameMusic,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            data: file
        })
        localStorage.setItem("indexedDB", "true"); 
    }

    addMusic(sidebarMusicNameInput.value, file.type, file.name, true)
}