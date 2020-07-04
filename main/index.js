// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, nativeImage, ipcMain, globalShortcut, Menu } = require('electron')

const electron = require('electron')

let TrayWindow;
let tray


// Native
const { format } = require('url')
const { platform } = require('os')

// Packages 
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')

// Utils
// Uconst { getConfig } = require('./utils/config')
// const autoUpdater = require('./updater');
const { join } = require('path');


const WINDOW_WIDTH = 320;
const WINDOW_HEIGHT = 500;
const HORIZ_PADDING = 30;
const VERT_PADDING = 30;

if(app.dock){
  app.dock.hide()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  await prepareNext('./renderer')
  createWindow()
  registerGlobalShortcuts()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
function createWindow() {

  // App config app.config = await getConfig()

  const { screen ,nativeTheme  } = electron
  
  let icon = join(__dirname, 'static/icon_tray.png')

  tray = new Tray(icon)
  tray.setToolTip('Commandly');
  TrayWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    minWidth: 320,
    minHeight: 500,
    maxWidth: 320,
    maxHeight: 500,
    show: false,
    frame: false,
    fullscreenable:false, 
    useContentSize: false,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    transparent:true,
    //icon:join(__dirname, 'main/static/icon.png'),
    webPreferences: {
      nodeIntegration: true,
    }
  });
  
  tray.on('click', () => { 
    const cursorPosition = screen.getCursorScreenPoint();
    const primarySize = screen.getPrimaryDisplay().workAreaSize;
    const trayPositionVert = cursorPosition.y >= primarySize.height / 2 ? 'bottom' : 'top';
    const trayPositionHoriz = cursorPosition.x >= primarySize.width / 2 ? () => 'right' : () => 'left';

    TrayWindow.setPosition(getTrayPosX(), getTrayPosY());
    if (TrayWindow.isVisible()) {
      TrayWindow.hide()
    }
    else {
      TrayWindow.show();
    }

    function getTrayPosX() {
      const horizBounds = {
        left: cursorPosition.x - WINDOW_WIDTH / 2,
        right: cursorPosition.x + WINDOW_WIDTH / 2
      }
      if (trayPositionHoriz === 'left') {
        return horizBounds.left <= HORIZ_PADDING ? HORIZ_PADDING : horizBounds.left;
      }

      return horizBounds.right >= primarySize.width ? primarySize.width - HORIZ_PADDING - WINDOW_WIDTH : horizBounds.right - WINDOW_WIDTH;

    }

    function getTrayPosY() {
      return trayPositionVert === 'bottom' ? cursorPosition.y - WINDOW_HEIGHT - VERT_PADDING : cursorPosition.y + VERT_PADDING;
    }

  });
  //TrayWindow.webContents.openDevTools()
  TrayWindow.setSkipTaskbar(true);

  const devPath = 'http://localhost:8000/'

  const prodPath = format({
    pathname: resolve('renderer/out/index.html'),
    protocol: 'file:',
    slashes: true
  })

  const url = isDev ? devPath : prodPath

  if (platform() !== 'win32') {
    // autoUpdater()
  }

  TrayWindow.loadURL(url)
  Menu.setApplicationMenu(null)

  TrayWindow.on('closed', () => {
    TrayWindow = null
  });
  TrayWindow.once('ready-to-show', () => {
    // On first load TrayWindow.show(); // prevent pop on first load 
    ipcMain.on('open-external-window', (event, arg) => {
      electron.shell.openExternal(arg);
    });
  });
  var contextMenu = Menu.buildFromTemplate([{
    label:"quit",
    selector:"terminate:"
  }])
  tray.setContextMenu(contextMenu)
}

function toggleWindow() {
  if (TrayWindow.isVisible()) {
    TrayWindow.hide();
  } else {
    TrayWindow.show();
  }
}

function registerGlobalShortcuts() {
  // Global Shortcut : Toggle Window
  const shortcutToggleWindow = globalShortcut.register("Super+Alt+Left", () => {
    toggleWindow();
  });
  const shortcutToggleState = globalShortcut.register("Super+Alt+Right", () => {
    toggleWindow();
  });
  if (!shortcutToggleState && !shortcutToggleWindow) {
    console.log.warn("Unable to register:CommandOrControl+Down");
  }
}
