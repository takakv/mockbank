const transactionsList = document.getElementById("transactions");
let transactions;

// This is very inefficient, since it rewrites all transactions
// but this is a mock application, so it's fine.
const updateTransactions = () => {
  transactionsList.innerHTML = "";
  transactions.forEach((transaction) => {
    const entry = document.createElement("tr");

    // Transaction type
    const type = document.createElement("td");
    type.append(transaction.action === "rm" ? "Expense" : "Income");
    entry.append(type);

    // Transaction amount
    const amount = document.createElement("td");
    amount.append(`${transaction.amount} €`);
    entry.append(amount);

    // Transaction timestamp
    const event = new Date(transaction.createdAt);
    const time = document.createElement("td");
    time.append(event.toLocaleString("en-GB"));
    entry.append(time);

    transactionsList.append(entry);
  });
};

const submitter = document.getElementById("commit-transaction");
const valueField = document.getElementById("amount");
const outgoingField = document.getElementById("action-rm");
const balanceField = document.getElementById("balance");

const getBalance = async () => {
  const response = await fetch("balance");
  if (response.ok) {
    const data = await response.json();
    balanceField.innerText = data.balance;
  } else {
    // eslint-disable-next-line no-alert
    alert("Server error.");
  }
};

const getTransactions = async () => {
  const response = await fetch("transactions");
  if (response.ok) {
    transactions = await response.json();
  } else {
    // eslint-disable-next-line no-alert
    alert("Server error.");
  }
};

// Get the balance and transactions when the document loads
getBalance();
getTransactions().then(() => updateTransactions());

// User has not entered any input yet
submitter.disabled = true;

valueField.oninput = () => {
  const { value } = valueField;
  if (!value) {
    valueField.classList.add("is-invalid");
    submitter.disabled = true;
  } else {
    valueField.classList.remove("is-invalid");
    submitter.disabled = false;
  }
};

submitter.onclick = async () => {
  const { value } = valueField;
  const action = outgoingField.checked ? "rm" : "add";

  const response = await fetch(`update/${action}/${value}`, { method: "POST" });
  if (response.ok) {
    const data = await response.json();
    balanceField.innerText = data.balance;
    await getTransactions();
    updateTransactions();
  } else {
    // eslint-disable-next-line no-alert
    alert("Server error.");
  }
};
