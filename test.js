// DOM References
const messagesDiv = document.getElementById('messages');
const commandInput = document.getElementById('commandInput');
const suggestionsDiv = document.getElementById('suggestions');
const qrFormDiv = document.getElementById('qrFormDiv');
const qrForm = document.getElementById('qrForm');
const qrLink = document.getElementById('qrLink');
const qrLogo = document.getElementById('qrLogo');
const sendButton = document.getElementById('sendButton');

// Commands and Descriptions
const commands = {
    '/ping': 'Pong! Latency: 50ms',
    '/dice': 'Rolls a dice and shows a random result',
    '/flip': 'Flips a coin and shows the result',
    '/fortune': 'Finds your fortune with humorous messages',
    '/tarot': 'Draws a tarot card and displays its meaning',
    '/qr': 'Generates a QR Code with optional logo support',
    '/help': 'Shows a detailed list of available commands',
    '/goback': 'Goes back to the previous page'
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

    if (!isBot) sendRandomEmojiReply(); // Simulate a bot reply for non-commands
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

    if (command.startsWith('/')) {
        switch (command.split(' ')[0]) {
            case '/fortune':
                simulateFortune();
                break;
            case '/tarot':
                simulateTarot();
                break;
            case '/qr':
                handleQrCommand(command);
                break;
            case '/flip':
                flipCoin();
                break;
            case '/dice':
                rollDice();
                break;
            case '/help':
                displayHelp();
                break;
            case '/ping':
                createMessage('Pong! Latency: 50ms', true);
                break;
            case '/goback':
                goBack();
                break;
            default:
                createMessage('Unknown command, try again!', true);
        }
    } else {
        createMessage(storedMessage, true); // Send stored message for non-command input
    }

    commandInput.value = '';
    suggestionsDiv.innerHTML = '';
}

// Handle `/qr` Command
function handleQrCommand(command) {
    const qrArgs = command.split(' ').slice(1).join(' ');
    if (qrArgs) {
        qrLink.value = qrArgs; // Set input field value to the argument
        generateQrCode();
    } else {
        displayQrForm();
    }
}

// Random emoji reply after user input
let storedMessage = '';
function sendRandomEmojiReply() {
    const emojiList = ["🤔", "😕", "🙄", "🤨", "🤷", "😊", "👍", "👎", "👌", "👏", "🙏", "🤝"];
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    storedMessage = randomEmoji;
}

// Display the help message
function displayHelp() {
    const helpMessage = `
Help: Available Commands
• /help     Shows this message
• /ping     Checks bot's responsiveness
• /dice     Rolls a dice (e.g., ⚀ to ⚅)
• /flip     Flips a coin (e.g., Heads or Tails)
• /fortune  Shows a humorous fortune
• /tarot    Draws a tarot card
• /qr       Generates a QR Code
• /goback   Goes back to the previous page
    `;
    createMessage(helpMessage, true);
}

// Roll a dice
async function rollDice() {
    const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    createMessage('Rolling the dice...', true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    createMessage(`Rolled: ${dice[Math.floor(Math.random() * dice.length)]}`, true);
}

// Flip a coin
async function flipCoin() {
    const coin = ['Heads', 'Tails'];
    createMessage('Flipping the coin...', true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    createMessage(`Result: ${coin[Math.floor(Math.random() * coin.length)]}`, true);
}

// Simulate a fortune
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    createMessage(fortunes[Math.floor(Math.random() * fortunes.length)], true);
}

// Simulate a tarot card draw
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    createMessage(`${card.name} ${card.emoji}`, true);
}

// Display the QR form
function displayQrForm() {
    qrFormDiv.style.display = 'block';
    qrForm.focus();
}

// Generate a QR code
// Generate a QR code
function generateQrCode() {
    const qrCanvas = document.createElement('canvas');
    const qrValue = qrLink.value.trim();
    const logoUrl = qrLogo.value.trim();

    if (!qrValue) {
        createMessage('Please provide valid text or a link.', true);
        return;
    }

    // Clear previous QR code and logo
    qrFormDiv.innerHTML = '';
    qrFormDiv.appendChild(qrCanvas);

    // Generate QR Code using a QR code library (like QRCode.js)
    new QRCode(qrCanvas, {
        text: qrValue,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // If logo URL is provided, add it to the center of the QR code
    if (logoUrl) {
        const logoImg = new Image();
        logoImg.onload = function () {
            const ctx = qrCanvas.getContext('2d');
            const logoSize = 50;
            const x = (qrCanvas.width - logoSize) / 2;
            const y = (qrCanvas.height - logoSize) / 2;

            // Draw the logo on the canvas
            ctx.drawImage(logoImg, x, y, logoSize, logoSize);
        };
        logoImg.src = logoUrl;
    }

    // Show the generated QR code
    qrFormDiv.style.display = 'block';

    // Reset the form after QR code generation
    qrForm.reset();
}

// Display QR code
function displayQrCanvas(canvas) {
    qrFormDiv.style.display = 'none';
    const qrOutput = document.createElement('div');
    qrOutput.classList.add('qr-output');
    qrOutput.appendChild(canvas);
    messagesDiv.appendChild(qrOutput);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Go back to the previous page
function goBack() {
    window.location.href = './index.html';
}

// Event Listeners
qrForm.addEventListener('submit', (event) => {
    event.preventDefault();
    generateQrCode();
});
commandInput.addEventListener('input', showSuggestions);
sendButton.addEventListener('click', () => executeCommand());
commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') executeCommand();
});

// Initial message
createMessage('Welcome! Type "/help" for commands.', true);