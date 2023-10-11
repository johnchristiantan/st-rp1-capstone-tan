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

import UserFilter from '../UserFilter'

import { useState, useEffect } from 'react'

const NewTransaction = () => {
    const [transactions, setTransactions] = useState([]) //DISPLAY

    const {
        availedServices,
        createTransactionInputField,
        setCreateTransactionInputField,
        availedServicesArray,
        clearAvailedServicesArray,
    } = useTransactionFormStore()

    const [isFormVisible, setIsFormVisible] = useState(true) // Initialize as visible
    console.log(isFormVisible)

    const handleClose = () => {
        // setIsFormVisible(false) // Hide the form
        setIsFormVisible((prev) => !prev)
    }

    const callCreateTransactions = async (data) => {
        try {
            const transactionCreated = await createdTransaction(data)
            console.log(transactionCreated)
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

        console.log('Submitted')
        console.log(
            'createTransactionInputField Upon Submit: ',
            createTransactionInputField
        )
        console.log('Availed Services Upon Submit: ', availedServices)
        console.log(
            'Availed Services Array Upon Submit: ',
            availedServicesArray
        )

        createTransactionInputField['availed_services'] = availedServicesArray

        // Add a final
        console.log(
            'Combined Availed Services to the list: ',
            createTransactionInputField
        )
        callCreateTransactions(createTransactionInputField)

        // Clean up zustand
        setCreateTransactionInputField({})
        clearAvailedServicesArray([])
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

    return (
        <>
            <div className="flex flex-col items-center pt-16 text-black ">
                {/* Display List */}
                {transactions ? (
                    transactions.map((transaction, index) => (
                        <div key={index} className={`w-[22rem]  pt-2  `}>
                            <div className="flex flex-col justify-center p-4 overflow-y-auto text-left transition-transform bg-white border rounded shadow-lg cursor-pointer transition-bg hover:scale-110 hover:shadow-md">
                                <div className="text-sm font-bold">
                                    Customer Name: {transaction.customer_id}
                                </div>
                                <div className="text-sm font-bold">
                                    Services:
                                </div>
                                <div className="text-sm font-bold">
                                    {transaction.status}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            {/* End of Display List */}

            <div className="flex flex-col  items-center justify-start pt-2 mt-[1rem] mb-[100px]">
                {isFormVisible && (
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
                                className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500"
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

export default NewTransaction
