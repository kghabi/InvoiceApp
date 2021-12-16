const express = require('express');
const router = express.Router();
const { InvoiceDetails } = require('../../models');

// @route    Post api/settings/invoice_details
// @desc     Create invoice_details
// @access   Public
router.post('/', async (req, res) => {
  const invoiceDetails = req.body;
  await InvoiceDetails.create(invoiceDetails);
  res.json(invoiceDetails);
});

// @route    Get api/settings/invoice_details
// @desc     Get All invoice_details
// @access   Public
router.get('/', async (req, res) => {
  const detailsLists = await InvoiceDetails.findAll();
  res.json(
    // return the values widhout date
    detailsLists.map((el) => {
      let el1 = { ...el.dataValues };
      delete el1.createdAt;
      delete el1.updatedAt;
      return el1;
    })
  );
});

// @route    Get api/settings/invoice_details/:id
// @desc     Get invoice_details by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const invoice_details = await InvoiceDetails.findByPk(req.params.id);

    if (!invoice_details) {
      return res.status(404).json({ msg: 'invoice details not found' });
    }

    res.json(invoice_details);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'invoice details not found' });
    }
    res.status(500).send('Server Error');
  }
});


// @route    Delete api/settings/invoice_details/:id
// @desc     Delete invoice_details by ID
// @access   Public
router.delete('/:id', async (req, res) => {
  try {
    const delDetails = await InvoiceDetails.findByPk(req.params.id);

    if (!delDetails) {
      return res.status(404).json({ msg: 'InvoiceDetails not found' });
    }

    await delDetails.destroy();

    res.json({ msg: 'InvoiceDetails removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'InvoiceDetails not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    Delete api/settings/invoice_details
// @desc     Delete All invoice_details
// @access   Public
router.delete('/', async (req, res) => {
  try {
    const AllDetails = await InvoiceDetails.findAll();
    if (!AllDetails == AllDetails) {
      return res.status(404).json({ msg: 'InvoiceDetails not found' });
    }
    await InvoiceDetails.destroy({
      where: {},
    });
    res.json({ msg: 'InvoiceDetails removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'InvoiceDetails not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
