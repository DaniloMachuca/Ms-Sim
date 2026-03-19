const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const isDev = !app.isPackaged;

const dataFolder = "C:\\MFSIM DADOS";
const dataFile = path.join(dataFolder, "dados.json");

let win; // 👈 importante (precisa ser global)

function ensureDataFile() {
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ airspeed: 0, vs: 0 }, null, 2));
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    icon: path.join(__dirname, "../assets/icon.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: "MFSIM Telemetry Control — Danilo Machuca",
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
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

function watchFile() {
  if (!fs.existsSync(dataFile)) return;

  fs.watchFile(dataFile, { interval: 100 }, () => {
    try {
      const raw = fs.readFileSync(dataFile, "utf-8");
      const data = JSON.parse(raw);

      if (win && win.webContents) {
        win.webContents.send("data-update", data);
      }
    } catch {}
  });
}

app.whenReady().then(() => {
  app.setAppUserModelId("com.mfsim.slider");

  ensureDataFile();
  createWindow();

  // 👇 envia dados assim que a UI carregar
  win.webContents.once("did-finish-load", () => {
    sendCurrentData();
  });

  // 👇 começa a observar mudanças
  watchFile();
});

ipcMain.on("write-data", (event, data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
});
