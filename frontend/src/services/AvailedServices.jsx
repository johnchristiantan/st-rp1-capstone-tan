import axios from 'axios'
const baseURL = 'http://localhost:8000/availed-services'

export async function getAllAvailedServices() {
    try {
        const availed_services = await axios.get(baseURL)
        return availed_services.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
