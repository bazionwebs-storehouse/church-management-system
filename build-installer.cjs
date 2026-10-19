const builder = require('electron-builder');
const Platform = builder.Platform;

builder.build({
  targets: Platform.WINDOWS.createTarget(['nsis', 'portable'], builder.Arch.x64),
  config: {
    appId: 'org.churchmanagement.system',
    productName: 'Church Management System',
    directories: {
      output: 'release'
    },
    files: [
      'dist/**/*',
      'electron/**/*'
    ],
    win: {
      target: ['nsis', 'portable'],
      icon: 'public/icon.ico',
      sign: null,
      signingHashAlgorithms: []
    },
    nsis: {
      oneClick: false,
      allowToChangeInstallationDirectory: true,
      createDesktopShortcut: true,
      createStartMenuShortcut: true,
      shortcutName: 'Church Management System'
    },
    portable: {
      artifactName: 'Church-Management-System-Portable.exe'
    }
  }
}).then(() => {
  console.log('✅ Build complete! Check the release folder.');
}).catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
