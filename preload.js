// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openDashboard: () => ipcRenderer.send('open-dashboard'),
    openWindow: (file) => ipcRenderer.send('open-window', file),
    notify: (payload) => ipcRenderer.send('app-notify', payload) // optional for main process to act on
});
