const quoteContainer = document.getElementById('quoteContainer'),
      quote = document.getElementById('quote');
      author = document.getElementById('author'),
      newQuoteBtn = document.getElementById('newQuote');

function fetchQuote() {
  fetch('https://ali-ilman.com/api/quotes.json')
    .then(response => response.json())
    .then(data => {
      let quoteData = shuffle(data).shift();

      if (!quote.hasChildNodes() || quoteData.quote !== quote.childNodes[1].innerText) {
        setQuoteAndAuthor(quoteData.quote, quoteData.author);
      }
      else {
        quoteData = shuffle(data).shift();
        setQuoteAndAuthor(quoteData.quote, quoteData.author);
      }
    });

  function setQuoteAndAuthor(authorQuote, authorName) {
    quote.innerHTML = `<span>“</span><span>${authorQuote}</span><span>”</span>`;
    author.innerText = authorName;
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
fetchQuote();

newQuoteBtn.onclick = fetchQuote;
document.onkeydown = (e) => {
  if (e.key === 'ArrowRight') fetchQuote();
  if (e.key === ' ') fetchQuote();
};
