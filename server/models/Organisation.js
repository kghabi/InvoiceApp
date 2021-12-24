module.exports = (sequelize, DataTypes) => {
  const Organisation = sequelize.define('organisation', {
    organisationName: {
      type: DataTypes.STRING,
    },
    organisationAddress: {
      type: DataTypes.STRING,
    },
    organisationEmail: {
      type: DataTypes.STRING,
    },
    organisationPhone: {
      type: DataTypes.STRING,
    },
    organisationFax: {
      type: DataTypes.STRING,
    },
    organisationRegistrationNumber: {
      type: DataTypes.STRING,
    },
    organisationIban: {
      type: DataTypes.STRING,
    },
    organisationCommission: {
      type: DataTypes.STRING,
    },
    organisationTva: {
      type: DataTypes.STRING,
    },
    imageType: {
      type: DataTypes.STRING,
    },
    imageName: {
      type: DataTypes.STRING,
    },
    imageData: {
      type: DataTypes.BLOB('long'),
    },
  });

  return Organisation;
};
