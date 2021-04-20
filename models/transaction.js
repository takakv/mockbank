const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "+",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      balance: {
        type: DataTypes.INTEGER,
      },
    },
    { tableName: "transactions" }
  );
