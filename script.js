const API_KEY = 'c4e7646973e841a1b55007197ac59312'; // Open Exchange Rates API key
const API_URL = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;

const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "always",
});

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const dateInput = document.getElementById("date");
const currencySelect = document.getElementById("currency");

let exchangeRates = {};
let selectedCurrency = 'USD';

dateInput.defaultValue = new Date().toISOString().split("T")[0];

form.addEventListener("submit", addTransaction);
currencySelect.addEventListener("change", updateCurrency);

function formatCurrency(value, currency) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    signDisplay: "always",
  });
  return formatter.format(value);
}

function createItem({ id, name, amount, date, type, currency }) {
  const sign = "income" === type ? 1 : -1;
  const convertedAmount = convertCurrency(amount, currency, selectedCurrency);

  const li = document.createElement("li");

  li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>

      <div class="amount ${type}">
        <span>${formatCurrency(convertedAmount * sign, selectedCurrency)}</span>
      </div>
    `;

  li.addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("Delete transaction?")) {
      deleteTransaction(id);
    }
  });

  return li;
}

function updateTotal() {
  const incomeTotal = transactions
    .filter((trx) => trx.type === "income")
    .reduce((total, trx) => total + trx.amount, 0);

  const expenseTotal = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((total, trx) => total + trx.amount, 0);

  const balanceTotal = incomeTotal - expenseTotal;

  balance.textContent = formatCurrency(balanceTotal, selectedCurrency).replace(/^\+/, "");
  income.textContent = formatCurrency(incomeTotal, selectedCurrency);
  expense.textContent = formatCurrency(expenseTotal * -1, selectedCurrency);
}

function renderList() {
  list.innerHTML = "";
  transactions.forEach((transaction) => {
    const li = createItem(transaction);
    list.appendChild(li);
  });
}

function deleteTransaction(id) {
  const index = transactions.findIndex((trx) => trx.id === id);
  transactions.splice(index, 1);

  list.removeChild(list.children[index]);

  updateTotal();
  saveTransactions();
}

function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(form);
  form.reset();

  const uniqueId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  const newTransaction = {
    id: uniqueId,
    name: formData.get("name"),
    amount: parseFloat(formData.get("amount")),
    date: new Date(formData.get("date")),
    type: "on" === formData.get("type") ? "expense" : "income",
    currency: formData.get("currency"),
  };

  if (
    !newTransaction.name ||
    isNaN(newTransaction.amount) ||
    !newTransaction.date
  ) {
    alert("Please fill in all fields correctly.");
    return;
  }

  transactions.push(newTransaction);
  saveTransactions();

  const index = transactions.findIndex((trx) => trx.id === uniqueId);
  const newListItem = createItem(newTransaction);
  if (index === 0) {
    list.prepend(newListItem);
  } else {
    const previousListItem = list.children[index - 1];
    previousListItem.insertAdjacentElement("afterend", newListItem);
  }

  updateTotal();
}

function saveTransactions() {
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return amount;

  const rateFrom = exchangeRates[fromCurrency] || 1;
  const rateTo = exchangeRates[toCurrency] || 1;

  return (amount * rateFrom) / rateTo;
}

function updateCurrency() {
  selectedCurrency = currencySelect.value;
  renderList();
  updateTotal();
}

async function fetchExchangeRates() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    exchangeRates = data.rates;
    renderList();
    updateTotal();
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
}

fetchExchangeRates();
