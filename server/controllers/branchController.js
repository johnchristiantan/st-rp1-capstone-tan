const pool = new require('../config/db')

const getAllBranches = async (req, res) => {
    try {
        const branches = await pool.query(
            'SELECT * FROM branches ORDER BY branch_id ASC'
        )
        res.json(branches.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createBranch = async (req, res) => {
    try {
        const { branch_code, branch_name, percent_share } = req.body

        const newBranch = await pool.query(
            'INSERT INTO branches (branch_code, branch_name, percent_share) VALUES($1, $2, $3) RETURNING *',
            [branch_code, branch_name, percent_share]
        )
        res.json(newBranch.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateBranch = async (req, res) => {
    try {
        const { branch_id } = req.params
        const { branch_code, branch_name, percent_share } = req.body

        const updateBranch = await pool.query(
            'UPDATE branches SET  branch_code = $1, branch_name = $2, percent_share = $3 WHERE branch_id = $4 RETURNING *',
            [branch_code, branch_name, percent_share, branch_id]
        )
        res.json(updateBranch.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deleteBranch = async (req, res) => {
    try {
        const { branch_id } = req.params
        await pool.query('DELETE FROM branches WHERE branch_id = $1', [
            branch_id,
        ])
        res.json(`Successfully Deleted Branch Code: ${branch_id}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllBranches,
    createBranch,
    updateBranch,
    deleteBranch,
}
