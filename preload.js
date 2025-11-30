const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Listen for PDFs opened via OS
  onOpenPdf: (callback) => ipcRenderer.on('open-pdf', (event, path) => { console.log(`path ${path}`); callback(path) }),
});
