const expenseForm = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

let expenses = [];

expenseForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (!title || isNaN(amount) || !date) return;

  const expense = { id: Date.now(), title, amount, date };
  expenses.push(expense);
  renderExpenses();
  expenseForm.reset();
});

function renderExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach(expense => {
    const div = document.createElement('div');
    div.classList.add('expense-item');

    div.innerHTML = `
      <div class="expense-info">
        <strong>${expense.title}</strong><br>
        $${expense.amount.toFixed(2)} — ${expense.date}
      </div>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">X</button>
    `;

    expenseList.appendChild(div);
  });

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmountDisplay.textContent = total.toFixed(2);
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  renderExpenses();
}