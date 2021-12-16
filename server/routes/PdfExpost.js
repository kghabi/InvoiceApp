const express = require('express');
const pdfService = require('../service/pdf-service');
const { PdfDataModel, PdfDataModelItem } = require('../DTOs/PdfDataModel');
const router = express.Router();

router.get('/invoice', async (req, res, next) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=invoice.pdf',
  });
  let data = new PdfDataModel();
  data.organisation = await Organisation.findByPk();
  data.items = req.body.items;
  data.client = req.body.client;
  data.note = req.body.note;
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    data
  );
});

module.exports = router;
