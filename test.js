// Existing references to the DOM elements
const messagesDiv = document.getElementById('messages');
const commandInput = document.getElementById('commandInput');
const suggestionsDiv = document.getElementById('suggestions');
const qrFormDiv = document.getElementById('qrFormDiv');
const qrForm = document.getElementById('qrForm');
const sendButton = document.getElementById('sendButton');

// Commands and functions
const commands = {
    '/ping': 'Pong! Latency: 50ms',
    '/dice': 'Rolled: ⚁',
    '/flip': 'Flipped: Heads',
    '/fortune': 'Finding your fortune...',
    '/tarot': 'Drawing a tarot card...',
    '/qr': 'Generating QR Code...',
    '/help': 'Shows a detailed list of available commands and how to use them',  // Updated help command
    '/goback': 'Going back to the previous page...'  // New Go Back Command
};

const commandList = Object.keys(commands);

// Function to create messages
function createMessage(content, isBot = true) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(isBot ? 'bot-msg' : 'user-msg');
    msgDiv.innerText = content;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Simulate a bot reply after a user message (not a command)
    if (!isBot) {
        sendRandomEmojiReply();  // Send only one emoji
    }
}

// Function to show suggestions
function showSuggestions() {
    const inputValue = commandInput.value.trim();
    suggestionsDiv.innerHTML = '';

    if (inputValue.startsWith('/')) {
        const filteredCommands = commandList.filter(command => command.toLowerCase().startsWith(inputValue.toLowerCase()));

        filteredCommands.forEach(command => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.innerText = command;
            suggestionItem.onclick = () => executeCommand(command);
            suggestionsDiv.appendChild(suggestionItem);
        });
    }
}

// Function to execute commands
function executeCommand(command = commandInput.value.trim()) {
    if (!command) return;

    createMessage(command, false);

    // Check if the command starts with '/'
    if (command.startsWith('/')) {
        switch (command) {
            case '/fortune':
                simulateFortune();
                break;
            case '/tarot':
                simulateTarot();
                break;
            case '/qr':
                displayQrForm();
                break;
            case '/flip':
                flipCoin();
                break;
            case '/dice':
                rollDice();
                break;
            case '/help':
                displayHelp();  // Updated help command
                break;
            case '/ping':
                createMessage('Pong! Latency: 50ms', true);
                break;
            case '/goback':
                goBack();  // Handle Go Back command
                break;
            default:
                createMessage('Unknown command, try again!', true);
        }
    } else {
        createMessage(storedMessage, true);  // Send stored message for non-command messages
    }

    commandInput.value = '';
    suggestionsDiv.innerHTML = '';  // Clear suggestions
}

// Function to send random emoji reply after a user message
function sendRandomEmojiReply() {
    const emojiList = ["🤔", "😕", "🙄", "🤨", "🤷", "😊", "👍", "👎", "👌", "👏", "🙏", "🤝"];
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    storedMessage = randomEmoji;
}

// Function to display the updated help message
function displayHelp() {
    const helpMessage = `
    Help: Available Commands
    • /help     Shows this message with a list of available commands
    • /ping     Checks bot's responsiveness (e.g. "Pong! Latency: 50ms")
    • /dice     Rolls a dice and shows a random result (e.g. ⚀)
    • /flip     Flips a coin and shows the result (e.g. Heads or Tails)
    • /fortune  Get a random fortune with humorous or witty messages
    • /tarot    Draw a tarot card and display its meaning with an emoji
    • /qr       Generates a QR Code from a link or text (with optional support for a logo)
    • /goback   Goes back to the previous page (./index.html)
    `;
    
    createMessage(helpMessage, true);
}

// Function to roll a dice
async function rollDice() {
    const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    createMessage('Rolling the dice...', true);

    await new Promise(resolve => setTimeout(resolve, 3000));

    const result = dice[Math.floor(Math.random() * dice.length)];
    createMessage(`Rolled dice: ${result}`, true);
}

// Function to flip a coin
async function flipCoin() {
    const coin = ['Heads', 'Tails'];
    createMessage('Flipping the coin...', true);

    await new Promise(resolve => setTimeout(resolve, 3000));

    const result = coin[Math.floor(Math.random() * coin.length)];
    createMessage(`Flipped to ${result}`, true);
}

// Function to simulate fortune
async function simulateFortune() {
    const fortunes = [
        "What is the meaning of your life? Your life is very mean.",
        "Error:404, Fortune not found.",
        "Eat until the age your all teeth falls.",
        "I see money in your future, it is not yours though.",
        "We don't know the future, but you just got a free cookie.",
        "Oops.... You don't have a future.",
        "In future you will become a vegetarian.",
        "Error:143, No boyfriend/girlfriend found during your life.",
        "Don't go out, road is full of gutters.",
        "To truly find yourself you should play hide and seek alone.",
        "Better you go and sleep, you are useless.",
        "Someone had googled you recently, but haven't found!",
        "You will be hungry again in an hour.",
        "Ouch!! your future is complicated and it burns.",
        "Please create your own future.",
        "Beware you are getting aged!!!",
        "In your beginning you will find your end.",
        "Look at the time you have a bad time.",
        "Lol!!! It's better I don't tell you.",
        "Love awaits you at the nearest pet shop!",
        "You will receive a call... at some point in your life. You might get an email too.",
        "Winter is coming, don't tell anyone.",
        "Yes!! the universe agrees you should eat more ice creams.",
        "People will forever ask you ridiculous questions."
    ];

    createMessage('Finding your fortune...', true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    createMessage(fortune, true);
}

// Function to simulate tarot card draw
async function simulateTarot() {
    const tarotCards = [
        {"name": "The Fool", "emoji": "🤹"},
        {"name": "The Magician", "emoji": "🧙"},
        {"name": "The High Priestess", "emoji": "👸"},
        {"name": "The Empress", "emoji": "👑"},
        {"name": "The Emperor", "emoji": "🤴"},
        {"name": "The Hierophant", "emoji": "🧙‍♀️"},
        {"name": "The Lovers", "emoji": "👩‍❤️‍👩"},
        {"name": "The Chariot", "emoji": "🚀"},
        {"name": "Strength", "emoji": "💪"},
        {"name": "The Hermit", "emoji": "🧝"},
        {"name": "Wheel of Fortune", "emoji": " 🎲"},
        {"name": "Justice", "emoji": "⚔️"},
        {"name": "The Hanged Man", "emoji": "🏳️"},
        {"name": "Death", "emoji": "☠️"},
        {"name": "Temperance", "emoji": "🧙‍♂️"},
        {"name": "The Devil", "emoji": "👹"},
        {"name": "The Tower", "emoji": "🏰"},
        {"name": "The Star", "emoji": "⭐"},
        {"name": "The Moon", "emoji": "🌙"},
        {"name": "The Sun", "emoji": "☀️"},
        {"name": "Judgement", "emoji": "⚖️"},
        {"name": "The World", "emoji": "🌎"},
        {"name": "Error 404: Card Not Found", "emoji": "❓"}
    ];

    createMessage('Drawing a tarot card...', true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const tarotCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    createMessage(`${tarotCard.name} ${tarotCard.emoji}`, true);
}

// Function to go back to the previous page
function goBack() {
    window.location.href = './index.html';
}

// Function to display QR form
function displayQrForm() {
    qrFormDiv.style.display = 'block';
    qrForm.focus();
}

// Adding event listener for command input
commandInput.addEventListener('input', showSuggestions);

// Initial Message
createMessage('Welcome! Type a command like "/help" for options.', true);

// send message on pressing send button(function)
sendButton.addEventListener('click', () => {
    executeCommand();
});