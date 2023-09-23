const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')

// GET all transactions
router.get('/transactions', transactionController.getAllTransactions)

// CREATE a new transaction
router.post('/transactions', transactionController.createTransaction)

// DELETE a transaction by transaction ID
router.put('/transactions/:transaction_id', transactionController.updateTransaction)

// DELETE a transaction by transaction ID
router.delete('/transactions/:transaction_id', transactionController.deleteTransaction)

module.exports = router