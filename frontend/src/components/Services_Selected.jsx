import { useEffect, useState, useRef } from 'react'
import { getAllServices, createdService } from '../services/SpaServices'

export default function Services() {
    const [showButton, setShowButton] = useState(false)
    const [services, setServices] = useState([])

    const [showServiceCreateForm, setShowServiceCreateForm] = useState(false) // This handles the selection of a discount (1/6)
    const [showSelectedService, setShowSelectedService] = useState(false) // This handles the selection of a discount (2/6)
    const [selectedService, setSelectedService] = useState(null) // This handles the selection of a discount (3/6)

    const handleShowButton = () => {
        setShowButton((prev) => !prev)
    }

    //ServicesAdd
    const [servicesInputs, setServicesInputs] = useState({
        service_id: '',
        service_name: '',
        service_type: '',
        price: null,
        minutes: null,
        commission: null,
    })

    //ServicesAdd
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setServicesInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    //ServicesAdd
    const handleOnSubmit = () => {
        return createdService(servicesInputs)
            .then(() => getAllServices())
            .then((res) => {
                setServices(res)
                setShowButton(false) // Hide the form after submission
            })
            .catch((error) => {
                console.log('Error creating or fetching services:', error)
                throw error // Rethrow the error to handle it in the main component if needed
            })
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

    // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
    const service_id_ur = useRef(null)
    const service_name_ur = useRef(null)
    const service_type_ur = useRef(null)
    const price_ur = useRef(null)
    const minutes_ur = useRef(null)
    const commission_ur = useRef(null)

    // This handles the selection of a service (1/2)
    const handleSelectService = (service) => {
        setShowServiceCreateForm(false)
        setSelectedService(service)
        setShowSelectedService(true)

        if (service_id_ur.current) {
            service_id_ur.current.value = service.service_id
        }
        if (service_name_ur.current) {
            service_name_ur.current.value = service.service_name
        }
        if (service_type_ur.current) {
            service_type_ur.current.value = service.service_type
        }

        if (price_ur.current) {
            price_ur.current.value = service.price
        }
        if (minutes_ur.current) {
            minutes_ur.current.value = service.minutes
        }
        if (commission_ur.current) {
            commission_ur.current.value = service.commission
        }
    }

    const handleOnChangeEdit = (e) => {
        const { name, value } = e.target
        setSelectedService((prev) => ({
            ...prev,
            [name]: value,
        }))
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
                        services.map((service, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleSelectService(service)} // Add this line
                                    className="flex text-[0.8rem] w-full justify-around text-black bg-white mt-2"
                                >
                                    <div>{service.service_id}</div>
                                    <div>{service.service_name}</div>
                                    <div>{service.service_type}</div>
                                    <div>{service.price}</div>
                                    <div>{service.minutes}</div>
                                    <div>{service.commission}</div>
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

                {showSelectedService && (
                    <form
                        className="flex flex-col justify-around w-[25rem] p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12"
                        // onSubmit={handleEditSubmit}
                    >
                        <div className="flex items-center justify-center w-full">
                            <h1 className="mb-2 text-xl">Services</h1>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Service ID</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={service_id_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    // onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="service_id"
                                    defaultValue={
                                        selectedService
                                            ? selectedService.service_id_ur
                                            : ''
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Service Name:</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={service_name_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="service_name"
                                    defaultValue={
                                        selectedService
                                            ? selectedService.service_name_ur
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="relative flex justify-between w-full space-y-2">
                            <label className="self-center">Service Type:</label>
                            <div className="flex flex-col w-1/2">
                                <select
                                    ref={service_type_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    // onChange={handleOnChangeEdit}
                                    className="w-full p-1 text-black rounded"
                                    type="text"
                                    name="service_type"
                                    value={
                                        selectedService
                                            ? selectedService.service_type_ur
                                            : ''
                                    }
                                >
                                    <option value="Massage">Massage</option>
                                    <option value="Spa">Spa</option>
                                    <option value="Package">Package</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Price:</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={price_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    // onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="price"
                                    defaultValue={
                                        selectedService
                                            ? selectedService.price_ur
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Minutes:</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={minutes_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    // onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="minutes"
                                    defaultValue={
                                        selectedService
                                            ? selectedService.minutes_ur
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Commission:</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={commission_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    // onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="commission"
                                    defaultValue={
                                        selectedService
                                            ? selectedService.commission_ur
                                            : ''
                                    }
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
