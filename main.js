const { app, BrowserWindow } = require("electron")
const path = require("node:path");
const url = require("node:url");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "My Window",
        height: 600,
        width: 800,
        webPreferences: {
            contextIsolation: true,
        },
    })

    mainWindow.webContents.openDevTools();

    const startUrl = url.format({
        pathname: path.join(__dirname, "./app/build/index.html"),
        protocol: "file",
    })

    mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
    createWindow()
})