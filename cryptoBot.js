
// cryptoBot.js
const https = require('https');

function fetchSimplePrice(callback) {
  https.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        const price = parsed.bitcoin?.usd;
        if (!price) {
          console.log('⚠️ Price unavailable. Check CoinGecko API.');
          return;
        }

        console.log('📊 BTC Live Price (CoinGecko Simple API):');
        console.log('Current Price: $' + price);
        console.log('✅ Signal: Monitoring only — no indicators due to lack of historical data.');
      } catch (e) {
        console.log('❌ Failed to parse fallback API response:', e.message);
      }
    });
  }).on('error', err => {
    console.log('❌ Error fetching fallback price:', err.message);
  });
}

// Execute fallback fetch
fetchSimplePrice();

// Final guaranteed log
setTimeout(() => {
  console.log('✅ Fallback crypto bot executed.');
}, 3000);
