require('dotenv').config()
const bcrypt = require('bcryptjs') //encrypt | npm install bcryptjs

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())

const port = process.env.SERVERPORT || 3000

const pool = require('./config/db')

// USERS----------------------------------------------------------------
app.get('/users', async (req, res) => {
    try {
        const users = await pool.query(
            'SELECT * FROM users ORDER BY user_id ASC'
        )
        res.json(users.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.put('/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params

        const { user_name, password, user_type } = req.body
        const updateUser = await pool.query(
            'UPDATE users SET user_name = $1, password = $2, user_type = $3 WHERE user_id = $4 RETURNING *',
            [user_name, password, user_type, user_id]
        )

        res.json(updateUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post('/user', async (req, res) => {
    try {
        const { user_name, password, user_type } = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const newUser = await pool.query(
            'INSERT INTO users (user_name, password, user_type) VALUES($1, $2, $3) RETURNING *',
            [user_name, hashedPassword, user_type]
        )
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await pool.query(
            'DELETE FROM users WHERE user_id = $1',
            [id]
        )
        res.json('User was deleted!')
    } catch (err) {
        console.error(err.message)
    }
})

// SERVICES----------------------------------------------------------------
app.get('/services', async (req, res) => {
    try {
        const services = await pool.query(
            'SELECT * FROM services ORDER BY service_id ASC'
        )
        res.json(services.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.post('/services', async (req, res) => {
    console.log(req.body)
    try {
        const {
            service_id,
            service_name,
            service_type,
            price,
            minutes,
            commission,
        } = req.body

        const newBranch = await pool.query(
            'INSERT INTO services (service_id, service_name, service_type, price, minutes, commission ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [service_id, service_name, service_type, price, minutes, commission]
        )
        res.json(newService.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// app.delete('/services/:service_id', async (req, res) => {
//     try {
//         const { service_id } = req.params
//         const deleteService = await pool.query(
//             'DELETE FROM services WHERE service_id = $1',
//             [service_id]
//         )
//         res.json('Service has been deleted!')
//     } catch (err) {
//         console.error(err.message)
//     }
// })

app.delete('/services/:service_id', async (req, res) => {
    try {
        const { service_id } = req.params

        // Perform the delete operation using service_id as a string
        const deleteService = await pool.query(
            'DELETE FROM services WHERE service_id = $1',
            [service_id]
        )
        res.json('Service has been deleted!')
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// BRANCHES----------------------------------------------------------------
app.get('/branches', async (req, res) => {
    try {
        const branches = await pool.query(
            'SELECT * FROM branches ORDER BY created_at ASC'
        )
        res.json(branches.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.post('/branches', async (req, res) => {
    console.log(req.body)
    try {
        const { branch_code, branch_name, percent_share } = req.body

        const newBranch = await pool.query(
            'INSERT INTO branches (branch_code, branch_name, percent_share) VALUES($1, $2, $3) RETURNING *',
            [branch_code, branch_name, percent_share]
        )
        res.json(newBranch.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.delete('/branches/:branch_code', async (req, res) => {
    try {
        const { branch_code } = req.params
        const deleteUser = await pool.query(
            'DELETE FROM branches WHERE branch_code = $1',
            [branch_code]
        )
        res.json('Branch was deleted!')
    } catch (err) {
        console.error(err.message)
    }
})
// update branch
app.put('/branches/:b_code', async (req, res) => {
    try {
        const { b_code } = req.params

        const { branch_name, percent_share } = req.body
        const updateBranch = await pool.query(
            'UPDATE branches SET  branch_name = $1, percent_share = $2 WHERE branch_code = $3 RETURNING *',
            [branch_name, percent_share, b_code]
        )

        res.json(updateBranch.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// DISCOUNTS ----------------------------------------------------------------
app.get('/discounts', async (req, res) => {
    try {
        const discounts = await pool.query(
            'SELECT * FROM discounts ORDER BY discount_code ASC'
        )
        res.json(discounts.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.post('/discounts', async (req, res) => {
    console.log(req.body)
    try {
        const { discount_code, discount_description, percentage } = req.body

        const newDiscount = await pool.query(
            'INSERT INTO discounts (discount_code, discount_description, percentage) VALUES($1, $2, $3) RETURNING *',
            [discount_code, discount_description, percentage]
        )
        res.json(newDiscount.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.delete('/discounts/:discount_code', async (req, res) => {
    try {
        const { discount_code } = req.params
        const deleteDiscount = await pool.query(
            'DELETE FROM discounts WHERE discount_code = $1',
            [discount_code]
        )
        res.json('Discount has been deleted!')
    } catch (err) {
        console.error(err.message)
    }
})

// update discounts
app.put('/discounts/:discount_code', async (req, res) => {
    try {
        const { discount_code } = req.params

        const { discount_description, percentage } = req.body
        const updateDiscount = await pool.query(
            'UPDATE discounts SET  discount_description = $1, percentage = $2 WHERE discount_code = $3 RETURNING *',
            [discount_description, percentage, discount_code]
        )

        res.json(updateDiscount.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// LOGIN
app.post('/login', async (req, res) => {
    const { user_name, password } = req.body
    const user = await pool.query('SELECT * FROM users where user_name =$1', [
        user_name,
    ])
    console.log(user.rows.password)
    if (user.rows.password) {
        const isMatch = await bcrypt.compare(password, user.rows.password)
        res.json(user.rows)
    }
    res.json(user.rows)
})

// ALWAYS AT THE END OF THIS
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
