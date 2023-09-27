const pool = new require('../config/db')

const getAllChartData = async (req, res) => {
    try {
        const chartsample = await pool.query(
            'SELECT * FROM chartsample ORDER BY id ASC'
        )
        res.json(chartsample.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllChartData,
}
