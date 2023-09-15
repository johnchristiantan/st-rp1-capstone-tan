import React, { useEffect, useState, useRef } from 'react'
import { getAllServices } from '../services/SpaServices'
import {
    getAllTransactions,
    createdTransaction,
    deleteTransaction,
} from '../services/TransactionServices'

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
    const [showTransactionCreateForm, setShowTransactionCreateForm] =
        useState(false) // This handles the selection of a transaction (1/6)
    const [showSelectedTransaction, setShowSelectedTransaction] =
        useState(false) // This handles the selection of a transaction (2/6)
    const [selectedTransaction, setSelectedTransaction] = useState(null) // This handles the selection of a transaction (3/6)

    const [showAddServices, setshowAddServices] = useState(false)

    // Confirmation dialog state
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [transactionToDelete, setTransactionToDelete] = useState(null)

    // Function to toggle the confirmation dialog
    const toggleDeleteConfirmation = (transaction) => {
        setTransactionToDelete(transaction)
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }

    // Function to handle delete confirmation
    const handleDeleteConfirmation = (transaction_id) => {
        // console.log(transaction_id)
        console.log('transactionToDelete:', transactionToDelete) // Add this line
        if (transactionToDelete) {
            console.log('hello')
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
        loadTransactions()
        getAllTransactions()
            .then((res) => {
                setTransactions(res)
            })
            .catch((error) => {
                console.log('Error fetching transactions:', error)
            })
    }, [isDeleted])

    const loadTransactions = async () => {
        const data = await getAllTransactions()
        setTransactions(data)
    }

    // const handleDeleteClick = (transaction_id) => {
    //     // When the "x" button is clicked, set the transaction to delete
    //     console.log(transaction_id)
    //     setTransactionToDelete(transaction_id)

    //     // Show the delete confirmation dialog
    //     setShowDeleteConfirmation(true)
    // }
    // const handleDeleteConfirmation = () => {
    //     console.log(transactionToDelete)
    //     if (transactionToDelete) {
    //         deleteTransaction(transactionToDelete)
    //             .then(() => {
    //                 setIsDeleted((prev) => !prev)
    //                 setShowDeleteConfirmation(false)
    //                 setTransactionToDelete(null) // Clear the transaction to delete
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             })
    //     } else {
    //         // Handle the case where no transaction to delete is selected
    //         console.log('No transaction selected for deletion.')
    //     }
    // }

    let uniqueServices = servicesDetails.filter(
        (service, index, self) =>
            index ===
            self.findIndex((s) => s.service_type === service.service_type)
    )

    let specificServices = servicesDetails.filter(
        (service, index, self) => service.service_type === serviceType
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
        // console.log(transaction)
        console.log('Selected Transaction:', transaction)
        // setShowTransactionCreateForm(false)
        // setSelectedTransaction(transaction)
        // setShowSelectedTransaction(true)

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

                                <div className="flex items-start justify-center w-1/12 bg-gray-200 ">
                                    <button
                                        className="font-bold "
                                        onClick={() =>
                                            handleDeleteConfirmation(
                                                transaction.transaction_id
                                            )
                                        }
                                    >
                                        x
                                    </button>
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
                                    className="w-[30rem] p-1 bg-orange-600 rounded-lg hover:bg-orange-400"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                        </form>
                    )}

                    {showSelectedTransaction && (
                        <form className=" flex-col  w-[25rem] p-6 text-black rounded border border-gray-700  px-15 items-left h-9/12">
                            <div className="w-full space-y-2 ">
                                <div className="flex flex-col justify-center text-lg font-bold text-center ">
                                    <input
                                        ref={customer_name_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        className="text-center text-black bg-white "
                                        type="text"
                                        name="customer_name"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="w-full ">
                                <div className="flex flex-col items-center ">
                                    <input
                                        ref={transaction_id_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        className="text-center text-black bg-white "
                                        type="text"
                                        name="transaction_id"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="font-bold text-center">10,000</div>

                            <div className="flex justify-between w-full ">
                                <div className="flex flex-col ">
                                    <input
                                        ref={branch_code_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        className="p-1 text-black bg-white rounded-xlarge"
                                        type="text"
                                        name="branch_code"
                                        disabled
                                    />
                                </div>

                                <div className="flex flex-col ">
                                    <select
                                        ref={status_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        className="p-1 text-black rounded"
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
                            <div className="text-center">
                                ---------------------------
                            </div>

                            <div className="flex items-center justify-center w-full px-6 mt-2">
                                <input
                                    className="w-1/3 p-1 font-bold text-orange-500 rounded-full hover:bg-teal-600"
                                    type="button"
                                    value="Update"
                                />
                            </div>
                            <div className="font-bold">Availed Services</div>

                            <div className="flex items-center justify-center w-full mt-2">
                                <input
                                    className="w-[30rem] p-1 text-white bg-orange-500 rounded-lg hover:bg-orange-400"
                                    onClick={handleAddServices}
                                    type="button"
                                    value="Services"
                                />
                            </div>
                        </form>
                    )}
                    {showAddServices && (
                        <div>
                            <form
                                className="flex flex-col justify-around w-[25rem] p-6 m-4 bg-red-100 text-white border border-gray-500 rounded form1 px-15 items-left h-9/12"
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
                                <div className="relative flex justify-between space-y-2 text-black">
                                    <label className="self-center">
                                        Service:
                                    </label>
                                    <div className="flex flex-col w-[12rem]">
                                        <select
                                            className="w-[12rem] p-1 text-black rounded"
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
                                <div className="flex justify-between space-y-2 text-black ">
                                    <label className="self-center">
                                        Price:
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            className="w-[12rem] p-1 text-black rounded bg-white"
                                            type="text"
                                            name="price"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between space-y-2 text-black ">
                                    <label className="self-center">
                                        Therapist:
                                    </label>
                                    <div className="flex flex-col ">
                                        <select
                                            className="w-[12rem] p-1 text-black rounded"
                                            name="user_name"
                                        ></select>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-full mt-4">
                                    <input
                                        className="w-[30rem] p-1 bg-orange-500 rounded-lg hover:bg-orange-400"
                                        type="button"
                                        value="Add"
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
