const express = require('express');
const router = express.Router();
const uploadController = require('../../controllers/upload');
const upload = require('../../middleware/upload');
const db = require('../../models');
const Organisation = db.organisations;
const fs = require('fs-extra');

let routes = (app) => {
  router.post(
    '/api/settings/organisation_settings',
    upload.single('file'),
    uploadController.uploadFiles
  );

  // get All organisation
  router.get('/api/settings/organisation_settings', async (req, res) => {
    const organisation = await Organisation.findAll();
    res.json(organisation);
    console.log(organisation);
  });

  // get Organisation By Id
  router.get('/api/settings/organisation_settings/:id', async (req, res) => {
    try {
      const organisation = await Organisation.findByPk(req.params.id);

      if (!organisation) {
        return res.status(404).json({ msg: 'Organisation not found' });
      }

      res.json(organisation);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Organisation not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  // delete All organisation
  router.delete('/api/settings/organisation_settings', async (req, res) => {
    try {
      const organisation = await Organisation.findAll();
      if (!organisation == organisation) {
        return res.status(404).json({ msg: 'Organisation not found' });
      }
      await Organisation.destroy({
        where: {},
      });
     
      fs.emptyDir('resources/uploads', (err) => {
        if (err) return console.error(err);
      });

      res.json({ msg: 'Organisation removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Organisation not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  // delete  organisation by Id
  router.delete('/api/settings/organisation_settings/:id', async (req, res) => {
    try {
      const organisation = await Organisation.findByPk(req.params.id);
      if (!organisation) {
        return res.status(404).json({ msg: 'Organisation not found' });
      }
      await organisation.destroy({
        where: {},
      });
      res.json({ msg: 'Organisation removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Organisation not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  return app.use('/', router);
};

module.exports = routes;
