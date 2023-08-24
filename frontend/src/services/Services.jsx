// #services 2
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
