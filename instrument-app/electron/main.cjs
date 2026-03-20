const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

const isDev = !app.isPackaged;

const dataFile = "C:\\MFSIM DADOS\\dados.json";
const dataFolder = "C:\\MFSIM DADOS";

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    autoHideMenuBar: true,
    title: "MFSIM Flight Instruments — Danilo Machuca",
    icon: path.join(__dirname, "../assets/instrument-icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

function watchFile() {
  if (!fs.existsSync(dataFile)) {
    console.log("Arquivo não encontrado:", dataFile);
    ensureDataFile();
    return;
  }

  console.log("Observando:", dataFile);

  fs.watchFile(dataFile, { interval: 100 }, () => {
    try {
      const raw = fs.readFileSync(dataFile, "utf-8");
      const data = JSON.parse(raw);

      if (win && win.webContents) {
        win.webContents.send("data-update", data);
      }
    } catch (err) {
      console.log("Erro ao ler JSON:", err.message);
    }
  });
}

function ensureDataFile() {
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ airspeed: 0, vs: 0 }, null, 2));
  }
}

function sendCurrentData() {
  try {
    if (!fs.existsSync(dataFile)) return;

    const raw = fs.readFileSync(dataFile, "utf-8");
    const data = JSON.parse(raw);

    if (win && win.webContents) {
      win.webContents.send("data-update", data);
    }
  } catch (err) {
    console.log("Erro inicial:", err.message);
  }
}

app.whenReady().then(() => {
  ensureDataFile();

  createWindow();

  win.webContents.once("did-finish-load", () => {
    sendCurrentData();
  });

  watchFile();
});
