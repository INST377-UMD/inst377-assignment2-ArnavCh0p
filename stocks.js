const API_KEY = "pB0BOA1Qzn0mw3AoPUQ4j4_TJ9gVHMXr";
const chartCanvas = document.getElementById("stockChart").getContext("2d");
let stockChart = null;

document.getElementById("lookupBtn").addEventListener("click", () => {
  const ticker = document.getElementById("stockTicker").value.toUpperCase();
  const days = parseInt(document.getElementById("dayRange").value);
  if (ticker) fetchStockChart(ticker, days);
});

async function fetchStockChart(ticker, days) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const formatDate = (d) => d.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formatDate(startDate)}/${formatDate(endDate)}?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
    const values = data.results.map(d => d.c);

    if (stockChart) stockChart.destroy();
    stockChart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: `${ticker} Closing Prices`,
          data: values,
          borderColor: 'blue',
          fill: false,
        }]
      }
    });
  } catch (err) {
    alert("Failed to fetch stock data.");
    console.error(err);
  }
}

async function loadRedditStocks() {
  const res = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
  const data = await res.json();

  const top5 = data.slice(0, 5);
  const tbody = document.querySelector("#redditStocks tbody");
  tbody.innerHTML = "";

  top5.forEach(stock => {
    const row = document.createElement("tr");

    const link = `https://finance.yahoo.com/quote/${stock.ticker}`;
    row.innerHTML = `
      <td><a href="${link}" target="_blank">${stock.ticker}</a></td>
      <td>${stock.no_of_comments}</td>
      <td>${stock.sentiment === "Bullish" ? "📈 Bullish" : "📉 Bearish"}</td>
    `;
    tbody.appendChild(row);
  });
}

loadRedditStocks();

if (annyang) {
  annyang.addCommands({
    'lookup *ticker': function(ticker) {
      document.getElementById("stockTicker").value = ticker.toUpperCase();
      fetchStockChart(ticker.toUpperCase(), 30);
    }
  });
}
