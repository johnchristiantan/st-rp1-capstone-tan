import React, { useEffect, useState } from 'react'
import { getAllServices } from '../services/SpaServices'

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
            <div className="flex items-start justify-center h-screen mt-32">
                <form className="flex flex-col justify-around w-10/12 p-6 text-sm text-white bg-orange-600 rounded shadow-lg lg:w-3/12 px-15 items-left h-9/12">
                    <div className="flex items-center justify-center w-full">
                        <h1 className="mb-6 text-xl ">New Transaction</h1>
                    </div>

                    <div className="flex items-center justify-between w-full py-1">
                        <label className="flex items-center w-5/12 gap-1">Date:</label>
                        <div className="flex items-center md:w-full">
                            <input
                                className="w-full py-1 text-black rounded"
                                type="date"
                                name="date"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full py-1 ">
                        <label className="flex flex-col items-start w-5/12 gap-1 md:items-center md:flex-row"><span>Voucher</span> <span>No.:</span></label>
                        <div className="flex flex-col md:w-full">
                            <input
                                className="w-full p-1 text-black rounded"
                                type="text"
                                name="voucher_no"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full py-1 ">
                        <label className="flex items-center w-5/12 gap-1">Branch:</label>
                        <div className="flex flex-col md:w-full">
                            <input
                                className="w-full p-1 text-black rounded"
                                type="text"
                                name="branch"
                            />
                        </div>
                    </div>
                    <div className="p-2 mt-2 rounded shadow-lg bg-yellow-50 md:my-5">
                        <div className="flex items-center justify-between w-full py-1 ">
                            <label className="font-semibold text-black">Customer Name:</label>
                            <div className="flex flex-col w-1/2">
                                <input
                                    className="w-full p-1 text-black rounded shadow-lg"
                                    type="text"
                                    name="customer_name"
                                />
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between w-full py-1 ">
                            <label className="font-semibold text-black">Service Type:</label>
                            <div className="flex flex-col w-1/2">
                                <select
                                    onChange={handleOnChange}
                                    className="w-full p-1 text-black rounded shadow-lg"
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
                        <div className="flex items-center justify-between w-full py-1 ">
                            <label className="font-semibold text-black">Service:</label>
                            <div className="flex flex-col w-1/2">
                                <select
                                    className="w-full p-1 text-black rounded shadow-lg"
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
                        </div>
                    </div>
                    {/* <div className="w-12 h-12 mt-2 bg-orange-200 rounded-full">
                        +
                    </div> */}
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
