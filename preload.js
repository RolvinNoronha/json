const { ipcRenderer, contextBridge, ipcMain } = require("electron");


contextBridge.exposeInMainWorld("electronAPI", {
    saveFile: (data) => ipcRenderer.send("save-file", data),
    openFile: () => ipcRenderer.send("open-file"),
    readFile: () => ipcRenderer.invoke("file-read").then(data => data),
})