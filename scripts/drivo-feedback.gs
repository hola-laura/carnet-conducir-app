function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const parent = DriveApp.getFolderById('1GgpLW06YAVNBayY1Bey9NbQ58qwC03VT');

  let sheetFile;
  const sheets = parent.getFilesByName('Reportes Drivo Test');
  if (sheets.hasNext()) {
    sheetFile = sheets.next();
  } else {
    const ssNew = SpreadsheetApp.create('Reportes Drivo Test');
    sheetFile = DriveApp.getFileById(ssNew.getId());
    sheetFile.moveTo(parent);
  }

  const ss = SpreadsheetApp.openById(sheetFile.getId());
  let sheet = ss.getSheetByName('Reportes');
  if (!sheet) {
    sheet = ss.insertSheet('Reportes');
    sheet.appendRow(['Fecha', 'Tipo', 'ID', 'Pregunta', 'Comentario', 'Foto']);
    const extra = ss.getSheets();
    if (extra.length > 1 && extra[0].getName() !== 'Reportes') {
      ss.deleteSheet(extra[0]);
    }
  }

  let photos;
  const folders = parent.getFoldersByName('Fotos reportes');
  photos = folders.hasNext() ? folders.next() : parent.createFolder('Fotos reportes');

  let photoUrl = '';
  if (data.photo) {
    const raw = String(data.photo).replace(/^data:image\/\w+;base64,/, '');
    const blob = Utilities.newBlob(
      Utilities.base64Decode(raw),
      'image/jpeg',
      'reporte-' + Date.now() + '.jpg'
    );
    const file = photos.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    photoUrl = file.getUrl();
  }

  sheet.appendRow([
    new Date(),
    data.type || '',
    data.questionId || '',
    data.questionText || '',
    data.userNote || '',
    photoUrl
  ]);

  return ContentService.createTextOutput('ok');
}
