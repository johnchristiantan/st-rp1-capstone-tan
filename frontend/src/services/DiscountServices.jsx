import axios from 'axios'
const baseURL = 'http://localhost:8000/api/v1/discounts'

export async function getAllDiscounts() {
    try {
        const discounts = await axios.get(baseURL)
        return discounts.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

// ADD
export async function createdDiscount(discount_input) {
    try {
        const createdDiscount = await axios.post(baseURL, discount_input)
        return createdDiscount.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

export async function deleteDiscount(discount_input) {
    try {
        const deleteDiscount = await axios.delete(
            `${baseURL}/${discount_input}`
        )
        return deleteDiscount.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

export async function editDiscount(discount_input) {
    console.log(discount_input)
    try {
        const editDiscount = await axios.put(
            `${baseURL}/${discount_input.discount_code}`,
            discount_input
        )
        return editDiscount.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
