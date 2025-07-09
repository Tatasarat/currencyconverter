const apiKey = 'https://api.exchangerate-api.com/v4/latest/USD'; // Base: USD
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');

let ratesData = {USD: 1,
    INR: 83.2,
    EUR: 0.91,
    GBP: 0.78,
    JPY: 160.5};

async function fetchRates() {
  try {
    const res = await fetch(apiKey);
    const data = await res.json();
    ratesData = data.rates;

    // Populate dropdowns
    for (let currency in ratesData) {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = option2.value = currency;
      option1.text = option2.text = currency;

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }

    fromCurrency.value = 'USD';
    toCurrency.value = 'INR';
  } catch (error) {
    result.innerText = "Error loading exchange rates.";
  }
}

function convertCurrency() {
  const amt = parseFloat(amount.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amt)) {
    result.innerText = "Please enter a valid number.";
    return;
  }

  const convertedAmount = (amt / ratesData[from]) * ratesData[to];
  result.innerText = `${amt} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
}

fetchRates();
