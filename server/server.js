require('dotenv').config() //npm install dotenv

const express = require('express') //npm install express || to be able to use CRUD
const app = express()

// SECURITY---------------------npm install cors
const cors = require('cors')
app.use(cors()) // middleware || Cross Origin Resource Sharing (CORS)
app.use(express.json())
// ----------------------------

const port = process.env.SERVERPORT || 3000

const pool = require('./config/db')

app.get('/users', async (req, res) => {
    // res.send('Hello JC')
    try {
        const users = await pool.query('SELECT * FROM users')
        res.json(users.rows)
    } catch (err) {
        console.error(err.message)
    }
})
// const users = [
//     {
//         name: 'JC',
//         passw: '1234',
//         level: 'Admin',
//     },
//     {
//         name: 'Wayne',
//         passw: '1234',
//         level: 'Admin',
//     },
//     {
//         name: 'Johnroy',
//         passw: '1234',
//         level: 'Admin',
//     },
// ]

app.get('/', (req, res) => {
    res.send('Its working!')
})

// Update
app.put('/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params
        console.log(req.body)
        const { user_name, password, user_type } = req.body
        const updateUser = await pool.query(
            'UPDATE users SET user_name = $1, password = $2, user_type = $3 WHERE user_id = $4 RETURNING *',
            [user_name, password, user_type, user_id]
            // `UPDATE users SET user_name = ${user_name}, password = ${password}, user_type = ${user_type} WHERE user_id = ${user_id};`
        )
        // const res = await client.query(updateUser)
        res.json(updateUser.rows[0])
        // res.json('User was updated')
    } catch (err) {
        console.error(err.message)
    }
})

// Create a user
// CRUD

app.post('/user', async (req, res) => {
    // C-Create
    try {
        console.log(`This is body `, req.body)
        const { user_name, password, user_type } = req.body
        const newUser = await pool.query(
            'INSERT INTO users (user_name, password, user_type) VALUES($1, $2, $3) RETURNING *',
            [user_name, password, user_type]
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
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
