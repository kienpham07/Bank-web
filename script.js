'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//            Bank Web (JS Vanilla)

// Data
const account1 = {
  owner: 'Kien Pham',
  movements: [500.25, -120, 600.75, 15000, -300.5, -50, 200.1, 800],
  interestRate: 1.2,
  pin: 1111,

  movementsDates: [
    '2025-01-10T10:15:00.000Z',
    '2025-02-12T11:20:00.000Z',
    '2025-03-15T09:00:00.000Z',
    '2025-04-18T08:45:00.000Z',
    '2025-05-20T14:30:00.000Z',
    '2025-06-25T16:50:00.000Z',
    '2025-07-30T19:10:00.000Z',
    '2025-08-05T12:25:00.000Z',
  ],
  currency: 'VND',
  locale: 'vn-VN',
};

const account2 = {
  owner: 'Stephen Curry',
  movements: [6000, 3200.5, -200, -850.75, -3100, -1200, 9000.1, -50],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2025-01-05T12:00:00.000Z',
    '2025-01-25T09:30:00.000Z',
    '2025-02-20T07:45:00.000Z',
    '2025-03-15T15:10:00.000Z',
    '2025-04-10T16:40:00.000Z',
    '2025-05-12T13:20:00.000Z',
    '2025-06-22T17:55:00.000Z',
    '2025-07-18T11:05:00.000Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Lebron James',
  movements: [300, -150.5, 400.25, -250, -60.75, 100, 500.5, -300],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2025-01-02T08:10:00.000Z',
    '2025-01-20T10:25:00.000Z',
    '2025-02-15T12:45:00.000Z',
    '2025-03-10T14:30:00.000Z',
    '2025-04-05T16:15:00.000Z',
    '2025-05-01T18:50:00.000Z',
    '2025-06-18T20:05:00.000Z',
    '2025-07-22T09:40:00.000Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Michael Jordan',
  movements: [500.75, 1200, 800.5, 100, 150.25],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2025-02-10T11:15:00.000Z',
    '2025-03-12T10:50:00.000Z',
    '2025-04-15T08:40:00.000Z',
    '2025-05-18T14:25:00.000Z',
    '2025-06-20T16:30:00.000Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

// Select the login form rather than a button. There are two elements
// using the `.login__btn` class (instruction and submit), so the original
// querySelector was returning the wrong element and the handler never fired
// when the user clicked the arrow. Using the form's submit event is simpler
// and also handles pressing Enter.
const loginForm = document.querySelector('.login');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov.toFixed(2)} $</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accs, movs) => accs + movs, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} $`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(movs => movs > 0)
    .reduce((accs, movs) => accs + movs, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} $`;

  const out = acc.movements
    .filter(movs => movs < 0)
    .reduce((accs, movs) => accs + movs, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} $`;

  const interest = acc.movements
    .filter(movs => movs > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((accs, movs) => accs + movs, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} $`;
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

// Handle login as a form submission. This catches both clicking the
// login arrow and pressing Enter in either field. Normalise the
// username entry so that casing/extra whitespace can't prevent a match.
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = inputLoginUsername.value.toLowerCase().trim();
  const pin = Number(inputLoginPin.value);

  currentAccount = accounts.find(acc => acc.username === username);

  if (currentAccount && currentAccount.pin === pin) {
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display UI message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[1]
    }`;
    containerApp.style.opacity = 1; // opacity expects 0-1 range

    // Update UI
    updateUI(currentAccount);
  } else {
    // optional: give user feedback when login fails
    labelWelcome.textContent = 'Login failed – check credentials';
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value,
  );

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    currentAccount.username !== receiverAcc?.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(Number(inputLoanAmount.value));
  if (
    amount > 0 &&
    currentAccount.movements.some(movs => movs > amount * 0.1)
  ) {
    // Add movements
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username,
    );

    // Delete account
    accounts.splice(index, 1);
    console.log(index);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// Change sorted state when click the sort button multiple times
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// ---------- Test accounts modal logic ----------
const btnTestAccounts = document.getElementById('btn-test-accounts');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnModalClose = document.querySelector('.modal__close');

const openTestModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeTestModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnTestAccounts.addEventListener('click', function (e) {
  e.preventDefault();
  openTestModal();
});

overlay.addEventListener('click', closeTestModal);
btnModalClose.addEventListener('click', closeTestModal);

// close modal with ESC key
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeTestModal();
  }
});
