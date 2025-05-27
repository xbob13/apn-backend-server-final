
// cryptoBot.js
const https = require('https');

// Calculate EMA
function calculateEMA(prices, period) {
  const k = 2 / (period + 1);
  let ema = prices[0];
  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }
  return ema;
}

// Calculate RSI
function calculateRSI(prices, period = 14) {
  let gains = 0;
  let losses = 0;
  for (let i = 1; i <= period; i++) {
    const delta = prices[i] - prices[i - 1];
    if (delta > 0) gains += delta;
    else losses -= delta;
  }
  const avgGain = gains / period;
  const avgLoss = losses / period;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

// Fetch price data from CoinGecko
function fetchPrices(callback) {
  https.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=2&interval=hourly', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const prices = JSON.parse(data).prices.map(p => p[1]);
      callback(prices);
    });
  }).on('error', err => {
    console.error('Error fetching data:', err.message);
  });
}

// Main logic
fetchPrices(prices => {
  const recent = prices.slice(-50); // Last 50 hours
  const ema12 = calculateEMA(recent.slice(-12), 12);
  const ema26 = calculateEMA(recent.slice(-26), 26);
  const macd = ema12 - ema26;
  const rsi = calculateRSI(recent.slice(-15));

  console.log('📊 BTC Price Analysis:');
  console.log('EMA-12:', ema12.toFixed(2));
  console.log('EMA-26:', ema26.toFixed(2));
  console.log('MACD:', macd.toFixed(2));
  console.log('RSI:', rsi.toFixed(2));

  // Signal logic
  if (rsi < 30 && macd > 0) {
    console.log('✅ Signal: BUY — Oversold + bullish MACD');
  } else if (rsi > 70 && macd < 0) {
    console.log('🔻 Signal: WAIT — Overbought + bearish MACD');
  } else {
    console.log('🕒 Signal: HOLD — No clear trend');
  }
});
