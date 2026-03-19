const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const isDev = !app.isPackaged;

const dataFolder = "C:\\MFSIM DADOS";
const dataFile = path.join(dataFolder, "dados.json");

function ensureDataFile() {
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ airspeed: 0, vs: 0 }, null, 2));
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    icon: path.join(__dirname, "../assets/icon.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
    title: "MFSIM Telemetry Control — Danilo Machuca",
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

const iconPath = path.join(__dirname, "../assets/icon.ico");

app.whenReady().then(() => {
  app.setAppUserModelId("com.mfsim.slider");

  ensureDataFile();
  createWindow();
});

ipcMain.on("write-data", (event, data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
});
