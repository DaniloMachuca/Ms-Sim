const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onDataUpdate: (callback) => {
    ipcRenderer.on("data-update", (_, data) => callback(data));
  },
});
