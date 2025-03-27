const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ Import CORS
require("dotenv").config();
const app = express();
app.use(cors({
    origin: "*", // Allow all origins — for development only
    methods: ["GET", "POST"],
    credentials: true
}));  // <-- ADD THIS LINE
// 📌 MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("✅ MongoDB connected!"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// 📌 User Schema & Model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model("User", userSchema); 

// 📌 Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 📌 Route: Home
app.get("/", (req, res) => {
    res.send("Server is working! Welcome to the homepage.");
});

// 📌 Route: Signup (Save user data in MongoDB)
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    console.log("📩 Received signup request:", req.body);

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("⚠️ User already exists:", username);
            return res.json({ status: "error", error: "User already exists!" });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        console.log("✅ User saved:", newUser);

        res.json({ status: "ok" });
    } catch (err) {
        console.error("❌ Error saving user:", err);
        res.json({ status: "error", error: "❌ Error saving user." });
    }
});



// 📌 Route: Login (Verify user from MongoDB)
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: "❌ Invalid username or password!" });

        // Check password (if stored as plain text, but you should use bcrypt)
        if (user.password !== password) {
            return res.status(400).json({ error: "❌ Invalid username or password!" });
        }

        res.json({ status: "ok", message: "✅ Login successful!" });
    } catch (err) {
        res.status(500).json({ error: "❌ Error logging in." });
    }
});


// 📌 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

