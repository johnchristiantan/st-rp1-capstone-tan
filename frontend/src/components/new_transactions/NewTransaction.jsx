import { RxCross2 } from 'react-icons/rx'
import PrioInputFields from './PrioInputFields'
import BranchLists from './BranchLists'
import StatusLists from './StatusLists'
import ServiceCard from './ServiceCard'
import useTransactionFormStore from '../../data/Store'
import {
    createdTransaction,
    getAllTransactions,
} from '../../services/TransactionServices'
import { getUsers } from '../../services/Users'
import UserFilter from './UserFilter'
import { useState, useEffect, useRef } from 'react'
import Nav from '../../common/Nav'
import { removeTimeStamp } from '../../utils/DateFormatter'
// import Select from 'react-select'

const NewTransaction = ({ setJwt }) => {
    const [transactions, setTransactions] = useState([])
    const [isMounted, setIsMounted] = useState(true)
    const [selectedStatus, setSelectedStatus] = useState('All') // Default to 'All' to show all transactions initially
    // const [selectedUser, setSelectedUser] = useState(null) // Define and initialize selectedUser state

    const {
        availedServices,
        createTransactionInputField,
        setCreateTransactionInputField,
        availedServicesArray,
        clearAvailedServicesArray,
    } = useTransactionFormStore()

    const [users, setUsers] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isSelectedFormVisible, setIsSelectedFormVisible] = useState(false)

    const toggleFormVisibility = () => {
        setIsFormVisible((prev) => !prev) // Toggle between true and false
    }

    // const toggleSelectedFormVisibility = () => {
    //     // setIsSelectedFormVisible((prev) => !prev) // Toggle between true and false
    //     setIsSelectedFormVisible(true)
    // }

    const [selectedTransaction, setSelectedTransaction] = useState(null)

    const getStatusBackgroundColorClass = (status) => {
        switch (status) {
            case 'booked':
                return 'bg-yellow-400' // Set the background color class for Booked
            case 'ongoing':
                return 'bg-green-400' // Set the background color class for Ongoing
            case 'cancelled':
                return 'bg-red-400' // Set the background color class for Cancelled
            case 'completed':
                return 'bg-gray-400' // Set the background color class for Completed
            default:
                return 'bg-gray-100' // Default background color for other statuses
        }
    }

    const handleClose = () => {
        setIsFormVisible((prev) => !prev)
    }
    const handleUpdateClose = () => {
        setIsSelectedFormVisible((prev) => !prev)
    }

    const callCreateTransactions = async (data) => {
        try {
            const transactionCreated = await createdTransaction(data)
            // console.log(transactionCreated)

            getAllTransactions()
                .then((res) => {
                    setTransactions(res)
                })
                .catch((error) => {
                    console.log('Error fetching transactions:', error)
                })
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (!createTransactionInputField) {
            return alert('Please provide transaction details to proceed!')
        }

        if (availedServicesArray.length === 0) {
            return alert('Please provide availed service to a transaction!')
        }

        createTransactionInputField['availed_services'] = availedServicesArray

        callCreateTransactions(createTransactionInputField)

        setCreateTransactionInputField({})
        clearAvailedServicesArray([])
        setIsFormVisible(false)
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

    // hiding + button
    useEffect(() => {
        return () => {
            setIsMounted(false) // Set isMounted to false when the component unmounts
        }
    }, [])

    const filteredTransactions =
        selectedStatus === 'All'
            ? transactions
            : transactions.filter(
                  (transaction) => transaction.status === selectedStatus
              )

    // Define a function to map customer_id to first_name and last_name

    const mapCustomerIdToName = (customer_id, users) => {
        if (!users || users.length === 0) {
            return 'Data not available'
        }

        const user = users.find(
            (user) => user.user_id.toString() === customer_id.toString()
        )

        if (user) {
            return `${user.first_name} ${user.last_name}`
        }

        return 'Unknown'
    }

    useEffect(() => {
        // Fetch user data when the component mounts
        getUsers()
            .then((res) => {
                setUsers(res)
                // console.log(res)
            })
            .catch((error) => {
                console.log('Error fetching users:', error)
            })
    }, [])

    // Add state variables for other input fields as needed

    const transaction_id_ur = useRef(null)
    const transaction_date_ur = useRef(null)
    const voucher_number_ur = useRef(null)
    const customer_id_ur = useRef(null)
    const branch_id_ur = useRef(null)
    const status_ur = useRef(null)

    // const total_discounted_amount_ur = useRef(null)
    // const tip_ur = useRef(null)
    // const total_commission_ur = useRef(null)

    const handleSelectTransaction = (transaction) => {
        // setIsFormVisible(false)
        // setSelectedBranch(branch)
        // setShowSelectedBranch(true)
        // console.log("Transaction:    ", transaction)

        setIsSelectedFormVisible(true)
        setIsEditMode(true)
        setSelectedTransaction(transaction)
        // setFormattedDate(transaction)

        console.log('trans', transaction)

        if (transaction_id_ur.current) {
            transaction_id_ur.current.value = transaction.transaction_id
        }
        if (transaction_date_ur.current) {
            transaction_date_ur.current.value = transaction.transaction_date
        }
        if (voucher_number_ur.current) {
            voucher_number_ur.current.value = transaction.voucher_number
        }
        if (customer_id_ur.current) {
            customer_id_ur.current.value = transaction.customer_id
        }
        if (branch_id_ur.current) {
            branch_id_ur.current.value = transaction.branch_id
        }
        if (status_ur.current) {
            status_ur.current.value = transaction.status
        }
    }

    if (selectedTransaction !== null) {
        console.log('selectedTransaction: ', selectedTransaction)
        selectedTransaction['transaction_date'] = removeTimeStamp(
            selectedTransaction['transaction_date']
        )
    }

    return (
        <>
            <Nav setJwt={setJwt} />
            <div className="flex flex-col items-center justify-start pt-2 mt-20 mb-4 ">
                {isSelectedFormVisible && (
                    <form className="flex flex-col justify-around w-[22rem] bg-white p-6 m-4 text-white border rounded form1 px-15 items-left h-9/12">
                        <div className="flex w-full">
                            <h1 className="flex justify-between w-full mb-2 text-base font-bold text-left text-orange-600">
                                <span>{isEditMode ? 'Update' : 'Create'}</span>
                                <button
                                    type="button"
                                    onClick={handleUpdateClose}
                                >
                                    <RxCross2 size={20} />
                                </button>
                            </h1>
                        </div>

                        {/* <PrioInputFields
                        selectedTransaction={selectedTransaction}
                        isEditMode={isEditMode}
                    /> */}
                        <div className="flex justify-between w-full space-y-2 text-black">
                            <label className="self-center">Date:</label>
                            <div className="flex flex-col  w-[12rem]">
                                <input
                                    className="p-1 text-black border rounded"
                                    type="date"
                                    name="transaction_date"
                                    // onChange={handleOnChange}

                                    defaultValue={
                                        selectedTransaction
                                            ? selectedTransaction.transaction_date
                                            : ''
                                    }
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2 text-black">
                            <label className="self-center">Voucher No.:</label>
                            <div className="flex flex-col border rounded">
                                <input
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="voucher_number"
                                    // onChange={handleOnChange}

                                    defaultValue={
                                        selectedTransaction
                                            ? selectedTransaction.voucher_number
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        {/* ERROR HERE */}
                        {/* <UserFilter
                        selectedTransaction={selectedTransaction}
                        isEditMode={isEditMode}
                    /> */}

                        {/* WIP: NOT WORKING */}
                        {/* <div className="flex justify-between w-full text-black">
                        <label className="self-center">Customer:</label>
                        <div className="mt-2 w-[12rem] mb-2">
                            <Select
                                value={selectedUser} // Store the selected user's ID in the state
                                options={users.map((user) => ({
                                    label: mapCustomerIdToName(
                                        user.customer_id,
                                        users
                                    ),
                                    value: user.customer_id,
                                }))}
                                onChange={(selectedOption) =>
                                    setSelectedUser(selectedOption.value)
                                }
                            />
                        </div>
                    </div> */}

                        {/* <BranchLists
                        selectedTransaction={selectedTransaction}
                        isEditMode={isEditMode}
                    /> */}

                        {/* <StatusLists
                        selectedTransaction={selectedTransaction}
                        isEditMode={isEditMode}
                    /> */}
                        <div className="flex justify-between w-full space-y-2 text-black">
                            <label className="self-center">Status:</label>
                            <div className="flex flex-col w-[12rem]  rounded">
                                <select
                                    name="status" // Add the name attribute here
                                    className="p-1 text-black bg-white border rounded"
                                    value={
                                        selectedTransaction
                                            ? selectedTransaction['status']
                                            : selectedStatus
                                    }
                                    // onChange={handleOnChange}
                                >
                                    <option value="All">All</option>
                                    <option value="booked">Booked</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full mt-4">
                            <input
                                className="w-[30rem] p-1 bg-orange-400 rounded-lg hover-bg-orange-500 border-orange-400 border-2 hover-border-orange-500"
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                )}
            </div>

            <div className="flex items-center justify-center m-2 ">
                {/* <div className="transition-transform transition-bg hover:scale-110 relative flex items-center justify-center text-xl font-bold text-white bg-orange-400 border border-white rounded-full w-[3rem] h-[3rem] overflow-hidden group">
                    <button
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
                        onClick={toggleFormVisibility}
                    >
                        +
                    </button>
                </div> */}

                <div
                    className="absolute transform -translate-x-1/2 +addbutton bottom-10 left-1/2"
                    style={{ zIndex: 9999 }}
                >
                    <button
                        className="flex items-center justify-center text-xl font-bold text-white bg-orange-400 border border-white rounded-full w-[3rem] h-[3rem]  hover:bg-orange-600 transition-transform transition-bg hover:scale-110 hover:shadow-md hover:text-white hover:border-orange-600"
                        onClick={toggleFormVisibility}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-start pt-2 my-2">
                {isFormVisible && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                        <form
                            className="flex flex-col justify-around w-[22rem] bg-white p-6 m-4 text-white border rounded form1 px-15 items-left h-9/12"
                            onSubmit={handleOnSubmit}
                        >
                            <div className="flex w-full">
                                <h1 className="flex justify-between w-full mb-2 text-base font-bold text-left text-orange-600">
                                    <span>New Transaction</span>
                                    <button type="button" onClick={handleClose}>
                                        <RxCross2 size={20} />
                                    </button>
                                </h1>
                            </div>
                            <PrioInputFields />
                            <UserFilter />
                            <BranchLists />
                            <StatusLists />
                            <ServiceCard />
                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 bg-orange-400 rounded-lg hover-bg-orange-500 border-orange-400 border-2 hover-border-orange-500"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center pt-2 text-black ">
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="mt-4 p-2 bg-orange-100 rounded w-[22rem] "
                >
                    <option value="All">All</option>
                    <option value="booked">Booked</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
                {filteredTransactions ? (
                    filteredTransactions.map((transaction, index) => (
                        <div key={index} className={`w-[22rem] pt-2 `}>
                            <div
                                onClick={() =>
                                    handleSelectTransaction(transaction)
                                }
                                className="flex justify-between p-2 overflow-y-auto text-left transition-transform bg-white border-b cursor-pointer "
                            >
                                <div className="flex items-center ">
                                    <div>
                                        <div>
                                            {transaction.transaction_id}:{' '}
                                            {mapCustomerIdToName(
                                                transaction.customer_id,
                                                users
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    {' '}
                                    {/* Use flex to center both vertically and horizontally */}
                                    <div
                                        className={`rounded-full w-5 h-5 ${getStatusBackgroundColorClass(
                                            transaction.status
                                        )}`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )
}

export default NewTransaction
