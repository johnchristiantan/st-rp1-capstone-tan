import { useEffect, useState, useRef } from 'react'
import {
    getAllServices,
    createdService,
    deleteService,
    updateService,
} from '../services/SpaServices'

export default function Services() {
    const [showButton, setShowButton] = useState(false)
    const [services, setServices] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const [inputChanges, setInputChanges] = useState({})
    const [isEdited, setIsEdited] = useState(false)

    // This handles the selection of a service
    const [showServiceCreateForm, setShowServiceCreateForm] = useState(false) // This handles the selection of a discount (1/6)
    const [showSelectedService, setShowSelectedService] = useState(false) // This handles the selection of a discount (2/6)
    const [selectedService, setSelectedService] = useState(null) // This handles the selection of a discount (3/6)

    // Confirmation dialog state
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState(null)
    const [trigger, setTrigger] = useState(false)

    const handleShowButton = () => {
        setShowButton((prev) => !prev)
        setShowServiceCreateForm((prev) => !prev)
        // setShowSelectedService((prev) => !prev)
        setShowSelectedService(false)
    }

    //ServicesAdd
    const [servicesInputs, setServicesInputs] = useState({
        service_id: '',
        service_name: '',
        service_type: 'Massage',
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
    }, [isDeleted, showServiceCreateForm])

    // When selectedService changes, update inputChanges
    useEffect(() => {
        if (selectedService) {
            console.log(selectedService)
            // Set inputChanges with the selectedService properties
            setInputChanges({
                service_id: selectedService.service_id,
                service_name: selectedService.service_name,
                service_type: selectedService.service_type,
                price: selectedService.price,
                minutes: selectedService.minutes,
                commission: selectedService.commission,
            })
        }
    }, [selectedService])

    // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
    const service_id_ur = useRef(null)
    const service_name_ur = useRef(null)
    const service_type_ur = useRef(null)
    const price_ur = useRef(null)
    const minutes_ur = useRef(null)
    const commission_ur = useRef(null)

    // This handles the selection of a service (1/2)
    const handleSelectService = (service) => {
        // console.log('Selected')
        setShowServiceCreateForm(false)
        setSelectedService(service)
        setShowSelectedService(true)

        service_id_ur.current.value = service.service_id
        service_name_ur.current.value = service.service_name
        service_type_ur.current.value = selectedService.service_type
        price_ur.current.value = selectedService.price
        minutes_ur.current.value = selectedService.minutes
        commission_ur.current.value = selectedService.commission

        handleReRender()
    }

    const handleReRender = () => {
        setTrigger((prev) => {
            !prev
            console.log('Restart')
        })
    }

    // Function to toggle the confirmation dialog
    const toggleDeleteConfirmation = (service) => {
        setServiceToDelete(service)
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }

    // Function to handle delete confirmation
    const handleDeleteConfirmation = () => {
        if (serviceToDelete) {
            deleteService(serviceToDelete.service_id)
                .then(() => {
                    setIsDeleted((prev) => !prev)
                    setShowSelectedService(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        setShowDeleteConfirmation(false)
    }

    const handleOnChangeEdit = (e) => {
        const { name, value } = e.target
        setSelectedService((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleOnCancelEdit = () => {
        setShowServiceCreateForm(false)
        setShowSelectedService((prev) => !prev)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const mergeObject = { ...selectedService, ...inputChanges }
        updateService(mergeObject)
            .then((res) => {
                // Handle successful update
                console.log(res)
                setIsEdited((prev) => !prev)
                // Hide the form after successful edit
                setShowSelectedService(false)
            })
            .catch((error) => {
                console.error('Error updating service:', error)
                // Handle the error, display an error message, or take appropriate action.
            })
    }

    // Calculate the width for each column
    const columnWidth = 'calc(22rem / 3)' // This divides the available width by 3

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16">
                <div className="flex flex-wrap w-[22rem]">
                    {services ? (
                        services.map((service, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectService(service)}
                                className="w-1/3 p-2"
                            >
                                <div className="transition-transform transition-bg hover:scale-110 hover:shadow-md bg-white border border-gray-400 shadow-lg rounded p-4 cursor-pointer h-[10rem] overflow-y-auto flex flex-col justify-center items-center text-center">
                                    <div className="text-sm font-bold">
                                        {service.service_name}
                                    </div>
                                    <div className="text-gray-500">
                                        {service.price}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <div>Loading...</div>
                        </>
                    )}
                </div>

                <button
                    onClick={handleShowButton}
                    className="w-[30rem] p-1  rounded-lg hover:text-orange-600 text-orange-500   hover:font-bold"
                >
                    Create New Service
                </button>

                {showButton && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                        <form
                            className="flex flex-col justify-around bg-white w-[22rem] p-6 text-white  rounded-lg px-15 items-left h-9/12 border-2 border-gray-500"
                            onSubmit={handleOnSubmit}
                        >
                            <div className="flex items-center w-full text-lg font-bold text-left text-orange-600">
                                <h1 className="mb-2 text-xl">Services</h1>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Service ID
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        onChange={handleOnChange}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                        type="text"
                                        name="service_id"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-base text-black">
                                <label className="self-center">
                                    Service Name:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        onChange={handleOnChange}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg "
                                        type="text"
                                        name="service_name"
                                    />
                                </div>
                            </div>

                            <div className="relative flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Service Type:
                                </label>
                                <div className="flex flex-col ">
                                    <select
                                        onChange={handleOnChange}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                        name="service_type"
                                        // value="Massage" // Set a default value
                                    >
                                        <option value="Massage">Massage</option>
                                        <option value="Spa">Spa</option>
                                        <option value="Package">Package</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">Price:</label>
                                <div className="flex flex-col ">
                                    <input
                                        onChange={handleOnChange}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                        type="text"
                                        name="price"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">Minutes:</label>
                                <div className="flex flex-col ">
                                    <input
                                        onChange={handleOnChange}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                        type="text"
                                        name="minutes"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Commission:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        onChange={handleOnChange}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                        type="text"
                                        name="commission"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    onChange={handleOnChange}
                                    className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4 ">
                                <input
                                    className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                    type="button"
                                    onClick={handleShowButton}
                                    value="Cancel"
                                />
                            </div>
                        </form>
                    </div>
                )}

                {showSelectedService && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                        <form
                            className=" flex flex-col justify-around bg-white w-[25rem]  p-6 text-white rounded-lg border-2 border-gray-500 px-15 items-left h-9/12"
                            onSubmit={handleEditSubmit}
                        >
                            <div className="flex items-center w-full text-lg font-bold text-orange-500">
                                <h1 className="mb-2 text-xl">Services</h1>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Service ID
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={service_id_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        // onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="number"
                                        name="service_id"
                                        defaultValue={
                                            selectedService
                                                ? selectedService.service_id
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Service Name:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={service_name_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
                                        name="service_name"
                                        defaultValue={
                                            selectedService
                                                ? selectedService.service_name
                                                : ''
                                        }
                                    />
                                </div>
                            </div>

                            <div className="relative flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Service Type:
                                </label>
                                <div className="flex flex-col ">
                                    <select
                                        ref={service_type_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className=" p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
                                        name="service_type"
                                        value={
                                            selectedService
                                                ? selectedService.service_type
                                                : ''
                                        }
                                    >
                                        <option value="Massage">Massage</option>
                                        <option value="Spa">Spa</option>
                                        <option value="Package">Package</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">Price:</label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={price_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="number"
                                        name="price"
                                        defaultValue={
                                            selectedService
                                                ? selectedService.price
                                                : ''
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">Minutes:</label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={minutes_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
                                        name="minutes"
                                        defaultValue={
                                            selectedService
                                                ? selectedService.minutes
                                                : ''
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Commission:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={commission_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
                                        name="commission"
                                        defaultValue={
                                            selectedService
                                                ? selectedService.commission
                                                : ''
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500"
                                    type="submit"
                                    value="Update"
                                />
                            </div>
                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                    type="button"
                                    onClick={handleOnCancelEdit}
                                    value="Cancel"
                                />
                            </div>
                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 rounded-full text-black hover:text-orange-500 "
                                    type="button"
                                    value="Delete"
                                    onClick={() =>
                                        toggleDeleteConfirmation(
                                            selectedService
                                        )
                                    }
                                />
                            </div>
                        </form>
                    </div>
                )}
                {/* Delete confirmation dialog */}
                {showDeleteConfirmation && (
                    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-lg">
                                Are you sure you want to delete this service?
                            </p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-3 py-1 mr-2 text-white bg-red-500 rounded"
                                    onClick={handleDeleteConfirmation}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="px-3 py-1 text-gray-800 bg-gray-400 rounded"
                                    onClick={() =>
                                        setShowDeleteConfirmation(false)
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}