const pool = new require('../config/db')

const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await pool.query(
            'SELECT * FROM discounts ORDER BY discount_id ASC'
        )
        res.json(discounts.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createDiscount = async (req, res) => {
    try {
        const { discount_code, discount_description, percentage } = req.body

        const newDiscount = await pool.query(
            'INSERT INTO discounts (discount_code, discount_description, percentage) VALUES($1, $2, $3) RETURNING *',
            [discount_code, discount_description, percentage]
        )
        res.json(newDiscount.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateDiscount = async (req, res) => {
    try {
        const { discount_id } = req.params
        const { discount_code, discount_description, percentage } = req.body

        const updateDiscount = await pool.query(
            'UPDATE discounts SET discount_code = $1, discount_description = $2, percentage = $3 WHERE discount_id = $4 RETURNING *',
            [discount_code, discount_description, percentage, discount_id]
        )
        res.json(updateDiscount.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deleteDiscount = async (req, res) => {
    try {
        const { discount_id } = req.params
        await pool.query('DELETE FROM discounts WHERE discount_id = $1', [
            discount_id,
        ])
        res.json(`Successfully Deleted Discount: ${discount_id}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllDiscounts,
    createDiscount,
    updateDiscount,
    deleteDiscount,
}
