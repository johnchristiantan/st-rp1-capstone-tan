import axios from 'axios'
const baseURL = 'http://localhost:8000/branches'

export async function getAllDiscounts() {
    try {
        const discounts = await axios.get(baseURL)
        return discounts.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
