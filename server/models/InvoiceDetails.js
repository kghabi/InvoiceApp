module.exports = (sequelize, DataTypes) => {
  const invoiceDetails = sequelize.define('InvoiceDetails', {
    defaultCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceNotes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return invoiceDetails;
};
