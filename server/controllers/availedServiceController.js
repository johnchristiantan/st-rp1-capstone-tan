const pool = new require('../config/db')

const getAllAvailedServices = async (req, res) => {
    try {
        const availed_services = await pool.query(
            'SELECT * FROM availed_services ORDER BY a_service_id ASC'
        )
        res.json(availed_services.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
