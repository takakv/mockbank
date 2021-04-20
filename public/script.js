const submitter = document.getElementById("commit-transaction");
const valueField = document.getElementById("amount");
const outgoingField = document.getElementById("action-rm");
const balanceField = document.getElementById("balance");

const getBalance = async () => {
  const response = await fetch("balance", { method: "GET" });
  const data = await response.json();
  balanceField.innerText = data.balance;
};

// Get the balance when the document loads
getBalance();

submitter.onclick = async () => {
  const { value } = valueField;
  const action = outgoingField.checked ? "rm" : "add";

  const response = await fetch(`update/${action}/${value}`, { method: "POST" });
  const data = await response.json();
  balanceField.innerText = data.balance;
};
