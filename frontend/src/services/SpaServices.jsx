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

//DELETE
export async function deleteService(service_input) {
    try {
        const deleteService = await axios.delete(`${baseURL}/${service_input}`)
        return deleteService.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

//EDIT
export async function editService(service_input) {
    console.log(service_input)
    try {
        const editService = await axios.put(
            `${baseURL}/${service_input.service_id}`,
            service_input
        )
        return editService.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
