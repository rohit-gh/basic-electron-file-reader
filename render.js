// this file will include all the javascript for the front end
/***
 * imports
 */
const {dialog} = require('electron').remote
const {ipcRenderer} = require('electron');

/***
 *
 * handlers starts here
 */

// find the button on the window
let fileSelectorButton = document.getElementById('fileSelector');

// if the button is found, add the onclick handler
if (fileSelectorButton) {
  fileSelectorButton.onclick = (e) => {
    // open read file dialog box
    dialog.showOpenDialog(
      {
        filters: [
          // {
          //   name: 'only excel files',
          //   extensions: ['xls', 'xlsx']
          // }
        ],
        properties: ['openFile']
      })
      // I think this should contain file path in one of the properties
      .then(result => {
        if (result && result.filePaths && result.filePaths.length) {
          console.log(result.filePaths[0])
          let filePath = result.filePaths[0];
          // send this file to main process to be processed.
          ipcRenderer.send('file-path', filePath);


          let selectedFileNameElement = document.getElementById('selected-file-name');
          if (selectedFileNameElement) {
            let fileName = (filePath).split('/').pop();
            console.log(fileName);

            if (fileName) {
              selectedFileNameElement.innerText = `Selected File : ${fileName}`;
            }
          }
        }

      });
  }
}


/*
event listeners from main process
 */
ipcRenderer.on('file-error', (event, arg) => {
  if (arg) {
    let errorElement = document.getElementById('errors');
    if (errorElement) {
      errorElement.innerText = arg;
    }

  }
})

ipcRenderer.on('success', (event, arg) => {
  if (arg) {
    let errorElement = document.getElementById('success-message');
    if (errorElement) {
      errorElement.innerText = arg;
    }

  }
})