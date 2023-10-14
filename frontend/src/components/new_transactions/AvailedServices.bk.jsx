import {useEffect, useState } from 'react'
import { getAllServices } from '../../services/SpaServices'

export default function AvailedServices() {
    const [selectedServiceType, setSelectedServiceType] = useState()
    const [filteredServiceNames, setFilteredServiceNames] = useState()
    const [selectedServiceName, setSelectedServiceName] = useState()
    const [specificServices, setSpecificServices] = useState()
    const [selectedServicePrice, setSelectedServicePrice] = useState()
    const [servicesDetails, setServicesDetails] = useState()

    const handleServiceTypeChange = (event) => {
        const newServiceType = event.target.value
        setSelectedServiceType(newServiceType)

        // Filter the service names based on the selected service type
        const filteredNames = servicesDetails
            .filter((service) => service.service_type === newServiceType)
            .map((service) => service.service_name)

        setFilteredServiceNames(filteredNames)
        setSelectedServiceName('')

        // Update specificServices using setSpecificServices
        const updatedSpecificServices = servicesDetails.filter(
            (service) => service.service_type === newServiceType
        )
        setSpecificServices(updatedSpecificServices)
    }
const handleServiceNameChange = (event) => {
        const newServiceName = event.target.value
        setSelectedServiceName(newServiceName)

        // Find the selected service by name in the specificServices array
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
}

<div className="relative flex justify-between space-y-2 text-black">
    <label className="self-center">
        Service Type:
    </label>
    <div className="flex flex-col w-[12rem]">
        <select
            className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg"
            name="service_type"
            value={selectedServiceType}
            onChange={(event) =>
                handleServiceTypeChange(event)
            }
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


handleServiceTypeChange
const handleServiceTypeChange = (event) => {
        const newServiceType = event.target.value
        setSelectedServiceType(newServiceType)

        // Filter the service names based on the selected service type
        const filteredNames = servicesDetails
            .filter((service) => service.service_type === newServiceType)
            .map((service) => service.service_name)

        setFilteredServiceNames(filteredNames)
        setSelectedServiceName('')

        // Update specificServices using setSpecificServices
        const updatedSpecificServices = servicesDetails.filter(
            (service) => service.service_type === newServiceType
        )
        setSpecificServices(updatedSpecificServices)
    }
-----------------

<div className="relative flex justify-between space-y-2 text-black">
                                <label className="self-center">
                                    Service Type:
                                </label>
                                <div className="flex flex-col w-[12rem]">
                                    <select
                                        className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg"
                                        name="service_type"
                                        value={selectedServiceType}
                                        onChange={(event) =>
                                            handleServiceTypeChange(event)
                                        }
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