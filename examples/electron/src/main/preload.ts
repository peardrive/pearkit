import { contextBridge, ipcRenderer } from 'electron';
import { exposePearkitWindowBridge } from 'pearkit/electron';

// Exposes window.pearkit.window — <WindowControls/> picks it up automatically.
exposePearkitWindowBridge({ contextBridge, ipcRenderer });
