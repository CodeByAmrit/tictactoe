require('dotenv').config()
const mongoose = require('mongoose')

// Replace <password> with your actual MongoDB password
const url = process.env.MongodbURL

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err)
  })

// Define the schema - USERS
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)
// Define the schema - game Score table
const scoreSchema = new mongoose.Schema(
  {
    playerId: { type: String, required: true },
    name: { type: String, required: true },
    dateTime: { type: String, required: true },
    result: { type: String, required: true }
  },
  { timestamps: true }
)

// Create models based on the schemas
const User = mongoose.model('User', userSchema)
const Score = mongoose.model('Score', scoreSchema)

// Export the models
module.exports = { User, Score }
