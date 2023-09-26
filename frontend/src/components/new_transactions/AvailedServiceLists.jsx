import { useState, useEffect } from 'react'
import { getAllServices } from '../../services/SpaServices'
import useTransactionFormStore from '../../data/Store'

export default function AvailedServiceLists() {
    const [services, setServices] = useState([])
    const [selectedService, setSelectedService] = useState('') // State to track the selected
    const [specificServices, setSpecificServices] = useState([])
    const [selectedServiceType, setSelectedServiceType] = useState('') // Add a new state variable to track the selected service type
    const [filteredServiceNames, setFilteredServiceNames] = useState([]) // Add a state variable to store the filtered service names
    const [selectedServiceName, setSelectedServiceName] = useState('')
    const [selectedServicePrice, setSelectedServicePrice] = useState(0)

    const { createTransactionInputField, setCreateTransactionInputField } =
        useTransactionFormStore()

    let uniqueServices = services.filter(
        (service, index, self) =>
            index ===
            self.findIndex((s) => s.service_type === service.service_type)
    )

    useEffect(() => {
        async function fetchServices() {
            try {
                const fetchedServices = await getAllServices()
                setServices(fetchedServices)
            } catch (error) {
                console.log('Error fetching services: ', error)
            }
        }
        fetchServices()
    }, [])

    // Create an array of option elements
    const serviceOptions = services.map((service) => (
        <option key={service.service_id} value={service.service_id}>
            {service.service_name}
        </option>
    ))

    const handleServiceTypeChange = (event) => {
        const newServiceType = event.target.value
        setSelectedServiceType(newServiceType)

        // Filter the service names based on the selected service type
        const filteredNames = services
            .filter((service) => service.service_type === newServiceType)
            .map((service) => service.service_name)

        setFilteredServiceNames(filteredNames)
        setSelectedServiceName('')

        // Update specificServices using setSpecificServices
        const updatedSpecificServices = services.filter(
            (service) => service.service_type === newServiceType
        )
        setSpecificServices(updatedSpecificServices)
    }

    const handleServiceNameChange = (event) => {
        const newServiceName = event.target.value
        setSelectedServiceName(newServiceName)

        // Find the selected service by name in the `specificServices` array
        const selectedService = specificServices.find(
            (service) => service.service_name === newServiceName
        )

        // Check if selectedService is defined before accessing its properties
        if (selectedService) {
            setSelectedServicePrice(selectedService.price)
        } else {
            setSelectedServicePrice(0)
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setSelectedService(value)
        setCreateTransactionInputField(name, value)

        console.log(name, value)
        console.log(createTransactionInputField)
    }

    return (
        // <div className="flex justify-between w-full space-y-2 text-black">
        //     <label className="self-center">Service:</label>
        //     <div className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg">
        //     <select
        //     name="branch_id" // Add the name attribute here
        //     className="p-1 text-black bg-white rounded"
        //     value={selectedService}
        //     onChange={(e) => setSelectedService(e.target.value)}
        // >
        //     <option value="">Select a service</option>
        //     {serviceOptions}
        // </select>
        //     </div>
        // </div>
        <>
            <div className="relative flex justify-between space-y-2 text-black">
                <label className="self-center">Service Type:</label>
                <div className="flex flex-col w-[12rem]">
                    <select
                        className="w-[12rem] p-1 text-black rounded"
                        name="service_type"
                        value={selectedServiceType}
                        onChange={(event) => handleServiceTypeChange(event)}
                    >
                        {uniqueServices.map((service) => (
                            <option
                                key={service.service_type}
                                value={service.service_type}
                            >
                                {service.service_type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="relative flex justify-between space-y-2 text-black">
                <label className="self-center">Service:</label>
                <div className="flex flex-col w-[12rem]">
                    <select
                        className="w-[12rem] p-1 text-black rounded"
                        name="service_name"
                        value={selectedServiceName}
                        onChange={(event) => handleServiceNameChange(event)}
                    >
                        <option value="">Select a service</option>
                        {filteredServiceNames.map((serviceName) => (
                            <option key={serviceName} value={serviceName}>
                                {serviceName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

// NOTES
// THIS IS USED TO POPULATE THE DROPDOWN LIST WITH NAME OF BRANCHES
