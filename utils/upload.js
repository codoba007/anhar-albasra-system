const multer = require('multer');
const path = require('path');

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // تأكد من وجود هذا المجلد
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // حفظ الملف باسم فريد
  }
});

// إعداد multer
const upload = multer({ storage: storage });

module.exports = upload;
