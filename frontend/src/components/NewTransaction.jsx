import React, { useEffect, useState } from 'react'
import { getAllServices } from '../services/Services'

export default function NewTransaction() {
    const [servicesDetails, setServicesDetails] = useState([
        {
            service_id: '',
            service_name: '',
            service_type: '',
        },
    ])

    const [serviceType, setServiceType] = useState('service_name')

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

    const handleOnChange = (event) => {
        const { value } = event.target
        setServiceType(value)
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <form className="flex flex-col justify-around w-10/12 p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12">
                    <div className="flex items-center justify-center w-full">
                        <h1 className="mb-2 text-xl ">New Transaction</h1>
                    </div>

                    <div className="flex justify-between w-full space-y-2 ">
                        <label className="self-center">Date:</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded "
                                type="date"
                                name="date"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Voucher No.:</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded "
                                type="text"
                                name="voucher_no"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Branch:</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 rounded text-blackrounded"
                                type="text"
                                name="branch"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Customer Name:</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded"
                                type="text"
                                name="customer_name"
                            />
                        </div>
                    </div>
                    <div className="relative flex justify-between w-full space-y-2">
                        <label className="self-center">Service Type:</label>
                        <div className="flex flex-col w-1/2">
                            <select
                                onChange={handleOnChange}
                                className="w-full p-1 text-black rounded"
                                name="service_type"
                            >
                                {' '}
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
                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Service:</label>
                        <div className="flex flex-col w-1/2">
                            <select
                                className="w-full p-1 text-black rounded"
                                name="service_type"
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
                        {/* <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded "
                                type="text"
                                name="a_service_id"
                            />
                        </div> */}
                    </div>
                    <div className="flex items-center justify-center w-full px-6 mt-4">
                        <input
                            className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600"
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
