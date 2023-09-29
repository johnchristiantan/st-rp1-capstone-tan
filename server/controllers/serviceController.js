const pool = new require('../config/db')

const getAllServices = async (req, res) => {
    try {
        const services = await pool.query(
            'SELECT * FROM services ORDER BY service_id ASC'
        )
        res.json(services.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createService = async (req, res) => {
    try {
        const { service_name, service_type, price, minutes, commission } =
            req.body

        const newService = await pool.query(
            'INSERT INTO services (service_name, service_type, price, minutes, commission) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [service_name, service_type, price, minutes, commission]
        )
        res.json(newService.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateService = async (req, res) => {
    try {
        const { service_id } = req.params
        const { service_name, service_type, price, minutes, commission } =
            req.body

        const updateDiscount = await pool.query(
            'UPDATE services SET service_name = $1, service_type = $2, price = $3, minutes = $4, commission = $5  WHERE service_id = $6 RETURNING *',
            [service_name, service_type, price, minutes, commission, service_id]
        )
        res.json(updateService.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deleteService = async (req, res) => {
    try {
        const { service_id } = req.params
        await pool.query('DELETE FROM services WHERE service_id = $1', [
            service_id,
        ])
        res.json(`Successfully Deleted Service: ${service_id}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllServices,
    createService,
    updateService,
    deleteService,
}
