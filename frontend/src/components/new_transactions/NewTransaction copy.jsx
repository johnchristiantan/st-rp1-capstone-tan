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

import UserFilter from '../UserFilter'

import { useState, useEffect } from 'react'

const NewTransaction = () => {
    const [transactions, setTransactions] = useState([])

    const [selectedStatus, setSelectedStatus] = useState('All') // Default to 'All' to show all transactions initially

    const {
        availedServices,
        createTransactionInputField,
        setCreateTransactionInputField,
        availedServicesArray,
        clearAvailedServicesArray,
    } = useTransactionFormStore()

    const [users, setUsers] = useState([])
    const [lastNames, setLastNames] = useState([])
    const targetUserId = '2' // Replace with the user_id you want to find

    const [isFormVisible, setIsFormVisible] = useState(false)

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible) // Toggle between true and false
    }

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

    const callCreateTransactions = async (data) => {
        try {
            const transactionCreated = await createdTransaction(data)
            console.log(transactionCreated)

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

    const filteredTransactions =
        selectedStatus === 'All'
            ? transactions
            : transactions.filter(
                  (transaction) => transaction.status === selectedStatus
              )

    // Define a function to map customer_id to first_name and last_name

    //   const mapCustomerIdToName = (customer_id, users) => {
    //     console.log(users)
    //     if (!users || users.length === 0) {
    //         // console.warn('No users data available.')
    //         return 'Data not available'
    //     }

    //     const user = users.find((user) => user.user_id === customer_id)
    //     if (user) {
    //         return `${user.first_name} ${user.last_name}`
    //     }

    //     // console.warn(`No user found for customer_id: ${customer_id}`)
    //     return 'Unknown'
    // }

    useEffect(() => {
        // Fetch user data when the component mounts
        getUsers()
            .then((res) => {
                setUsers(res)
                console.log(res)

                // Find the user with the target user_id
                const targetUser = res.find(
                    (user) => user.user_id === targetUserId
                )

                if (targetUser) {
                    // Store the last_name in the state
                    setLastNames({ [targetUserId]: targetUser.last_name })
                }
            })
            .catch((error) => {
                console.log('Error fetching users:', error)
            })
    }, [targetUserId]) // Include targetUserId in the dependency array if it can change

    const mapCustomerIdToName = (customer_id) => {
        if (!users || users.length === 0) {
            return 'Data not available'
        }

        const user = users.find(
            (user) => user.user_id.toString() === customer_id
        )

        if (user) {
            return `${user.first_name} ${user.last_name}`
        }

        return 'Unknown'
    }

    return (
        <>
            <div className=" flex flex-col items-center pt-16 text-black ">
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="mt-4 p-2  rounded w-[22rem] "
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
                            <div className=" flex justify-between bg-white p-2 overflow-y-auto text-left transition-transform border-b cursor-pointer">
                                <div className="flex items-center ">
                                    <div>
                                        <div>
                                            {transaction.customer_id}:{' '}
                                            {mapCustomerIdToName(
                                                transaction.customer_id,
                                                users
                                            )}
                                        </div>

                                        <div>
                                            Last Name for User ID{' '}
                                            {transaction.customer_id}:{' '}
                                            {lastNames[
                                                transaction.customer_id
                                            ] || 'Not found'}
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

            <div className="bg-red-300"></div>

            <div className=" flex items-center justify-center m-4 ">
                <div className="transition-transform transition-bg hover:scale-110 relative flex items-center justify-center text-xl font-bold text-white bg-orange-400 border border-white rounded-full w-[3rem] h-[3rem] overflow-hidden group">
                    <button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                        onClick={toggleFormVisibility}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="  flex flex-col items-center justify-start pt-2 mt-[1rem] mb-[100px]">
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
        </>
    )
}

export default NewTransaction
