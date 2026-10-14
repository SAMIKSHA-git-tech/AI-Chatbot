const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

function addMessage(text, sender) {
    const message = document.createElement("p");
    message.textContent = text;

    if (sender === "user") {
        message.style.textAlign = "right";
    } else {
        message.style.textAlign = "left";
    }

    chatBox.appendChild(message);
}

async function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    addMessage("You: " + message, "user");
    userInput.value = "";

    addMessage("🤖 AI: Thinking... ✨", "ai");

    try {
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        chatBox.lastChild.remove();

        addMessage("🤖 AI: " + data.reply, "ai");

    } catch (error) {
        chatBox.lastChild.remove();

        addMessage("🤖 AI: Server se connection nahi ho raha 😕", "ai");

        console.log(error);
    }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function getReply(message) {
    const text = message.toLowerCase().trim();

    if (["hi", "hello", "hey"].includes(text)) {
        return "Hey! 👋 Welcome! What's your name?";
    }

    if (text.startsWith("my name is ")) {
        const name = message.slice(11).trim();
        return `Nice to meet you, ${name}! 😊`;
    }

    if (text.includes("your name")) {
        return "I'm your friendly chatbot! 🤖";
    }

    if (text.includes("how are you")) {
        return "I'm doing great! Thanks for asking. 💚";
    }

    if (text.includes("thank")) {
        return "You're welcome! ✨";
    }

    if (text.includes("help")) {
        return "Of course! Tell me what you need help with. 💭";
    }

    if (text.includes("bye")) {
        return "Goodbye! Take care! 👋";
    }

    return "I don't know that yet! 🤔 Try saying Hi, asking my name, or asking how I am.";
}

function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") return;

    addMessage("You: " + message, "user");
    userInput.value = "";

    const reply = getReply(message);
    addMessage("🤖 Bot: " + reply, "ai");
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
