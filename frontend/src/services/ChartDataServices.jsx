import axios from 'axios'
const baseURL = 'http://localhost:8000/api/v1/get-transactions-amounts'

export async function getAllChartData() {
    try {
        const currentYear = new Date().getFullYear() // Get the current year

        const chartsample = await axios.get(`${baseURL}/${currentYear}`)

        // const chartsample = await axios.get(baseURL)
        // setTimeout(console.log('Chartsample: ', chartsample.data), 10000)
        // console.log(chartsample.data)
        return chartsample.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
