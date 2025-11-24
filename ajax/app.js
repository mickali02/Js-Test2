// Default values
const defaultImage = "https://via.placeholder.com/800x400?text=Default+Image";
const defaultQuote = "This is your default quote.";

document.getElementById("generateBtn").addEventListener("click", () => {
  const posterImage = document.getElementById("posterImage");
  const posterQuote = document.getElementById("posterQuote");
  const status = document.getElementById("status");

  // 1. Update status
  if (status) status.textContent = "Loading poster...";

  // 2. Fetch image
  fetch("https://picsum.photos/800/400")
    .then(res => res.url) 
    .catch(() => defaultImage) 
    .then(imgUrl => {
      if (posterImage) posterImage.src = imgUrl; // 4. Update DOM with image
    });

  // 3. Fetch quote
  fetch("https://dummyjson.com/quotes/random")
    .then(res => {
      if (!res.ok) throw new Error("Quote fetch failed");
      return res.json();
    })
    .then(data => {
      if (posterQuote) {
        if (data && data.quote) {
           posterQuote.textContent = data.quote;
        } else {
           posterQuote.textContent = defaultQuote;
        }
      }
    })
    .catch(() => {
      if (posterQuote) {
        posterQuote.textContent = defaultQuote;
      }
    })
    .finally(() => {
      if (status) {
        status.textContent = "Poster updated!";
      }
    });
});