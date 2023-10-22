const convertButton = document.getElementById('convert');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultSpan = document.getElementById('conversionResult');

// Replace with your API endpoint for currency conversion
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

// Populate currency select options
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        for (const currency of currencies) {
            const option = document.createElement('option');
            option.text = currency;
            fromCurrencySelect.add(option);
            toCurrencySelect.add(option.cloneNode(true));
        }
    });

convertButton.addEventListener('click', () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = amountInput.value;

    // Fetch the latest exchange rates
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency];
            const result = (amount * exchangeRate).toFixed(2);
            resultSpan.textContent = result;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
