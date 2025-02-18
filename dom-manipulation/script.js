// Initial Quote Data (Array of Quote Objects)
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Strive not to be a success, but rather to be of value.", category: "Inspiration" },
    { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", category: "Humor" },
    { text: "Be the change that you wish to see in the world.", category: "Inspiration" },
    { text: "The best way to predict your future is to create it.", category: "Success" }
  ];
  
  // DOM Elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  
  // Function to Display a Random Quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    quoteDisplay.textContent = randomQuote.text;
  }
  
  // Function to Add a New Quote
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (newQuoteText && newQuoteCategory) {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);
      showRandomQuote();  // Update display with the new quote
  
      // Clear the input fields
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
  
      console.log("New quote added:", newQuote);  // Optional: For debugging
  
    } else {
      alert("Please enter both a quote and a category!");
    }
  }
  
  // Attach the showRandomQuote function to the button's click event
  newQuoteButton.addEventListener("click", showRandomQuote);
  
  // Initial quote display on page load
  showRandomQuote();
  
  