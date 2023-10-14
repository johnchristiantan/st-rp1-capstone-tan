import axios from 'axios'
const baseURL = 'http://localhost:8000/api/v1'

export async function getAllChartData() {
    try {
        const currentYear = new Date().getFullYear() // Get the current year

        const chartsample = await axios.get(`${baseURL}/get-transactions-amounts/${currentYear}`)
        return chartsample.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

export async function getAllTransactions() {
    try {
        const transactions = await axios.get(`${baseURL}/transactions`)
        return transactions.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
