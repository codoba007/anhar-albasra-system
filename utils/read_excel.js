
const XLSX = require('xlsx');
const Bill = require('../models/bill'); // تأكد من مسار ملف الموديل

// دالة لقراءة ملف Excel
async function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // تحويل البيانات إلى JSON
  const data = XLSX.utils.sheet_to_json(sheet);

  // يمكن هنا معالجة البيانات لتتناسب مع السكيما الخاصة بك
  // على سبيل المثال، يمكنك تحويل البيانات إلى شكل يناسب موديل الفاتورة

  return data;
}



function excelDateToJSDate(serial) {
    const startDate = new Date(1900, 0, 1); // بداية تاريخ Excel: 1 يناير 1900
    const days = serial - 1; // طرح يوم واحد لتعويض البداية
    startDate.setDate(startDate.getDate() + days); // إضافة عدد الأيام

    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0'); // الشهر يبدأ من 0
    const day = String(startDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // الصيغة: YYYY-MM-DD
}

function xlsx_to_json_eng(filePath) {
    const data = xlsx_to_json(filePath);
    const englishDataArray = data.map(arabicData => {
        return {
            "date": arabicData["التاريخ"],
            "entity": arabicData["الجهة"],
            "type": arabicData["نوع"],
            "responsible": arabicData["المسؤول"],
            "record": arabicData["القيد"],
            "name": arabicData["الاسم"],
            "quantity": arabicData["العدد"],
            "amount": arabicData["المبلغ"],
            "details": arabicData["التفاصيل"],
            "debtors": arabicData["المدينون"]
        };
    });
    return englishDataArray;
}


module.exports = {readExcel,excelDateToJSDate,xlsx_to_json_eng}