const express = require('express');
const router = express.Router();
const upload = require('../utils/upload_file'); // تأكد من مسار ملف upload_file.js
const { readExcel } = require('../utils/read_excel'); // تأكد من مسار ملف read_excel.js

// صفحة رفع ملف Excel
router.get('/', (req, res) => {
  res.render('upload'); // تأكد من أن لديك ملف Pug يسمى upload.pug
});

// رفع الملف
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const data = await readExcel(req.file.path); // قم بقراءة البيانات من ملف Excel
    // هنا يمكنك حفظ البيانات في MongoDB باستخدام السكيما المناسبة
    // على سبيل المثال:
    // await Bill.insertMany(data); // تأكد من تنسيق البيانات حسب السكيما

    res.redirect('/bills'); // إعادة التوجيه إلى صفحة الفواتير بعد النجاح
  } catch (error) {
    console.error(error);
    res.status(500).send('حدث خطأ أثناء رفع الملف.');
  }
});

module.exports = router;
