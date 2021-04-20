const express = require("express");
const bodyParser = require("body-parser");

const PORT = 4000;
const HOST = "127.0.0.1";

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const db = require("./models/database");

// Create the database
(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    await db.balance.findOrCreate({
      where: {
        id: "value",
      },
      defaults: {
        id: "value",
        balance: 3000,
      },
    });
  } catch (e) {
    console.error(e);
  }
})();

app.post("/update/:action/:val?", async (req, res) => {
  // Parse parameters.
  const { action } = req.params;
  if (action !== "add" && action !== "rm") return res.sendStatus(400);

  const val = parseFloat(req.params.val);
  if (Number.isNaN(val)) return res.sendStatus(400);

  // Execute database update.
  try {
    let { balance } = await db.balance.findByPk("value");
    balance = action === "add" ? balance + val : balance - val;
    await db.balance.update({ balance }, { where: { id: "value" } });
    await db.transactions.create({
      action,
      amount: val,
    });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
