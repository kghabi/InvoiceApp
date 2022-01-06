const fs = require('fs');

const db = require('../models');
const Image = db.organisations;

const uploadFiles = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      organisationName: req.body.organisationName,
      organisationAddress: req.body.organisationAddress,
      organisationEmail: req.body.organisationEmail,
      organisationPhone: req.body.organisationPhone,
      organisationFax: req.body.organisationFax,
      organisationRegistrationNumber: req.body.organisationRegistrationNumber,
      organisationIban: req.body.organisationIban,
      organisationCommission: req.body.organisationCommission,
      organisationTva: req.body.organisationTva,
      imageName:  `${req.body.organisationName + '.'}${req.file.originalname.split('.').pop()}`
    }).then(() => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};
