import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { getStaticData, poolResouserces } from "./resource_manager.js";
import { getPreloadPath } from "./path_resolver.js";

type test = string;
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    // fullscreen: true,
    //fullscreenable:true,
    hasShadow: true,
    roundedCorners: true,
    frame: true,
    resizable: true,
    autoHideMenuBar: true,
    title: "🚀 ElectronVite App",
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
    //    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
  }

  poolResouserces();
});
