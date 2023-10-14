const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')

// GET all transactions
router.get('/transactions', transactionController.getAllTransactions)

// GET one transactions
router.get('/transactions/:transaction_id', transactionController.getSingleTransaction)

// CREATE a new transaction
router.post('/transactions', transactionController.createTransaction)

// DELETE a transaction by transaction ID
router.put('/transactions/:transaction_id', transactionController.updateTransaction)

// DELETE a transaction by transaction ID
router.delete('/transactions/:transaction_id', transactionController.deleteTransaction)

// GET TOTAL DISCOUNTED AMOUNT by year
router.get('/get-transactions-amounts/:year', transactionController.getTransactionAMounts)

module.exports = router