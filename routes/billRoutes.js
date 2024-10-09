const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const upload = require('../utils/upload')



//! get
// عرض جميع الفواتير 
router.get('/', billController.getAllBills);

// صفحة انشاء فاتوره جديده
router.get('/create', billController.getCreateBill);

// ارجاع كم فاتوره تمت اليوم 
router.get('/dailly',billController.getDailly);

// عرض تفاصيل فاتورة معينة
router.get('/:id', billController.getBillById);

// صفحة تعديل فاتورة موجودة
router.get('/:id/edit', billController.editBillPage);

// عرض الفاتوره
router.get('/:id/invoice',billController.getBillByIdInvoice);


//! post
// إنشاء فاتورة جديدة
//router.post('/import',upload.upload.single('excel'),billController.importFromExcel)

router.post('/', billController.createBill);

// تعديل فاتورة موجودة
router.post('/:id/edit', billController.updateBill);

// حذف فاتوره معينه
router.post('/:id/delete', billController.deleteBill);



//! patch


//! delete




module.exports = router;
