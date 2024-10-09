const Bill = require('../models/Bill');

// billController.js
const importExcelToMongo = require('../utils/excelImport');
const path = require('path');

// دالة استيراد البيانات من Excel
exports.importFromExcel = async (req, res) => {
  try {
    // تأكد أن الملف موجود في الطلب
    if (!req.file) {
      return res.status(400).json({ message: 'الرجاء تحميل ملف Excel.' });
    }

    // مسار الملف المرفوع
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    // استدعاء دالة استيراد البيانات
    await importExcelToMongo(filePath);

    res.status(200).json({ message: 'تم استيراد البيانات بنجاح!' });
  } catch (error) {
    console.error('خطأ في استيراد البيانات:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء استيراد البيانات.' });
  }
};

// عرض كل الفواتير
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.render('bills/bills-dashboard', { title: 'قائمة الفواتير', bills });
  } catch (error) {
    res.status(500).send('خطأ في جلب الفواتير');
  }
};

// عرض صفحة انشاء فاتوره
exports.getCreateBill = async (req, res) => {
  try {
    res.render('bills/create', { title: 'إنشاء فاتورة جديدة' });
  } catch (error) {
    res.status(500).send('خطا في جلب صفحة انشاء فاتوره')
  }
  
}

// عرض فاتورة معينة
exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).send('الفاتورة غير موجودة');
    }
    res.render('bills/detail', { title: 'تفاصيل الفاتورة', bill });
  } catch (error) {
    res.status(500).send('خطأ في جلب الفاتورة');
  }
};
// عرض فاتورة معينة
exports.getBillByIdInvoice = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).send('الفاتورة غير موجودة');
    }
    res.render('bills/invoice', { title: ' الفاتورة', bill });
  } catch (error) {
    res.status(500).send('خطأ في جلب الفاتورة');
  }
};

// إنشاء فاتورة جديدة
exports.createBill = async (req, res) => {
  const { bill_date, party, type, responsible, restriction, name, count, diq_price, usd_price, detail, note, vhicle_number } = req.body;
  const bill = new Bill({
    bill_date,
    party,
    type,
    responsible,
    restriction,
    name,
    count,
    diq_price,
    usd_price,
    detail,
    note,
    vhicle_number
  });
  try {
    await bill.save();
    res.redirect('/bills'); // إعادة توجيه إلى صفحة قائمة الفواتير بعد الحفظ
  } catch (err) {
    console.error(err);
    res.render('bills/new', { error: 'خطأ في إنشاء الفاتورة' });
  }
};

// صفحة تعديل الفاتورة
exports.editBillPage = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).send('الفاتورة غير موجودة');
    }
    res.render('bills/edit', { title: 'تعديل الفاتورة', bill });
  } catch (error) {
    res.status(500).send('خطأ في تحميل صفحة التعديل');
  }
};

// دالة تعديل الفاتورة
exports.updateBill = async (req, res) => {
  const { bill_date, party, type, responsible, restriction, name, count, diq_price, usd_price, detail, note, vhicle_number } = req.body;
  const billId = req.params.id; // تأكد من الحصول على معرف الفاتورة من المعاملات

  try {
    // تحديث الفاتورة باستخدام findByIdAndUpdate
    await Bill.findOneAndUpdate({_id:billId}, {
      bill_date,
      party,
      type,
      responsible,
      restriction,
      name,
      count,
      diq_price,
      usd_price,
      detail,
      note,
      vhicle_number
    });

    // إعادة توجيه المستخدم إلى صفحة الفواتير
    
    res.redirect('/bills');
  } catch (error) {
    console.error(error);
    req.flash('error', 'فشل في تعديل الفاتورة، يرجى المحاولة مرة أخرى.');
    res.redirect(`/bills/${billId}/edit`);
  }
};

// حذف الفاتورة
exports.deleteBill = async(req, res)=>{
  console.log("delete");
  
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).send('الفاتورة غير موجودة');
    }
    res.redirect('/bills');
  } catch (error) {
    res.status(500).send('خطأ في حذف الفاتورة');
  }
};

exports.getDailly = async(req,res)=>{
  // الحصول على تاريخ اليوم مع ضبط الساعة
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // بداية اليوم
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); // نهاية اليوم

  try {
    // البحث عن عدد الفواتير المسجلة بين بداية اليوم ونهايته
    const count = await Bill.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay }
    });
    res.json(count);
  } catch (error) {
    console.error('Error fetching today bills count:', error);
    return 0;
  }
}