const Transactions = require('../model/Transactions')

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.getAllTransactions()
        res.json(transactions)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createTransaction = async (req, res) => {
    try {
        const {
            // user_type,
            // first_name,
            // last_name,
            transaction_date,
            voucher_number,
            branch_id,
            status,
            tip,
            customer_id,
            availed_services,
        } = req.body

        // Receive the customer_id from the request
        // const customer_id = req.body.customer_id
        // const customer_id = 111

        // Create a new customer
        // const customer_id = await Transactions.createCustomer(
        //     user_type,
        //     first_name,
        //     last_name
        // )

        // if (!customer_id) {
        //     res.status(500).json({ error: 'No customer id was created' })
        // }

        // Create a new transaction
        const transaction_id = await Transactions.createCustomerTransaction(
            transaction_date,
            voucher_number,
            branch_id,
            status,
            tip,
            customer_id
        )
        if (!transaction_id) {
            res.status(500).json({
                error: 'No customer transaction id was created',
            })
        }
        // Populate every availed service of one transaction database
        const availedServices = await Transactions.createAvailedServices(
            availed_services,
            transaction_id
        )
        if (!availedServices) {
            res.status(500).json({
                error: 'Availed services Populate Unsuccessful',
            })
        }
        // Get the total discounted amount
        const total_discounted_amount =
            await Transactions.getTotalDiscountedAmount(transaction_id)
        const totalDiscountedAmountUpdated =
            await Transactions.updateTotalDiscountedAmount(
                total_discounted_amount,
                transaction_id
            )
        if (!totalDiscountedAmountUpdated) {
            res.status(500).json({
                error: 'Total Discounted Amount Update Unsuccessful',
            })
        }
        // Get the total commission
        const total_commission = await Transactions.getTotalCommission(
            transaction_id
        )
        const totalCommissionUpdated = await Transactions.updateCommission(
            total_commission,
            transaction_id
        )
        if (!totalCommissionUpdated) {
            res.status(500).json({
                error: 'Total Commission Update Unsuccessful',
            })
        }
        // Get the summary of transactions innerjoin
        const created_transaction = await Transactions.getSingleTransaction(
            transaction_id
        )
        if (!created_transaction) {
            res.status(500).json({
                error: `Transaction ${transaction_id} fetch Failed`,
            })
        }
        console.log('Successful')
        res.json(created_transaction)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const { transaction_id } = req.params
        const updatedTransaction = await Transactions.updateTransaction(
            req.body,
            transaction_id
        )
        if (!updatedTransaction) {
            res.status(500).json({ error: 'Transaction Update Unsuccessful' })
        }
        res.json(updatedTransaction)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const { transaction_id } = req.params
        const transactionDeleted = await Transactions.deleteTransaction(
            transaction_id
        )
        if (!transactionDeleted) {
            res.status(500).json({ error: 'Transaction Delete Unsuccessful' })
        }
        res.json(`Successfully Deleted Transaction: ${transaction_id}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getTransactionAMounts = async (req, res) => {
    try {
        const { year } = req.params
        const transactionAmounts = await Transactions.getTotalDiscountedAmountPerYear(year)
        if (!transactionAmounts) {
            res.status(500).json({ error: `No Transaction Amounts for the year ${year}` })
        }
        res.json(transactionAmounts)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getTransactionAMounts,
    getAllTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
}
