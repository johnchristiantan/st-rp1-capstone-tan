const pool = new require('../config/db')
const bcrypt = require('bcryptjs')
const { generateAccessToken } = require('../middleware/authMiddleware')

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users ORDER BY user_id ASC')
        res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createUser = async (req, res) => {
    try {
        const { user_name, password, first_name, last_name, user_type } = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const newUser = await pool.query(
            'INSERT INTO users (user_name, password, first_name, last_name, user_type) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [user_name, hashedPassword, first_name, last_name, user_type]
        )
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { user_name, password, first_name, last_name, user_type } = req.body

        // Hash the password if it's provided
        let hashedPassword = null
        if (password) {
            const salt = bcrypt.genSaltSync(10)
            hashedPassword = bcrypt.hashSync(password, salt)
        }

        const updateUser = await pool.query(
            "UPDATE users SET user_name = $1, password = $2, first_name = $3, last_name = $4, user_type = $5 WHERE user_id = $6 RETURNING *",
            [ user_name, hashedPassword, first_name, last_name, user_type, user_id ]
        )
        res.json(updateUser.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
        res.json(`Successfully Deleted User ID: ${user_id}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const loginUser = async (req, res) => {
    try {
        const {user_name, password} = req.body
        const userDetails = await pool.query("SELECT * FROM users WHERE user_name =$1", [user_name])
        if(userDetails.rowCount !== 0){
            await bcrypt.compare(
                password,
                userDetails.rows[0].password
            )
            const generatedToken = generateAccessToken({
                user_name: user_name
            })
            userDetails.rows[0].token = generatedToken
            res.json(userDetails.rows[0])
        } else {
            res.json(`User does not exist`)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
}