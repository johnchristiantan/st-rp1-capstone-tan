import React, { useEffect, useState } from 'react'
import { getAllServices } from '../services/SpaServices'
import { ImCross } from 'react-icons/im'
import { FaEdit } from 'react-icons/fa'
import { AiFillPlusSquare } from 'react-icons/ai'

export default function NewTransaction() {
    const [servicesDetails, setServicesDetails] = useState([
        {
            service_id: '',
            service_name: '',
            service_type: '',
        },
    ])

    const [customerName, setCustomerName] = useState(null)
    const [serviceType, setServiceType] = useState(null)
    const [service, setService] = useState(null)

    // const availedServices = []
    const [availedServices, setAvailedServices] = useState([])
    
    useEffect(() => {
        getAllServices()
            .then((res) => {
                setServicesDetails(res)
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    let uniqueServices = servicesDetails.filter(
        (service, index, self) =>
            index ===
            self.findIndex((s) => s.service_type === service.service_type)
    )

    let specificServices = servicesDetails.filter(
        (service, index, self) => service.service_type === serviceType
    )
    
    // Customer Input
    const handleCustomerNameOnChange = (e) => {
        const { value } = e.target
        setCustomerName(value)
        console.log(customerName)
    }

    const handleOnServiceTypeChange = (e) => {
        const { value } = e.target
        setServiceType(value)
        console.log(serviceType)
    }

    const handleOnServiceChange = (e) => {
        const { value } = e.target
        setService(value)
        console.log(service)
    }

    const handleAddCustomerService = () => {
        console.log('here')
        console.log(customerName)
        console.log(serviceType)
        console.log(service)
        
        if (customerName && serviceType && service) {
            const newAvailedService = 
                {
                    customer_name: customerName,
                    service_type: serviceType,
                    service: service
                }
                setAvailedServices(prev => [...prev, newAvailedService])
        } else {
            alert('Please provide all the fields')
        }

        console.log("Availed Services: ", availedServices)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log("Availed Services", availedServices)
    } 

    return (
        <>
            <div className="flex items-start justify-center h-screen mt-32">
                <form onSubmit={handleOnSubmit} className="flex flex-col justify-around w-10/12 p-6 text-sm text-white bg-orange-600 rounded shadow-lg lg:w-3/12 px-15 items-left h-9/12">
                    <div className="flex items-center justify-center w-full">
                        <h1 className="mb-6 text-xl font-semibold">New Transaction</h1>
                    </div>

                    <div className="flex items-center justify-between w-full py-1">
                        <label className="flex items-center w-5/12 gap-1 font-semibold">Date:</label>
                        <div className="flex items-center md:w-full">
                            <input
                                className="w-full py-1 text-black rounded"
                                type="date"
                                name="date"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full py-1 ">
                        <label className="flex flex-col items-start w-5/12 gap-1 font-semibold md:items-center md:flex-row"><span>Voucher</span> <span>No.:</span></label>
                        <div className="flex flex-col md:w-full">
                            <input
                                className="w-full p-1 text-black rounded"
                                type="text"
                                name="voucher_no"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full py-1 ">
                        <label className="flex items-center w-5/12 gap-1 font-semibold">Branch:</label>
                        <div className="flex flex-col md:w-full">
                            <input
                                className="w-full p-1 text-black rounded"
                                type="text"
                                name="branch"
                            />
                        </div>
                    </div>
                    {availedServices.length > 0 && availedServices.map((availedService, index) => {
                        return (
                            <div  key={index}>
                                <div className="p-2 mt-2 rounded shadow-lg bg-yellow-50 md:my-5">
                                    <div className="flex items-center justify-end w-full gap-2">
                                    <button type="button" className="text-orange-600"><FaEdit size={18} /></button>
                                    <button type="button" className="text-orange-600"><ImCross size={14} /></button>
                                    </div>
                                    <div className="flex items-center justify-between w-full py-1 ">
                                        <label className="font-semibold text-black">Customer: </label>
                                        <span className="w-1/2 text-black">{availedService.customer_name}</span>
                                    </div>
                                    <div className="relative flex items-center justify-between w-full py-1 ">
                                        <label className="font-semibold text-black">Service Type:</label>
                                        <span className="w-1/2 text-black">{availedService.service_type}</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full py-1 ">
                                        <label className="font-semibold text-black">Service:</label>
                                        <span className="w-1/2 text-black">{availedService.service}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="p-2 mt-2 rounded shadow-lg bg-yellow-50 md:my-5">
                        <div className="flex items-center justify-between w-full py-1 ">
                            <label className="font-semibold text-black">Customer:</label>
                            <div className="flex flex-col w-1/2 md:w-2/3">
                                <input
                                    className="w-full p-1 text-black rounded shadow-lg"
                                    type="text"
                                    name="customer_name"
                                    onChange={handleCustomerNameOnChange}
                                />
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between w-full py-1 ">
                            <label className="font-semibold text-black">Service Type:</label>
                            <div className="flex flex-col w-1/2 md:w-2/3">
                                <select
                                    onChange={handleOnServiceTypeChange}
                                    className="w-full p-1 text-black rounded shadow-lg"
                                    name="service_type"
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
                        <div className="flex items-center justify-between w-full py-1 ">
                            <label className="font-semibold text-black">Service:</label>
                            <div className="flex flex-col w-1/2 md:w-2/3">
                                <select
                                    onChange={handleOnServiceChange}
                                    className="w-full p-1 text-black rounded shadow-lg"
                                    name="service"
                                >
                                    {specificServices.map((service) => (
                                        <option
                                            key={service.service_name}
                                            value={service.service_name}
                                        >
                                            {service.service_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end"><button type="button" onClick={handleAddCustomerService} className="text-orange-600"><AiFillPlusSquare size={25} /></button></div>
                    </div>
                    <div className="flex items-center justify-center w-full px-6 mt-4">
                        <input
                            className="w-1/3 p-1 bg-orange-900 rounded-lg shadow-lg hover:bg-yellow-300 hover:text-black hover:font-semibold"
                            type="submit"
                            value="Create"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
