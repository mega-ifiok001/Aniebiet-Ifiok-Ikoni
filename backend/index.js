require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./db")
const Contact = require("./models/Contact") // Make sure you have this model

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect DB
connectDB()

// Test route
app.get("/", (req, res) => {
  res.send("API running")
})

// ✅ Contact form route
app.post("/contact", async (req, res) => {
  const { Name, Company, email, Phone, Message } = req.body

  // Basic validation
  if (!Name || !email || !Phone || !Message) {
    return res.status(400).json({ message: "All required fields must be filled" })
  }

  try {
    // Save to MongoDB
    const newContact = await Contact.create({
      name: Name,
      company: Company || "",
      email,
      phone: Phone,
      message: Message
    })

    res.status(201).json({ message: "Message saved successfully", data: newContact })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to save message" })
  }
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
