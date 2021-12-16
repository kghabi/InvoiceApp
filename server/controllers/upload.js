const fs = require('fs');

const db = require('../models');
const Image = db.organisations;

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

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
      imageType: req.file.mimetype,
      imageName: req.file.originalname,
      imageData: fs.readFileSync(
        __basedir + '\\resources\\uploads\\' + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + '\\resources\\tmp\\' + image.imageName,
        image.imageData
      );

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
