import axios from 'axios'
const baseURL = 'http://localhost:8000/api/v1/transactions'

export async function getAllTransactions() {
    try {
        const transactions = await axios.get(baseURL)
        return transactions.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

// ADD
export async function createdTransaction(transactionsInputs) {
    try {
        const createdTransaction = await axios.post(baseURL, transactionsInputs)
        return createdTransaction.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

export async function deleteTransaction(transaction_id) {
    try {
        const deleteTransaction = await axios.delete(
            `${baseURL}/${transaction_id}`
        )
        return deleteTransaction.data
    } catch (error) {
        console.log('Error: ', error)
        // res.status(500).json({ error: 'Failed to delete transaction' })
    }
}

//EDIT
// export async function editTransaction(transactionsInputs) {
//     console.log(transactionsInputs)
//     try {
//         const editTransaction = await axios.put(
//             `${baseURL}/${transactionsInputs.transaction_id}`,
//             transactionsInputs
//         )
//         return editTransaction.data
//     } catch (error) {
//         console.log('Error: ', error)
//     }
// }

//editTransaction
export async function editTransaction(transactionsInputs) {
    try {
        const editTransaction = await axios.put(
            `${baseURL}/${transactionsInputs.transaction_id}`,
            {
                status: transactionsInputs.status,
            }
        )

        return editTransaction.data
    } catch (error) {
        console.error('Error: ', error)
        throw new Error('Failed to edit transaction: ' + error.message)
    }
}
