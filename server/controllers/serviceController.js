const pool = new require('../config/db')

const getAllServices = async (req, res) => {
    try {
        const services = await pool.query('SELECT * FROM services ORDER BY service_id ASC')
        res.json(services.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createService = async (req, res) => {
    try {
        const { service_name, service_type, price, minutes, commission } = req.body
        
        const serviceCreated = await pool.query(
            'INSERT INTO services ( service_name, service_type, price, minutes, commission ) \
             VALUES($1, $2, $3, $4, $5) RETURNING *',
            [ service_name, service_type, price, minutes, commission ]
        )
        res.json(serviceCreated.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deleteService = async (req, res) => {
    try {
        const { service_id } = req.params
        await pool.query("DELETE FROM services WHERE service_id = $1", [service_id]);
        res.json(`Successfully Deleted Service ID: ${service_id}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllServices,
    createService,
    deleteService
}