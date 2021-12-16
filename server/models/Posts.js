module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
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

  return Posts;
};
