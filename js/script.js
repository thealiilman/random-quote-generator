const quoteContainer = document.getElementById('quoteContainer'),
      quote = document.getElementById('quote');
      author = document.getElementById('author'),
      newQuoteBtn = document.getElementById('newQuote');

function fetchQuote() {
  fetch('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', { cache: "no-cache" })
    .then(response => response.json())
    .then(data => {
      let quoteData = data.shift();
      let quoteText = quoteData.content.slice(3).slice(0, -5);

      quote.innerHTML = "<span>“</span>" + decodeEntities(quoteText) + "<span>”</span>";
      author.innerText = decodeEntities(quoteData.title);
    });

  function decodeEntities(encodedString) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    let encoded = textArea.value;

    textArea.remove();
    return encoded;
  }
}
fetchQuote();

newQuoteBtn.onclick = fetchQuote;
document.onkeydown = (e) => {
  if (e.key === 'ArrowRight') fetchQuote();
  if (e.key === ' ') fetchQuote();
};
