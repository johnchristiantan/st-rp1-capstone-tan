// THIS IS A COPY WHERE ADD FUNCTION IS STILL LINKED TO BranchesAdd.jsx

import { useEffect, useState } from 'react'
import { getAllServices, createdService } from '../services/SpaServices'
import { ServicesAdd } from './ServicesAdd'

export default function Services() {
    const [showButton, setShowButton] = useState(false)
    const [services, setServices] = useState([])

    const handleShowButton = () => {
        setShowButton((prev) => !prev)
    }

    useEffect(() => {
        getAllServices()
            .then((res) => {
                setServices(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const { servicesInputs, handleOnChange, handleOnSubmit } = ServicesAdd()

    const handleServiceSubmit = () => {
        handleOnSubmit()
            .then((res) => {
                setServices(res)
                setShowButton(false) // Hide the form after submission
            })
            .catch((error) => {
                // Handle error if needed
            })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16 bg-gray-10">
                <div className="flex flex-col w-[25rem] p-2 bg-slate-500 ">
                    <div className="flex text-[0.8rem] w-full justify-around text-white ">
                        <div>Service ID</div>
                        <div>Service Name</div>
                        <div>Service Type</div>
                        <div>Price</div>
                        <div>Minutes</div>
                        <div>Commission</div>
                    </div>

                    {services ? (
                        services.map((services, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex text-[0.8rem] w-full justify-around text-black bg-white mt-2">
                                        <div>{services.service_id}</div>
                                        <div>{services.service_name}</div>
                                        <div>{services.service_type}</div>
                                        <div>{services.price}</div>
                                        <div>{services.minutes}</div>
                                        <div>{services.commission}</div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <>
                            <div>Loading...</div>
                        </>
                    )}
                </div>

                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500">
                    <button onClick={handleShowButton}>+</button>
                </div>
                {showButton && (
                    <form
                        className="flex flex-col justify-around w-[25rem] p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12"
                        onSubmit={handleOnSubmit}
                    >
                        <div className="flex items-center justify-center w-full">
                            <h1 className="mb-2 text-xl">Services</h1>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Service ID</label>
                            <div className="flex flex-col ">
                                <input
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="service_id"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Service Name:</label>
                            <div className="flex flex-col ">
                                <input
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded "
                                    type="text"
                                    name="service_name"
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
                                    <option value="optMassage">Massage</option>
                                    <option value="optSpa">Spa</option>
                                    <option value="optPackage">Package</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Price:</label>
                            <div className="flex flex-col ">
                                <input
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="price"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Minutes:</label>
                            <div className="flex flex-col ">
                                <input
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="minutes"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Commission:</label>
                            <div className="flex flex-col ">
                                <input
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="commission"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full px-6 mt-4">
                            <input
                                onChange={handleOnChange}
                                className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600"
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}
