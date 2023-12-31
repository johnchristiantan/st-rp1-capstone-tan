import React, { useEffect, useState, useRef } from 'react'
import { getAllServices } from '../services/SpaServices'
import {
    getAllTransactions,
    createdTransaction,
    deleteTransaction,
} from '../services/TransactionServices'

import { getAllAvailedServices } from '../services/AvailedServices'

import { MdDeleteForever } from 'react-icons/md'

import { getUsers } from '../services/Users' // Import any necessary services
import UserSelect from './UserSelect' // Import the UserSelect component

export default function NewTransaction() {
    const [transactions, setTransactions] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const [servicesDetails, setServicesDetails] = useState([
        {
            service_id: '',
            service_name: '',
            service_type: '',
        },
    ])
    // For populating dropdown list of therapist
    const [userDetails, setUserDetails] = useState([])
    const [selectedUserName, setSelectedUserName] = useState('')

    useEffect(() => {
        getUsers()
            .then((users) => {
                setUserDetails(users)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const [selectedServiceType, setSelectedServiceType] = useState('') // Add a new state variable to track the selected service type
    const [filteredServiceNames, setFilteredServiceNames] = useState([]) // Add a state variable to store the filtered service names
    const [selectedServiceName, setSelectedServiceName] = useState('')
    const [selectedServicePrice, setSelectedServicePrice] = useState(0)

    const [availedServices, setAvailedServices] = useState([])

    const [showTransactionCreateForm, setShowTransactionCreateForm] =
        useState(false) // This handles the selection of a transaction (1/6)
    const [showSelectedTransaction, setShowSelectedTransaction] =
        useState(false) // This handles the selection of a transaction (2/6)
    const [selectedTransaction, setSelectedTransaction] = useState(null) // This handles the selection of a transaction (3/6)

    const [showAddServices, setshowAddServices] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    // Confirmation dialog state
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [transactionToDelete, setTransactionToDelete] = useState(null)

    // Use useState to manage specificServices
    const [specificServices, setSpecificServices] = useState([])

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

    useEffect(() => {
        // Filter the service names based on the selected service type
        const filteredNames = specificServices.map(
            (service) => service.service_name
        )
        setFilteredServiceNames(filteredNames)
    }, [specificServices])

    useEffect(() => {
        loadTransactions()
        getAllTransactions()
            .then((res) => {
                setTransactions(res)
            })
            .catch((error) => {
                console.log('Error fetching transactions:', error)
            })
    }, [isDeleted])

    // Function to toggle the confirmation dialog
    const toggleDeleteConfirmation = (transaction) => {
        setTransactionToDelete(transaction)
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }

    // Function to handle delete confirmation
    const handleDeleteConfirmation = (transaction_id) => {
        // console.log(transaction_id)
        alert('Delete Confirmation')
        console.log('transactionToDelete:', transactionToDelete) // Add this line
        if (transactionToDelete) {
            // console.log('hello')
            deleteTransaction(transactionToDelete.transaction_id)
                .then((response) => {
                    console.log('Delete Transaction Response:', response)
                    setIsDeleted((prev) => !prev)
                    setShowSelectedTransaction(false)
                })
                .catch((error) => {
                    console.log('Delete Transaction Error:', error)
                })
        }
        setShowDeleteConfirmation(false)
    }

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

    const [serviceType, setServiceType] = useState('service_name')

    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0] // Formats as 'YYYY-MM-DD'

    //    TransactionAdd (1/3)
    const [transactionsInputs, setTransactionsInputs] = useState({
        transaction_id: '',
        voucher_number: 0,
        transaction_date: formattedDate,
        total_amount: 0,
        status: '',
        branch_code: '',
        customer_name: '',
    })

    const loadTransactions = async () => {
        const data = await getAllTransactions()
        setTransactions(data)
    }

    let uniqueServices = servicesDetails.filter(
        (service, index, self) =>
            index ===
            self.findIndex((s) => s.service_type === service.service_type)
    )

    const handleOnChange = (event) => {
        const { name, value } = event.target
        setServiceType(value)

        //    TransactionAdd (2/3)
        setTransactionsInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleOnCancelEdit = () => {
        setshowAddServices((prev) => !prev)
        setShowSelectedTransaction((prev) => !prev)
    }

    const handleOnCancelAdd = () => {
        setShowSelectedTransaction((prev) => !prev)
    }

    //    TransactionAdd (3/3)

    const handleOnSubmit = (e) => {
        e.preventDefault()

        // Prepare the data from form fields
        const formData = {
            transaction_id:
                document.querySelector('[name="transaction_id"]')?.value || '',
            voucher_number:
                document.querySelector('[name="voucher_number"]')?.value || '',
            transaction_date:
                document.querySelector('[name="transaction_date"]')?.value ||
                '',
            total_amount:
                document.querySelector('[name="total_amount"]')?.value || 0,
            status: document.querySelector('[name="status"]')?.value || '',
            branch_code:
                document.querySelector('[name="branch_code"]')?.value || '',
            customer_name:
                document.querySelector('[name="customer_name"]')?.value || '',
        }

        // Update transactionsInputs state
        setTransactionsInputs(formData)

        // Call createdTransaction function with the form data
        createdTransaction(formData)
            .then(() => getAllTransactions())
            .then((res) => {
                setTransactions(res)

                // Hide the form after successful creation
                setShowTransactionCreateForm(false)
            })
            .catch((error) => {
                console.log('Error creating or fetching discounts:', error)
                throw error
            })
    }

    // Data fetching
    useEffect(() => {
        getAllTransactions()
            .then((res) => {
                setTransactions(res)
            })
            .catch((error) => {
                console.log('Error fetching transactions:', error)
            })
    }, [])

    const handleShowButton = () => {
        setShowSelectedTransaction(false)
        setShowTransactionCreateForm((prev) => !prev)
    }

    const handleAddServices = () => {
        setshowAddServices((prev) => !prev)
    }

    // This handles the selection of a discount (5/6)
    const transaction_id_ur = useRef(null)
    const voucher_number_ur = useRef(null)
    const transaction_date_ur = useRef(null)
    const total_amount_ur = useRef(null)
    const status_ur = useRef(null)
    const branch_code_ur = useRef(null)
    const customer_name_ur = useRef(null)

    // This handles the selection of a discount (6/6)
    const handleSelectTransaction = (transaction) => {
        console.log('Selected Transaction:', transaction)

        if (transaction) {
            setSelectedTransaction(transaction)
            setTransactionToDelete(transaction) // Set transactionToDelete with the selected transaction data
            setShowSelectedTransaction(true)
        }

        // Make sure to check if the refs are defined before setting their values
        if (transaction_id_ur.current) {
            transaction_id_ur.current.value = transaction.transaction_id
        }
        if (voucher_number_ur.current) {
            voucher_number_ur.current.value = transaction.voucher_number
        }
        if (transaction_date_ur.current) {
            transaction_date_ur.current.value = transaction.transaction_date
        }
        if (total_amount_ur.current) {
            total_amount_ur.current.value = transaction.total_amount
        }
        if (status_ur.current) {
            status_ur.current.value = transaction.status
        }
        if (branch_code_ur.current) {
            branch_code_ur.current.value = transaction.branch_code
        }
        if (customer_name_ur.current) {
            customer_name_ur.current.value = transaction.customer_name
        }
    }

    const handleUserNameChange = (event) => {
        const userName = event.target.value
        setSelectedUserName(userName)
        console.log('Selected UserName:', userName)
    }

    // Display of availed services (5/6)
    const availed_service_id_ur = useRef(null)
    const user_id_ur = useRef(null)
    const service_id_ur = useRef(null)
    const discount_code_ur = useRef(null)

    // Display of availed services (6/6)
    const handleSelectAvailedServices = (aservices) => {
        console.log('Hello', aservices)
        // setShowDiscountCreateForm(false)
        // setSelectedDiscount(discount)
        // setShowSelectedDiscount(true)

        // Make sure to check if the refs are defined before setting their values
        if (availed_service_id_ur.current) {
            availed_service_id_ur.current.value = aservices.availed_service_id
        }

        if (user_id_ur.current) {
            user_id_ur.current.value = aservices.user_id
        }

        if (service_id_ur.current) {
            service_id_ur.current.value = aservices.service_id
        }

        if (discount_code_ur.current) {
            discount_code_ur.current.value = aservices.discount_code
        }
    }

    // Availed services Data fetching
    useEffect(() => {
        getAllAvailedServices()
            .then((res) => {
                console.log('Availed Services Data:', res)
                setAvailedServices(res)
            })
            .catch((error) => {
                console.log('Error fetching availed services:', error)
            })
    }, [])

    // Calculate the width for each column
    const columnWidth = 'calc(25rem / 3)' // This divides the available width by 3

    return (
        <>
            <div className="flex flex-col justify-around pt-16 ">
                <div className="flex flex-col items-center justify-start h-screen pt-16 ">
                    {transactions ? (
                        transactions.map((transaction, index) => (
                            <div
                                key={index}
                                className="flex flex-row w-[25rem]  border border-gray-500 p-2 mt-4  rounded"
                            >
                                {/* Transaction */}
                                <div
                                    onClick={() =>
                                        handleSelectTransaction(transaction)
                                    }
                                    className="flex flex-col p-2 text-black rounded"
                                >
                                    <div className="w-[21rem] ">
                                        <div className="flex">
                                            <div className="text-lg font-bold text-left">
                                                {transaction.customer_name}
                                            </div>
                                        </div>
                                        <div className="text-sm text-left text-gray-500">
                                            {transaction.voucher_number}
                                        </div>
                                        <div className="text-sm text-left">
                                            <span
                                                className={`${
                                                    transaction.status ===
                                                    'Booked'
                                                        ? 'text-gray-500'
                                                        : transaction.status ===
                                                          'Ongoing'
                                                        ? 'text-green-500'
                                                        : ''
                                                }`}
                                            >
                                                {transaction.status}
                                            </span>
                                        </div>
                                        <div className="font-bold text-right">
                                            {transaction.total_amount}
                                        </div>
                                    </div>
                                </div>
                                {/* End of Transaction */}

                                <div className="flex items-center justify-center w-1/12">
                                    <MdDeleteForever
                                        className="text-xl text-center text-orange-500"
                                        onClick={() =>
                                            handleDeleteConfirmation(
                                                transaction.transaction_id_ur
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                    {/* End of Transaction List */}

                    <div className="Frame164 px-2 py-1.5 opacity-80 justify-center items-start gap-2.5 inline-flex">
                        <div className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white bg-orange-400 border border-white rounded-full hover:bg-orange-600">
                            <button onClick={handleShowButton}>+</button>
                        </div>
                    </div>
                    {showTransactionCreateForm && (
                        <form
                            className="flex flex-col justify-around w-[25rem] p-6 m-4  text-white border border-gray-500 rounded form1 px-15 items-left h-9/12"
                            onSubmit={handleOnSubmit}
                        >
                            <div className="flex w-full">
                                <h1 className="mb-2 text-base font-bold text-left text-orange-600">
                                    New Transaction
                                </h1>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black ">
                                <label className="self-center ">Date:</label>
                                <div className="flex flex-col  w-[12rem]">
                                    <input
                                        className="p-1 text-black border border-gray-500 rounded "
                                        type="date"
                                        name="transaction_date"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Transaction ID:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        className="p-1 text-base text-black border border-gray-500 rounded"
                                        type="text"
                                        name="transaction_id"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Voucher No.:
                                </label>
                                <div className="flex flex-col border border-gray-500 rounded">
                                    <input
                                        className="p-1 text-black rounded "
                                        type="text"
                                        name="voucher_number"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">Branch:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="p-1 text-black border border-gray-500 rounded"
                                        type="text"
                                        name="branch_code"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black ">
                                <label className="self-center">
                                    Customer Name:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-full p-1 text-black bg-white border border-gray-500 rounded"
                                        type="text"
                                        name="customer_name"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">Status:</label>
                                <div className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg">
                                    <select
                                        className="p-1 text-black bg-white rounded"
                                        name="status"
                                    >
                                        <option value="Booked">Booked</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">
                                            Completed
                                        </option>
                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>
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
                    )}

                    {showSelectedTransaction && (
                        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                            <form className=" flex-col  bg-white w-[25rem] p-6 text-black rounded border border-gray-700  px-15 items-left h-9/12">
                                <div className="w-full space-y-2 ">
                                    <div className="flex flex-col justify-center text-lg font-bold text-center ">
                                        <input
                                            // ref={customer_name_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                            className="text-center text-black bg-white "
                                            type="text"
                                            name="customer_name"
                                            defaultValue={
                                                selectedTransaction
                                                    ? selectedTransaction.customer_name
                                                    : ''
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="w-full ">
                                    <div className="flex flex-col items-center ">
                                        <input
                                            // ref={transaction_id_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                            className="text-center text-black bg-white "
                                            type="text"
                                            name="transaction_id"
                                            defaultValue={
                                                selectedTransaction
                                                    ? selectedTransaction.transaction_id
                                                    : ''
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="font-bold text-center">
                                    10,000
                                </div>

                                <div className="flex justify-between w-full ">
                                    <div className="flex flex-col ">
                                        <input
                                            // ref={branch_code_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                            className="p-1 text-black bg-white rounded-xlarge"
                                            type="text"
                                            name="branch_code"
                                            defaultValue={
                                                selectedTransaction
                                                    ? selectedTransaction.branch_code
                                                    : ''
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="flex flex-col ">
                                        <select
                                            ref={status_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                            className="p-1 text-black rounded"
                                            name="status"
                                        >
                                            <option value="Booked">
                                                Booked
                                            </option>
                                            <option value="Ongoing">
                                                Ongoing
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                            <option value="Cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-center">
                                    ---------------------------
                                </div>

                                <div className="font-bold">
                                    Availed Services
                                </div>
                                <div className="availedlist flex flex-wrap w-[25rem] max-w-md bg-red-200">
                                    here
                                    {availedServices ? (
                                        availedServices.map(
                                            (aservices, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-[25rem] md:w-1/2 lg:w-1/3 p-2 md:w-${columnWidth} lg:w-${columnWidth} `}
                                                >
                                                    <div
                                                        onClick={() =>
                                                            handleSelectAvailedServices(
                                                                aservices
                                                            )
                                                        }
                                                        className="bg-white border border-gray-400 shadow-lg rounded p-4 cursor-pointer h-[10rem] overflow-y-auto flex flex-col justify-center items-center text-center"
                                                    >
                                                        <div className="text-sm font-bold">
                                                            Service ID:{' '}
                                                            {
                                                                aservices.availed_service_id
                                                            }
                                                        </div>
                                                        <div className="text-sm font-bold">
                                                            User ID:{' '}
                                                            {aservices.user_id}
                                                        </div>
                                                        <div className="text-sm font-bold">
                                                            Discount Code:{' '}
                                                            {
                                                                aservices.discount_code
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div>Loading...</div>
                                    )}
                                </div>

                                <div className="flex items-center justify-center w-full mt-2">
                                    <input
                                        className="w-[30rem] p-1 text-white bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500 hover:font-bold"
                                        onClick={handleAddServices}
                                        type="button"
                                        value="Add Services"
                                    />
                                </div>
                                <div className="flex items-center justify-center w-full mt-4">
                                    <input
                                        className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white hover:font-bold"
                                        type="button"
                                        onClick={handleOnCancelAdd}
                                        value="Cancel"
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                    {showAddServices && (
                        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                            <form
                                className="flex flex-col justify-around w-[25rem] p-6 m-4 bg-white text-white border border-gray-500 rounded form1 px-15 items-left h-9/12"
                                // onSubmit={handleOnSubmit}
                            >
                                <div className="flex w-full">
                                    <h1 className="mb-2 text-base font-bold text-left text-orange-600">
                                        Spa Services
                                    </h1>
                                </div>

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

                                <div className="relative flex justify-between space-y-2 text-black">
                                    <label className="self-center">
                                        Service:
                                    </label>
                                    <div className="flex flex-col w-[12rem]">
                                        <select
                                            className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg"
                                            name="service_name"
                                            value={selectedServiceName}
                                            onChange={(event) =>
                                                handleServiceNameChange(event)
                                            }
                                        >
                                            <option value="">
                                                Select a service
                                            </option>
                                            {filteredServiceNames.map(
                                                (serviceName) => (
                                                    <option
                                                        key={serviceName}
                                                        value={serviceName}
                                                    >
                                                        {serviceName}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-between space-y-2 text-black ">
                                    <label className="self-center">
                                        Price:
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg"
                                            type="text"
                                            name="price"
                                            value={selectedServicePrice}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between space-y-2 text-black ">
                                    <label className="self-center">
                                        Therapist:
                                    </label>
                                    <div className="flex flex-col ">
                                        {/* <select
                                            className="w-[12rem] p-1 text-black rounded"
                                            name="user_name"
                                        ></select> */}

                                        <div className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg">
                                            <UserSelect
                                                userDetails={userDetails}
                                                selectedUserName={
                                                    selectedUserName
                                                }
                                                setSelectedUserName={
                                                    setSelectedUserName
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-full mt-4">
                                    <input
                                        className="w-[30rem] p-1 text-white bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500 hover:font-bold"
                                        type="button"
                                        value="Add"
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
                            </form>
                        </div>
                    )}
                    {/* AVAILED SERVICES */}
                </div>
            </div>
        </>
    )
}
