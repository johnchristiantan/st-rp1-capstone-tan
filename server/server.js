const express = require('express')
const cors = require('cors')

// database setup
const pool = require('./config/db')
const bodyParser = require('body-parser')

const loginRoutes = require('./routes/loginRoutes')
const userRoutes = require('./routes/userRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const branchRoutes = require('./routes/branchRoutes')
const discountRoutes = require('./routes/discountRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

const { authenticateToken } = require('./middleware/authMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api/v1', loginRoutes)
// Use user routes (with authentication middleware for protected routes)
// app.use('/api/v1', authenticateToken, userRoutes);

app.use('/api/v1', userRoutes);
app.use('/api/v1', serviceRoutes);
app.use('/api/v1', branchRoutes);
app.use('/api/v1', discountRoutes);
app.use('/api/v1', transactionRoutes);

const PORT = process.env.SERVERPORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})