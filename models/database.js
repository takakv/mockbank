const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite:bank.db");

sequelize.authenticate().catch(console.error);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.transactions = require("./transaction")(sequelize);
db.balance = require("./balance")(sequelize);

module.exports = db;
