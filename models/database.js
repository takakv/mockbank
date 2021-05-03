const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_SRC ?? "sqlite:bank.db");

sequelize.authenticate().catch(console.error);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.transactions = require("./transaction")(sequelize);
db.balance = require("./balance")(sequelize);

module.exports = db;
