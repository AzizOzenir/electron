import {app, BrowserWindow} from 'electron';
import path from 'path';


type test = string
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        
        }
    });

    mainWindow.loadFile(path.join(app.getAppPath()+'/dist-react/index.html'));
    mainWindow.webContents.openDevTools();
});