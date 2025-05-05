async function fetchQuote() {
    try {
      const res = await fetch('https://zenquotes.io/api/random');
      const data = await res.json();
      document.getElementById('quote').textContent = `"${data[0].q}" — ${data[0].a}`;
    } catch (err) {
      document.getElementById('quote').textContent = "Couldn't load quote.";
    }
  }
  
  fetchQuote();
  