const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  writeData: (airspeed, vs) => {
    ipcRenderer.send("write-data", { airspeed, vs });
  },

  onDataUpdate: (callback) => {
    ipcRenderer.on("data-update", (_, data) => callback(data));
  },
});
