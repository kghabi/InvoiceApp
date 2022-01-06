const express = require('express');
const router = express.Router();
const { Invoices } = require('../../models');

// @route    Post api/invoices
// @desc     Create a invoice
// @access   Public
router.post('/', async (req, res) => {
  const invoice = req.body;
  await Invoices.create(invoice);
  res.json(invoice);
});

// @route    Post api/invoices
// @desc     Edit a invoice
// @access   Public
router.put('/:id', async (req, res) => {
  try {
    const Invoice = await Invoices.findByPk(req.params.id);
    const id = req.params.id;
    const updateInvoice = {
      client: req.body.client,
      invoiceNumber: req.body.invoiceNumber,
      currency: req.body.currency,
      items: req.body.items,
      quantity: req.body.quantity,
      price: req.body.price,
    };
    if (!Invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }
    await Invoices.update(updateInvoice, { where: { id: id } });
    res.json({ msg: 'Invoice Updated' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route    Get api/invoices
// @desc     Get All invoice
// @access   Public
router.get('/', async (req, res) => {
  const listOfInvoices = await Invoices.findAll();
  res.json(listOfInvoices);
});

// @route    Get api/invoices/:id
// @desc     Get invoice by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const Invoice = await Invoices.findByPk(req.params.id);

    if (!Invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    res.json(Invoice);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Invoice not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    Get api/invoices/clientName
// @desc     Get invoice by clientName
// @access   Public
router.get('/:name', async (req, res) => {
  try {
    const Invoice = await Invoices.findOne();

    if (!Invoice) {
      return res.status(404).json({ msg: ' not found' });
    }

    res.json(Invoice);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: ' not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    Delete api/invoices/:id
// @desc     Delete invoice by ID
// @access   Public
router.delete('/:id', async (req, res) => {
  try {
    const delPost = await Invoices.findByPk(req.params.id);

    if (!delPost) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    await delPost.destroy();

    res.json({ msg: 'Invoice removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Invoice not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    Delete api/invoices
// @desc     Delete All invoices
// @access   Public
router.delete('/', async (req, res) => {
  try {
    const AllInvoices = await Invoices.findAll();
    if (!AllInvoices == AllInvoices) {
      return res.status(404).json({ msg: 'Invoices not found' });
    }
    await Invoices.destroy({
      where: {},
    });
    res.json({ msg: 'Invoices removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Invoices not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
