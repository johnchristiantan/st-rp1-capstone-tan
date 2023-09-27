const express = require('express')
const router = express.Router()
const chartDataController = require('../controllers/chartDataController')

// GET all
router.get('/chartsample', chartDataController.getAllChartData)

module.exports = router
