import { useState } from 'react'
import { createdService, getAllServices } from '../services/SpaServices'

export function ServicesAdd() {
    const [servicesInputs, setServicesInputs] = useState({
        service_id: '',
        service_name: '',
        service_type: '',
        price: null,
        minutes: null,
        commission: null,
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setServicesInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleOnSubmit = () => {
        return createdService(servicesInputs)
            .then(() => getAllServices())
            .catch((error) => {
                console.log('Error creating or fetching services:', error)
                throw error // Rethrow the error to handle it in the main component if needed
            })
    }

    return {
        servicesInputs,
        handleOnChange,
        handleOnSubmit,
    }
}
