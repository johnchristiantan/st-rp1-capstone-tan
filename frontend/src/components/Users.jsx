import { useEffect, useState, useRef } from 'react'

import { createUser, getUsers, editUser, deleteUser } from '../services/Users'

export default function Users() {
    const [showButton, setShowButton] = useState(false)
    const [users, setUsers] = useState([])

    // This handles the selection of a service
    const [showServiceCreateForm, setShowServiceCreateForm] = useState(false) // This handles the selection of a service (1/6)
    const [showSelectedService, setShowSelectedService] = useState(false) // This handles the selection of a service (2/6)
    const [selectedService, setSelectedService] = useState(null) // This handles the selection of a service (3/6)

    const [isDeleted, setIsDeleted] = useState(false)
    const [inputChanges, setInputChanges] = useState(selectedService)
    const [isEdited, setIsEdited] = useState(false)

    // Confirmation dialog state
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState(null)

    //    serviceAdd (1/3)
    const [usersInputs, setUsersInputs] = useState({
        service_id: '',
        service_name: '',
        service_type: '',
    })

    const handleShowButton = () => {
        setShowSelectedService(false)
        setShowServiceCreateForm((prev) => !prev)
    }

    //    serviceAdd (2/3)
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setUsersInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    //    serviceAdd (3/3)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        createdUser(usersInputs)
            .then(() => getAllUsers())
            .then((res) => {
                setUsers(res)

                // Hide the form after successful creation
                setShowServiceCreateForm(false)
            })
            .catch((error) => {
                console.log('Error creating or fetching users:', error)
                throw error // Rethrow the error to handle it in the main component if needed
            })
    }

    const handleOnCancelEdit = () => {
        setShowServiceCreateForm(false)
        setShowSelectedService((prev) => !prev)
    }

    // Data fetching
    useEffect(() => {
        getAllUsers()
            .then((res) => {
                setUsers(res)
            })
            .catch((error) => {
                console.log('Error fetching users:', error)
            })
    }, [isDeleted, isEdited, showServiceCreateForm]) // [isCreateBranchFormSubmitted, isDeleted, isEdited]) // auto reload when submitted

    // This handles the selection of a service (5/6)
    const service_id_ur = useRef(null)
    const service_name_ur = useRef(null)
    const service_type_ur = useRef(null)
    const price_ur = useRef(null)
    const minutes_ur = useRef(null)
    const commission_ur = useRef(null)

    // This handles the selection of a service (6/6)
    const handleSelectService = (service) => {
        console.log(service)
        setShowServiceCreateForm(false)
        setSelectedService(service)
        setShowSelectedService(true)

        // Make sure to check if the refs are defined before setting their values
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

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const mergeObject = { ...selectedService, ...inputChanges }
        editService(mergeObject)
            .then((res) => {
                // alert('Edited successfully')
                console.log(res)
                setIsEdited((prev) => !prev)

                // Hide the form after successful edit
                setShowSelectedService(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleOnChangeEdit = (e) => {
        const { name, value } = e.target
        setSelectedService((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Calculate the width for each column
    const columnWidth = 'calc(22rem / 3)' // This divides the available width by 3

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16 ">
                <div className="servicelist flex flex-wrap w-[22rem] max-w-md">
                    {/* ServiceList */}
                    {users ? (
                        users.map((service, index) => (
                            <div
                                key={index}
                                className={`w-[25rem] md:w-1/2 lg:w-1/3 p-2 md:w-${columnWidth} lg:w-${columnWidth} `}
                            >
                                <div
                                    onClick={() => handleSelectUser(user)}
                                    className="bg-white border border-gray-400 shadow-lg rounded p-4 cursor-pointer h-[10rem] transition-transform transition-bg hover:scale-110 hover:shadow-md overflow-y-auto flex flex-col justify-center items-center text-center"
                                >
                                    <div className="text-sm font-bold">
                                        {user.service_name}
                                    </div>
                                    <div className="text-gray-500">
                                        {user.service_type}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                {/* End of ServiceList */}

                <button
                    onDoubleClick={handleShowButton}
                    className="w-[30rem] p-1  rounded-lg hover:text-orange-600 text-orange-500   hover:font-bold"
                >
                    Create New User
                </button>

                <div className="relative flex flex-col items-center justify-start h-screen pt-16">
                    {showServiceCreateForm && (
                        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                            <form
                                className="flex flex-col justify-around w-[22rem] p-6 text-white rounded-lg px-15 items-left border-2 border-gray-500 bg-white "
                                onSubmit={handleOnSubmit}
                            >
                                <div className="flex items-center w-full text-lg font-bold text-orange-500 ">
                                    <h1 className="mb-2 text-xl ">Users</h1>
                                </div>

                                <div className="flex justify-between w-full space-y-2 text-black ">
                                    <label className="self-center">
                                        Username:
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            onChange={handleOnChange}
                                            className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg "
                                            type="text"
                                            name="user_name"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between w-full space-y-2 text-black">
                                    <label className="self-center">
                                        Password:
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            onChange={handleOnChange}
                                            className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                            type="text"
                                            name="password"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between w-full space-y-2 text-black">
                                    <label className="self-center">
                                        Price:
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            // onChange={handleOnChange}
                                            className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                            type="text"
                                            name="price"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between w-full space-y-2 text-black">
                                    <label className="self-center">
                                        Minutes:
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            // onChange={handleOnChange}
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
                                            // onChange={handleOnChange}
                                            className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                            type="text"
                                            name="commission"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-full mt-4">
                                    <input
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
                </div>

                {showSelectedService && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                        <form
                            className="flex flex-col bg-white justify-around w-[25rem] p-6 text-white  rounded-lg border-2 border-gray-500 px-15 items-left h-9/12"
                            onSubmit={handleEditSubmit}
                        >
                            <div className="flex items-center w-full text-lg font-bold text-orange-500">
                                <h1 className="mb-2 text-xl ">Services</h1>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Service ID
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={service_id_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
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
                                    Description:
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

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Service Type:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={service_type_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
                                        name="service_type"
                                        defaultValue={
                                            selectedService
                                                ? selectedService.service_type
                                                : ''
                                        }
                                    />
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
                                        type="number"
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
                                        type="number"
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