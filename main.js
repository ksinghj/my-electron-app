const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadFile('index.html')
    // win.loadURL('https://github.com/ksinghj')

    // Handle the show-context-menu message
    ipcMain.on('show-context-menu', () => {
        const menu = Menu.buildFromTemplate([
            { label: 'Option 1', click: () => console.log('Option 1 clicked') },
            { label: 'Option 2', click: () => console.log('Option 2 clicked') },
            { type: 'separator' },
            { label: 'Option 3', click: () => console.log('Option 3 clicked') }
        ])
        menu.popup(BrowserWindow.getFocusedWindow())
    })
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')

    createWindow()

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
