// #service
import axios from 'axios'
const baseURL = 'http://localhost:8000/services'

export async function getAllServices() {
    try {
        const services = await axios.get(baseURL)
        return services.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

// ADD
export async function createdService(service_input) {
    try {
        const createdService = await axios.post(baseURL, service_input)
        return createdService.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
