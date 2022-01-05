module.exports = (sequelize, DataTypes) => {
  const Invoices = sequelize.define('Invoices', {
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Invoices;
};
