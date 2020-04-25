// this will be the entry point and will contain all the backend code.

const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require('fs');

// handle event from renderer, on file path process the file if exist
ipcMain.on('file-path', async (e, payload) => {
  console.log(payload);
  if (!payload)
    return;

  let path = payload;
  try {
    let file = await fs.readFileSync(path);
    if (!file) {
      e.reply('file-error', 'File does not exist');
      return;
    }
    console.log(file.toString('utf-8'));
    e.reply('success', 'File Processed');
  } catch (e) {
    e.reply('file-error', 'There was an error reading file');
  }
})

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)