const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

const dataFolder = "C:\\MFSIM DADOS";
const dataFile = path.join(dataFolder, "dados.json");

function ensureDataFile() {
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
  }

  if (!fs.existsSync(dataFile)) {
    const initialData = {
      airspeed: 0,
      vs: 0,
    };

    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  ensureDataFile();

  createWindow();
});

ipcMain.on("write-data", (event, data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
});
