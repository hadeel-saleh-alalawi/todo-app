const quotes = [
    "Believe in yourself and all that you are.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Every day is a new beginning.",
    "You are capable of amazing things.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Dream big and dare to fail.",
    "Act as if what you do makes a difference. It does.",
    "With the new day comes new strength and new thoughts.",
    "Don’t wait. The time will never be just right.",
    "Positive anything is better than negative nothing.",
    "Limit your 'always' and your 'nevers.'",
    "Start each day with a positive thought and a grateful heart.",
    "Work hard in silence, let your success be your noise.",
    "Be yourself; everyone else is already taken.",
    "Small steps in the right direction can turn out to be the biggest step of your life."
];

// Display a random quote
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('quote').textContent = randomQuote;
