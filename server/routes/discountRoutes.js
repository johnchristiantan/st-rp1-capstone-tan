const express = require('express')
const router = express.Router()
const discountController = require('../controllers/discountController')

// GET all discounts
router.get('/discounts', discountController.getAllDiscounts)

// CREATE a new discount
router.post('/discounts', discountController.createDiscount)

// UPDATE a discount by discount Code
router.put('/discounts/:discount_id', discountController.updateDiscount)

// DELETE a discount by discount Code
router.delete('/discounts/:discount_id', discountController.deleteDiscount)

module.exports = router