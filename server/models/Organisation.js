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
      type: DataTypes.INTEGER,
    },
    organisationFax: {
      type: DataTypes.INTEGER,
    },
    organisationRegistrationNumber: {
      type: DataTypes.INTEGER,
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
