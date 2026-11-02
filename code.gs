function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Ma’rifat Avlodi — Olimpiada');
}

function setup() {
  const ss = SpreadsheetApp.create('Ma’rifat Avlodi Olimpiada');
  PropertiesService.getScriptProperties()
    .setProperty('SPREADSHEET_ID', ss.getId());

  const sheet = ss.getActiveSheet();
  sheet.setName('Ishtirokchilar');
  sheet.appendRow([
    'Sana', 'F.I.Sh.', 'Maktab', 'Sinf', 'Ishtirokchi kodi'
  ]);

  return ss.getUrl();
}

function registerStudent(data) {
  const id = PropertiesService.getScriptProperties()
    .getProperty('SPREADSHEET_ID');

  if (!id) throw new Error('Avval setup funksiyasini ishga tushiring.');

  const name = String(data.name || '').trim();
  const school = String(data.school || '').trim();
  const grade = String(data.grade || '').trim();
  const code = String(data.code || '').trim();

  if (!name || !school || !grade || !code) {
    throw new Error('Barcha maydonlarni to‘ldiring.');
  }

  const sheet = SpreadsheetApp.openById(id)
    .getSheetByName('Ishtirokchilar');

  const codes = sheet.getLastRow() > 1
    ? sheet.getRange(2, 5, sheet.getLastRow() - 1, 1)
        .getValues().flat().map(String)
    : [];

  if (codes.includes(code)) {
    throw new Error('Bu ishtirokchi kodi avval ishlatilgan.');
  }

  sheet.appendRow([new Date(), name, school, grade, code]);

  return 'Ro‘yxatdan muvaffaqiyatli o‘tdingiz!';
}