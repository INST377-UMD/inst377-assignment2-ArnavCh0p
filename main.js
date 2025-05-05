document.getElementById("navbar").innerHTML = `
  <nav>
    <ul>
      <li onclick="window.location.href='index.html'">Home</li>
      <li onclick="window.location.href='stocks.html'">Stocks</li>
      <li onclick="window.location.href='dogs.html'">Dogs</li>
    </ul>
  </nav>
`;

if (annyang) {
  const commands = {
    'hello': () => alert('Hello World'),
    'change the color to *color': (color) => {
      document.body.style.backgroundColor = color;
    },
    'navigate to *page': (page) => {
      page = page.toLowerCase();
      if (page.includes('home')) window.location.href = 'index.html';
      else if (page.includes('stocks')) window.location.href = 'stocks.html';
      else if (page.includes('dogs')) window.location.href = 'dogs.html';
    }
  };

  annyang.addCommands(commands);
  annyang.start();
}
