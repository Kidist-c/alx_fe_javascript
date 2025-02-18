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
      quoteDisplay.innerHTML = "No quotes available."; // Use innerHTML
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = randomQuote.text; // Use innerHTML
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
  
  // Using Local Storage

// Function to load quotes from local storage
function loadQuotesFromLocalStorage() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
  updateQuoteList(); // Refresh the display after loading
}

// Function to save quotes to local storage
function saveQuotesToLocalStorage() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Modify the addQuote function to also save to local storage
function addQuote() {
  const newQuoteText = document.getElementById('newQuote').value;
  if (newQuoteText.trim() !== '') {
    quotes.push(newQuoteText);
    updateQuoteList();
    saveQuotesToLocalStorage(); // Save after adding a quote
    document.getElementById('newQuote').value = ''; // Clear input
  }
}

// Call loadQuotesFromLocalStorage when the page loads
window.onload = function() {
  loadQuotesFromLocalStorage();
};


// Using Session Storage (Optional)

// Function to save the last viewed quote index to session storage
function saveLastViewedQuoteIndex(index) {
  sessionStorage.setItem('lastViewedQuoteIndex', index);
}

// Function to retrieve the last viewed quote index from session storage
function getLastViewedQuoteIndex() {
  const index = sessionStorage.getItem('lastViewedQuoteIndex');
  return index ? parseInt(index, 10) : 0; // Default to 0 if not found
}

// Example usage in the displayQuote function (modify as needed)
function displayQuote() {
  let index = Math.floor(Math.random() * quotes.length);
  const quoteElement = document.getElementById('quoteDisplay');

  // Try to get last viewed index
  const lastViewedIndex = getLastViewedQuoteIndex();

  // If the last viewed index is valid, use it. Otherwise random as before.
  if (lastViewedIndex >= 0 && lastViewedIndex < quotes.length) {
      index = lastViewedIndex;
  }

  quoteElement.textContent = quotes[index];
  saveLastViewedQuoteIndex(index); // Store the current index

  // Update the active class on the list
  updateQuoteList(index);
  // createAddQuoteForm functionality (add to your script.js):

function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.id = 'addQuoteFormContainer'; // added ID for easier styling

  const label = document.createElement('label');
  label.textContent = 'New Quote:';
  label.setAttribute('for', 'newQuoteInput'); // accessibility

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'newQuoteInput';
  input.name = 'newQuote';  // for form processing if needed
  input.placeholder = 'Enter your quote here';
  input.required = true;  // basic validation

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.type = 'button'; // important to prevent form submission if within a form
  addButton.addEventListener('click', addQuoteFromForm);  // different add function

  // add button should not automatically submit the form


  formContainer.appendChild(label);
  formContainer.appendChild(input);
  formContainer.appendChild(addButton);

  return formContainer;
}


function addQuoteFromForm() { // New function to handle add from the form
  const newQuoteText = document.getElementById('newQuoteInput').value;
  if (newQuoteText.trim() !== '') {
      quotes.push(newQuoteText);
      updateQuoteList();
      saveQuotesToLocalStorage(); // Save after adding a quote
      document.getElementById('newQuoteInput').value = ''; // Clear input
  }
}


// Call this function somewhere to add the form to the DOM:
// For example, you can append it to a specific element with id 'content':
// document.getElementById('content').appendChild(createAddQuoteForm());

// or add it to the body
// document.body.appendChild(createAddQuoteForm());

}
// JSON Export

// Function to export quotes to a JSON file
function exportQuotesToJson() {
  const jsonString = JSON.stringify(quotes, null, 2); // null, 2 for pretty formatting
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a); // Append to the DOM
  a.click();
  document.body.removeChild(a); // Remove from the DOM
  URL.revokeObjectURL(url); // Clean up the URL
}

// Add an export button (HTML example - add to your HTML file)
// <button onclick="exportQuotesToJson()">Export Quotes</button>


// JSON Import

// Function to import quotes from a JSON file
function importQuotesFromJson(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes = importedQuotes; // Replace existing quotes
          updateQuoteList();
          saveQuotesToLocalStorage();
          alert('Quotes imported successfully!');
        } else {
          alert('Invalid JSON format.  Must be an array of strings.');
        }
      } catch (error) {
        alert('Error parsing JSON file: ' + error);
      }
    };
    reader.readAsText(file);
  }
}

// Add a file input element (HTML example - add to your HTML file)
// <input type="file" id="importFile" accept=".json" onchange="importQuotesFromJson(event)">
function importQuotesFromJson(event) {
  // ...
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      console.log("Imported quotes:", importedQuotes); // Add this line for debugging
      if (Array.isArray(importedQuotes)) {
        quotes = importedQuotes; // Replace existing quotes
        updateQuoteList();
        saveQuotesToLocalStorage();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid JSON format.  Must be an array of strings.');
      }
    } catch (error) {
      console.error("JSON parsing error:", error);  // Log the error
      alert('Error parsing JSON file: ' + error);
    }
  };
  // ...
}
