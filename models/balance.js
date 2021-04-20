const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "balance",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { tableName: "balance" }
  );
