import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { attachPearkitWindowBridge, pearkitWindowOptions } from 'pearkit/electron';

// Handles close / minimize / zoom from <WindowControls/> and pushes focus & full-screen state back.
attachPearkitWindowBridge({ ipcMain, BrowserWindow, zoomAction: 'fullscreen' });

function createWindow() {
  const win = new BrowserWindow({
    ...pearkitWindowOptions(), // frameless, native traffic lights hidden — pearkit draws them in the sidebar
    width: 1180,
    height: 760,
    minWidth: 860,
    minHeight: 560,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: false, // preload uses require('pearkit/electron')
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) win.loadURL(process.env.VITE_DEV_SERVER_URL);
  else win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
});
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
