const cryptoList = document.querySelectorAll(".crypto-list li");

const coinsUrl = ["https://www.mercadobitcoin.net/api/BTC/ticker/", "https://www.mercadobitcoin.net/api/LTC/ticker/", "https://www.mercadobitcoin.net/api/ETH/ticker/", "https://www.mercadobitcoin.net/api/DOGE/ticker/"];

// Fetch APIs
function getCoin(urls) {
  urls.forEach(url => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => printCoinValue(data, url));
  });
}

function printCoinValue(data, url) {
  cryptoList.forEach(cryptoItem => {
    if (url.includes(cryptoItem.className.toUpperCase())) {
      let lastValue = data.ticker.last;
      let currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lastValue);
      cryptoItem.querySelector(".last-value").textContent = currency;
    }
  });
}

getCoin(coinsUrl);
// Get last price every 5 seconds
window.setInterval(getCoin, 5000, coinsUrl);


