import axios from 'axios'
const baseURL = 'http://localhost:8000/discounts'

export async function getAllDiscounts() {
    try {
        const discounts = await axios.get(baseURL)
        return discounts.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

export async function createdDiscount(discount_input) {
    try {
        const createdDiscount = await axios.post(baseURL, discount_input)
        return createdDiscount.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
