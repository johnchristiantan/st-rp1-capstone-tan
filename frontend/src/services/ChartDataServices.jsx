import axios from 'axios'
const baseURL = 'http://localhost:8000/api/v1/chartsample'

export async function getAllChartData() {
    try {
        const chartsample = await axios.get(baseURL)
        console.log(chartsample)
        return chartsample.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
