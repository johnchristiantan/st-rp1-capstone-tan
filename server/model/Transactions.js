const pool = new require('../config/db')

const createCustomer = async ( user_type, first_name, last_name ) => {
    try {
        // Create a new customer record
        await pool.query('BEGIN')
        const customerCreated = await pool.query(
            'INSERT INTO users(user_type, first_name, last_name) values ($1, $2, $3) RETURNING *',
            [ user_type, first_name, last_name ]
        )
        !customerCreated.rows[0].user_id ? await pool.query('ROLLBACK') : await pool.query('COMMIT')
        console.log('User created: ', customerCreated.rows[0])
        return customerCreated.rows[0].user_id
    } catch (err) {
        await pool.query('ROLLBACK')
        console.error(err.message)
        return null
    }
}

const createCustomerTransaction = async ( transaction_date, voucher_number, branch_id, status, tip, customer_id ) => {
    try {
        // Create a new customer transaction record
        await pool.query('BEGIN')
        const cusTranCreated = await pool.query(
            'INSERT INTO transactions(transaction_date, voucher_number, branch_id, status, tip, customer_id) \
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [ transaction_date, voucher_number, branch_id, status, tip, customer_id ]
        )
        !cusTranCreated.rows[0].transaction_id ? await pool.query('ROLLBACK') : await pool.query('COMMIT')
        console.log('Customer transaction created: ', cusTranCreated.rows[0])
        return cusTranCreated.rows[0].transaction_id
    } catch (err) {
        await pool.query('ROLLBACK')
        console.error(err.message)
        return null
    }
}

const createAvailedServices = async ( availed_services, transaction_id ) => {
    try {
        for (let i = 0; i < availed_services.length ; i++) {
            // Create a new availed service record
            await pool.query('BEGIN')
            const availedServiceCreated = await pool.query(
                'INSERT INTO availed_services(transaction_id, service_id, discount_id) \
                VALUES ($1, $2, $3) RETURNING *',
                [ transaction_id, availed_services[i].service_id, availed_services[i].discount_id ]
            )
        }
        await pool.query('COMMIT')
        console.log('Availed Services Created')
        return true
    } catch (err) {
        await pool.query('ROLLBACK')
        console.error(err.message)
        return null
    }
}

const getTotalDiscountedAmount = async ( transaction_id ) => {
    try {
        // Get the total discounted amount
        const totalDiscountedAmount = await pool.query(
            'SELECT SUM(S.price - (S.price * D.percentage)) AS total_discounted_price \
            FROM availed_services AS ASV INNER JOIN services AS S ON ASV.service_id = S.service_id \
            INNER JOIN discounts AS D ON ASV.discount_id = D.discount_id WHERE ASV.transaction_id IS NOT NULL \
            AND transaction_id = $1',
            [ transaction_id ]
        )
        return totalDiscountedAmount.rows[0].total_discounted_price
    } catch (err) {
        console.error(err.message)
        return null
    }
}

const getTotalCommission = async ( transaction_id ) => {
    try {
        // Get the total discounted amount
        const totalCommission = await pool.query(
            'SELECT SUM(S.commission) AS total_commission \
            FROM availed_services AS ASV INNER JOIN services AS S ON ASV.service_id = S.service_id \
            INNER JOIN discounts AS D ON ASV.discount_id = D.discount_id WHERE ASV.transaction_id IS NOT NULL \
            AND ASV.transaction_id = $1',
            [ transaction_id ]
        )
        return totalCommission.rows[0].total_commission
    } catch (err) {
        console.error(err.message)
        return null
    }
}

const getSingleTransaction = async ( transaction_id ) => {
    try {
        // Get single transaction
        const transaction = await pool.query(
            'SELECT * FROM transactions WHERE transaction_id = $1',
            [ transaction_id ]
        )
        return transaction.rows[0]
    } catch (err) {
        console.error(err.message)
        return null
    }
}

const getAllTransactions = async () => {
    try {
        // Get all transaction
        const transaction = await pool.query('SELECT * FROM transactions ORDER BY transaction_id ASC')
        return transaction.rows
    } catch (err) {
        console.error(err.message)
        return null
    }
}

const updateTotalDiscountedAmount = async ( total_discounted_amount, transaction_id ) => {
    try {
        // Create a new availed service record
        await pool.query('BEGIN')
        const updatedTotalDiscountedAmount = await pool.query(
            'UPDATE transactions SET total_discounted_amount = $1 WHERE transaction_id = $2 RETURNING *',
            [total_discounted_amount, transaction_id]
        )
        await pool.query('COMMIT')
        console.log('Total Discounted Amount: ', updatedTotalDiscountedAmount.rows[0])
        return updatedTotalDiscountedAmount.rows[0]
    } catch (err) {
        await pool.query('ROLLBACK')
        console.error(err.message)
        return null
    }
}

const updateCommission = async ( total_commission, transaction_id ) => {
    try {
        // Create a new availed service record
        await pool.query('BEGIN')
        const updatedTotalCommission = await pool.query(
            'UPDATE transactions SET total_commission = $1 WHERE transaction_id = $2 RETURNING *',
            [total_commission, transaction_id]
        )
        await pool.query('COMMIT')
        console.log('Total Commission: ', updatedTotalCommission.rows[0])
        return updatedTotalCommission.rows[0]
    } catch (err) {
        await pool.query('ROLLBACK')
        console.error(err.message)
        return null
    }
}

const updateTransaction = async ( transaction_data, transaction_id ) => {
    console.log("Here", transaction_id)
    console.log("Here", transaction_data)
    try {
        const { 
                transaction_date, total_discounted_amount,
                status, branch_id, customer_id,
                tip, total_commission, voucher_number
        } = transaction_data
        // Create a new availed service record
        await pool.query('BEGIN')
        const transactionUpdated = await pool.query(
            'UPDATE transactions SET  transaction_date = $1, total_discounted_amount = $2, \
            status = $3, branch_id = $4, customer_id = $5, tip = $6, total_commission = $7, voucher_number = $8 \
            WHERE transaction_id = $9 RETURNING *',
            [ transaction_date, total_discounted_amount, status, branch_id, customer_id,
              tip, total_commission, voucher_number, transaction_id ]
        )
        await pool.query('COMMIT')
        console.log('Updated Transaction: ', transactionUpdated.rows[0])
        return transactionUpdated.rows[0]
    } catch (err) {
        await pool.query('ROLLBACK')
        console.error(err.message)
        return null
    }
}

const deleteTransaction = async ( transaction_id ) => {
    try {
        // Get delete single transaction
        await pool.query("DELETE FROM transactions WHERE transaction_id = $1", [transaction_id])
        return true
    } catch (err) {
        console.error(err.message)
        return false
    }
}

module.exports = {
    createCustomer,
    createCustomerTransaction,
    createAvailedServices,
    getTotalDiscountedAmount,
    getTotalCommission,
    getAllTransactions,
    getSingleTransaction,
    updateTotalDiscountedAmount,
    updateCommission,
    updateTransaction,
    deleteTransaction
}