import axios from 'axios'
const baseURL = 'http://localhost:8000/api/v1/get-transactions-amounts'
let year = 2023

export async function getAllChartData() {
    try {
        const chartsample = await axios.get('http://localhost:8000/api/v1/get-transactions-amounts/2023')
        // const chartsample = await axios.get(baseURL)
        setTimeout(console.log("Chartsample: ", chartsample.data), 10000)
        console.log(chartsample.data)
        return chartsample.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
