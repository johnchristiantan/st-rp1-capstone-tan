const express = require('express')
const router = express.Router()
const branchController = require('../controllers/branchController')

// GET all branches
router.get('/branches', branchController.getAllBranches)

// CREATE a new branch
router.post('/branches', branchController.createBranch)

// UPDATE a branch by branch Code
router.put('/branches/:branch_id', branchController.updateBranch)

// DELETE a branch by branch Code
router.delete('/branches/:branch_id', branchController.deleteBranch)

module.exports = router