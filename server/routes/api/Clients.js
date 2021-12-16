const express = require('express');
const router = express.Router();
const { Clients } = require('../../models');

// @route    Post api/client
// @desc     Create a client
// @access   Public
router.post('/', async (req, res) => {
  const client = req.body;
  await Clients.create(client);
  res.json(client);
});

// @route    Post api/clients
// @desc     Edit a client
// @access   Public
router.post('/:id', async (req, res) => {
  try {
    const Client = await Clients.findByPk(req.params.id);
    const id = req.params.id;
    const updateClient = {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      website: req.body.website,
    };
    if (!Client) {
      return res.status(404).json({ msg: 'Client not found' });
    }
    await Clients.update(updateClient, { where: { id: id } });
    res.json({ msg: 'Client Updated' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route    Get api/clients
// @desc     Get All clients
// @access   Public
router.get('/', async (req, res) => {
  const listOfClients = await Clients.findAll();
  res.json(listOfClients);
});

// @route    Get api/clients/:id
// @desc     Get client by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const Client = await Clients.findByPk(req.params.id);

    if (!Client) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    res.json(Client);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    Delete api/clients/:id
// @desc     Delete client by ID
// @access   Public
router.delete('/:id', async (req, res) => {
  try {
    const delClient = await Clients.findByPk(req.params.id);

    if (!delClient) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    await delClient.destroy();

    res.json({ msg: 'Client removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    Delete api/clients
// @desc     Delete All clients
// @access   Public
router.delete('/', async (req, res) => {
  try {
    const AllClients = await Clients.findAll();
    if (!AllClients == AllClients) {
      return res.status(404).json({ msg: 'Clients not found' });
    }
    await Clients.destroy({
      where: {},
    });
    res.json({ msg: 'Clients removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Clients not found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
