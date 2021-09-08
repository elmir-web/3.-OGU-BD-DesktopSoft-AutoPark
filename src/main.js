const mysql = require("mysql2/promise"); // elmir: импортируем mysql

import { app, BrowserWindow } from "electron";

if (require("electron-squirrel-startup")) app.quit();

let mainWindow;

const config = {
  // elmir: mysql config
  host: "localhost",
  user: "root",
  database: "gsm",
  password: "root",
};

global.connectMySQL = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    minWidth: 840,
    minHeight: 600,
    maxWidth: 840,
    maxHeight: 600,
    // resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => (mainWindow = null));

  global.connectMySQL = await mysql.createPool(config);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
