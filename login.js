// login.js
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

function createMainWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 400,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        icon: path.join(__dirname, 'assets', 'icon.ico'),
    });
    win.loadFile('index.html');
}

function createDashboardWindow() {
    const dashWin = new BrowserWindow({
        title: 'Dashboard',
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname,'preload.js'),
        }
    });
    dashWin.maximize();
    dashWin.loadFile('Dashboard.html');
}
app.whenReady().then(() => {
    createMainWindow();

    ipcMain.on('open-dashboard', () => {
        createDashboardWindow();
    });


        // very conservative: only allow whitelisted pages in app root
        if (!file || typeof file !== 'string') return;
        const safe = [
            'Dashboard.html',
            'General Expenditure.html',
            'Revenue.html',
            'Reports.html',
            'index.html'
        ];
        if (!safe.includes(file)) return;

        const w = new BrowserWindow({
            title: file,
            autoHideMenuBar: true,
            webPreferences: {
                preload: path.join(__dirname,'preload.js')
            }
        });
        w.maximize();
        w.loadFile(file);
    });

    ipcMain.on('app-notify', (ev, payload) => {
        // payload: {title, body}
        if (Notification.isSupported()) {
            const n = new Notification({
                title: payload.title || 'Budgets App',
                body: payload.body || ''
            });
            n.show();
        }
    });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
