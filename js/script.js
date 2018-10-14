const quoteContainer = document.getElementById('quoteContainer'),
      quote = document.getElementById('quote');
      author = document.getElementById('author'),
      newQuoteBtn = document.getElementById('newQuote');

function fetchQuote() {
  fetch('https://random-quote-generator-be.herokuapp.com/api/v1/quotes')
    .then(response => response.json())
    .then(json => {
      let quoteData = shuffle(json.data).shift();

      if (!quote.hasChildNodes() || quoteData.attributes.quote !== quote.childNodes[1].innerText) {
        setQuoteAndAuthor(quoteData.attributes.quote, quoteData.attributes.originator.name);
      }
      else {
        quoteData = shuffle(json.data).shift();
        setQuoteAndAuthor(quoteData.attributes.quote, quoteData.attributes.originator.name);
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
