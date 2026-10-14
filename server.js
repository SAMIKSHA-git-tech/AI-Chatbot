const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", function(req, res) {
    const userMessage = req.body.message;

    console.log("User:", userMessage);

    res.json({
        reply: "Hello! 👋 I received your message: " + userMessage
    });
});

app.listen(3000, function() {
    console.log("🚀 Server running on http://localhost:3000");
});