import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import PrioInputFields from './PrioInputFields'
import BranchLists from './BranchLists'
import StatusLists from './StatusLists'
import ServiceCard from './ServiceCard'
import useTransactionFormStore from '../../data/Store'
import { createdTransaction } from '../../services/TransactionServices'

const NewTransaction = () => {
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
        // console.log("Combined Availed Services to the list: ", createTransactionInputField)
        callCreateTransactions(createTransactionInputField)

        // Clean up zustand
        setCreateTransactionInputField({})
        clearAvailedServicesArray([])
    }

    return (
        <div className="flex flex-col items-center justify-start pt-16 mt-[1rem] mb-[100px]">
            {isFormVisible && (
                <form
                    className="flex flex-col justify-around w-[25rem] p-6 m-4 text-white border border-gray-500 rounded form1 px-15 items-left h-9/12"
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
    )
}

export default NewTransaction
