const express = require('express')
const router = express.Router()
const serviceController = require('../controllers/serviceController')

// GET all services
router.get('/services', serviceController.getAllServices)

// CREATE a new service
router.post('/services', serviceController.createService)

// DELETE a service by service ID
router.delete('/services/:service_id', serviceController.deleteService)

module.exports = router