PDFDocument = require('pdfkit');
const axios = require('axios');

function buildPDF(dataCallback, endCallback, data) {
  let doc = new PDFDocument();
  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  generateHeader(doc, data.organisation, data.client);
  generateTable(doc, data.items);
  generateFooter(doc);

  doc.end();
}

function generateHeader(doc , organisation, client) {
  doc
    .image(organisation.logo, 100, 50)
    .fillColor('#444444')
    .fontSize(20)
    .text('ACME Inc.', 110, 57)
    .fontSize(10)
    .text('ACME Inc.', 200, 50, { align: 'right' })
    .text(organisation.address, 200, 65, { align: 'right' })
    .text('New York, NY, 10025', 200, 80, { align: 'right' })
    .moveDown();
}

// Function Table
function generateTable(doc, items) {
  const _kTOP_H_LINE_Y = 300;
  const _kBOTTOM_H_LINE_X = 20;
  const _kBOTTOM_H_LINE_Y = 325;
  const _kBOTTOM_H_LINE_Z = 350;
  const _kH_LINE_LENGTH = 600;
  //   Draw the 2 horizontal lines.
  doc
    .moveTo(_kBOTTOM_H_LINE_X, _kBOTTOM_H_LINE_Y)
    .lineTo(_kH_LINE_LENGTH, _kBOTTOM_H_LINE_Y)
    .stroke();
  doc
    .moveTo(_kBOTTOM_H_LINE_X, _kBOTTOM_H_LINE_Z)
    .lineTo(_kH_LINE_LENGTH, _kBOTTOM_H_LINE_Z)
    .stroke();
  doc
    .moveTo(_kBOTTOM_H_LINE_X, _kTOP_H_LINE_Y)
    .lineTo(_kH_LINE_LENGTH, _kTOP_H_LINE_Y)
    .stroke();

  const _kV_LINE_1_X = 20;
  const _kV_LINE_2_X = 50;
  const _kV_LINE_3_X = 450;
  const _kV_LINE_4_X = 500;
  const _kV_LINE_5_X = 550;
  const _kV_LINE_6_X = 600;
  const _kV_LINE_LENGTH = 50;
  //   Draw the vertical lines.
  doc
    .moveTo(_kV_LINE_1_X, _kTOP_H_LINE_Y)
    .lineTo(_kV_LINE_1_X, _kTOP_H_LINE_Y + _kV_LINE_LENGTH)
    .stroke();
  doc
    .moveTo(_kV_LINE_2_X, _kTOP_H_LINE_Y)
    .lineTo(_kV_LINE_2_X, _kTOP_H_LINE_Y + _kV_LINE_LENGTH)
    .stroke();
  doc
    .moveTo(_kV_LINE_3_X, _kTOP_H_LINE_Y)
    .lineTo(_kV_LINE_3_X, _kTOP_H_LINE_Y + _kV_LINE_LENGTH)
    .stroke();
  doc
    .moveTo(_kV_LINE_4_X, _kTOP_H_LINE_Y)
    .lineTo(_kV_LINE_4_X, _kTOP_H_LINE_Y + _kV_LINE_LENGTH)
    .stroke();
  doc
    .moveTo(_kV_LINE_5_X, _kTOP_H_LINE_Y)
    .lineTo(_kV_LINE_5_X, _kTOP_H_LINE_Y + _kV_LINE_LENGTH)
    .stroke();
  doc
    .moveTo(_kV_LINE_6_X, _kTOP_H_LINE_Y)
    .lineTo(_kV_LINE_6_X, _kTOP_H_LINE_Y + _kV_LINE_LENGTH)
    .stroke();
  //   Write the text
  doc
    .fontSize(10)
    .text('#', _kV_LINE_1_X + 5, _kTOP_H_LINE_Y + 5)
    .text('Description', _kV_LINE_2_X + 5, _kTOP_H_LINE_Y + 5)
    .text('Quantity', _kV_LINE_3_X + 5, _kTOP_H_LINE_Y + 5)
    .text('Price', _kV_LINE_4_X + 5, _kTOP_H_LINE_Y + 5)
    .text('Sum', _kV_LINE_5_X + 5, _kTOP_H_LINE_Y + 5);
    items.map((item, index)=>  doc
      .fontSize(10)
      .text(index+1, _kV_LINE_1_X + 5, _kTOP_H_LINE_Y + 5)
      .text(item.description, _kV_LINE_2_X + 5, _kTOP_H_LINE_Y + 5)
      .text(item.quantity, _kV_LINE_3_X + 5, _kTOP_H_LINE_Y + 5)
      .text(item.unitPrice, _kV_LINE_4_X + 5, _kTOP_H_LINE_Y + 5)
      .text(item.totalPrice, _kV_LINE_5_X + 5, _kTOP_H_LINE_Y + 5))
}

// Function Footer
function generateFooter(doc) {
  doc
    .fontSize(8)
    .fillColor('black')
    .text('Payment due upon receipt.', 50, 700, { align: 'center' });
}

module.exports = { buildPDF };
