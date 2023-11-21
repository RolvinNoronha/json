const { app, BrowserWindow, ipcMain, dialog, ipcRenderer} = require("electron")
const path = require("node:path");
const url = require("node:url");
const fs = require("node:fs");

const Data = new Object({
    value: "",
});


const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "My Window",
        height: 600,
        width: 900,
        webPreferences: {
            preload: path.resolve(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: true,
        },
    })


    const startUrl = url.format({
        pathname: path.join(__dirname, "./app/build/index.html"),
        protocol: "file",
    })


    ipcMain.on("save-file", (event, data) => {
        const filePath = dialog.showSaveDialogSync(mainWindow, {
            defaultPath: path.join(app.getPath("documents"), "output.json"),
            filters: [{ name: "JSON Files", extensions: ["json"] }],
        });

        if (filePath) {
            fs.writeFileSync(filePath, JSON.stringify(data));
        }
    });

    ipcMain.on("open-file", (event) => {
        const filePath = dialog.showOpenDialogSync(mainWindow, {
            defaultPath: path.join(app.getPath("documents")),
            filters: [{ name: "JSON Files", extensions: ["json"] }],
        })

        if (filePath) {
            Data.value = fs.readFileSync(filePath.toString(), {encoding: "utf-8", flag: "r"});
        }
    })
    
    ipcMain.handle("file-read", () => Data.value);

    // mainWindow.loadURL("http://localhost:3000");
    mainWindow.loadURL(startUrl)
}

app.whenReady().then(() => {
    createWindow()
})

