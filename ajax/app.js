// Wait for the entire HTML page to load before running any JavaScript
document.addEventListener("DOMContentLoaded", () => {

  // --- Link JavaScript variables to our HTML elements ---
  const posterImage = document.getElementById("posterImage");
  const posterQuote = document.getElementById("posterQuote");
  const generateBtn = document.getElementById("generateBtn");
  const status = document.getElementById("status");

  // --- Set our backup content in case the internet fails ---
  const defaultImageUrl = "sheep.jpg"; // Our local fallback image
  const defaultQuote = "The best way to predict the future is to invent it.";

  // --- Set the initial poster content when the page first loads ---
  posterImage.src = defaultImageUrl;
  posterQuote.textContent = defaultQuote;

  // --- This code runs when the "Generate" button is clicked ---
  generateBtn.addEventListener("click", () => {

    // 1. Give the user feedback that something is happening
    status.textContent = "Generating a new masterpiece...";
    generateBtn.disabled = true; // Disable the button to prevent spam-clicking

    // 2. Create a "Promise" to fetch a random image.
    // A Promise is like an IOU for a value that hasn't arrived yet.
    const imagePromise = fetch("https://picsum.photos/1200/800")
      .then(response => {
        // If the download fails, trigger the 'catch' block
        if (!response.ok) {
          throw new Error('Image fetch failed');
        }
        return response.url; // If successful, we get the image URL
      })
      .catch(error => {
        // This is our backup plan if the fetch fails.
        console.error("Image fetch error:", error);
        return defaultImageUrl; // Use our local sheep image instead
      });

    // 3. Create a second "Promise" to fetch a random quote.
    const quotePromise = fetch("https://dummyjson.com/quotes/random")
      .then(response => {
        if (!response.ok) {
          throw new Error('Quote fetch failed');
        }
        return response.json(); // Convert the raw data to a usable format
      })
      .then(data => data.quote) // Grab just the quote text from the data
      .catch(error => {
        // This is the backup plan for the quote.
        console.error("Quote fetch error:", error);
        return defaultQuote; // Use our default quote text
      });

    // 4. Promise.all() waits for BOTH the image and quote to finish downloading.
    // This is the key to our logic. It runs both promises at the same time.
    Promise.all([imagePromise, quotePromise])
      .then(([imageUrl, quoteText]) => {
        // This 'then' block only runs after BOTH promises have succeeded (or used their fallback).
        // '[imageUrl, quoteText]' are the results from the promises above.
        posterImage.src = imageUrl;
        posterQuote.textContent = `"${quoteText}"`;
      })
      .catch(error => {
        // A final safety net in case something unexpected goes wrong.
        console.error("An unexpected error occurred in Promise.all:", error);
        posterImage.src = defaultImageUrl;
        posterQuote.textContent = defaultQuote;
      })
      .finally(() => {
        // 5. The 'finally' block ALWAYS runs, whether the promises succeeded or failed.
        // It's perfect for cleanup tasks.
        status.textContent = "Poster updated successfully!";
        generateBtn.disabled = false; // Re-enable the button for the next click
      });
  });
});