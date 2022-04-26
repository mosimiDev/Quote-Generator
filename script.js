const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
// Show Loading
function loading() {
 loader.hidden = false;
 quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
 quoteContainer.hidden = false;
 loader.hidden = true;
}
// show new quotes
function newQuote() {
 loading();
 // pick a random quote from apiQuotes array
 const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
 // Checkmif author field is blank and replace with 'unknown'
 if (!quote.author) {
  authorText.textContent=" Unknown"
 } else {
  authorText.textContent = quote.author;
 }
 // Check quote length to determine styling
 if (quote.text.length > 150) { 
  quoteText.classList.add('long-quote');
 } else {
  quoteText.classList.remove('long-quote');
 }
 // Set Quote, Hide Loader
 quoteText.textContent = quote.text;
 complete();
}
// Get quotes from API
async function getQuotes() {
 loading();
 const apiUrl = 'https://type.fit/api/quotes';
 try {
  const response = await fetch(apiUrl);
  apiQuotes = await response.json();
  newQuote()
 } catch (error) {
  // Catch Error Here
 }
}
// Tweet Quote
function tweetQuote() {
 const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
 window.open(twitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuotes();

// OR!!!
//function newQuote() {
 // pick a random quote from apiQuots array
 // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
 // console.log(quote);
// }