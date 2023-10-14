import { useState, useEffect } from 'react'
import { statuses } from '../../data/FormData'
import useTransactionFormStore from '../../data/Store'

export default function BranchLists({ selectedTransaction, isEditMode }) {
    const [selectedStatus, setSelectedStatus] = useState('') // State to track the selected status
    const { createTransactionInputField, setCreateTransactionInputField } =
        useTransactionFormStore()

    const branchOptions = statuses.map((status) => (
        <option key={status.id} value={status.status}>
            {status.name}
        </option>
    ))

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setSelectedStatus(value)
        setCreateTransactionInputField(name, value)

        console.log(name, value)
        console.log(createTransactionInputField)
    }

    // console.log('status: ', selectedTransaction['status'])
    // if (selectedTransaction !== null) {
    //     const iStatus = selectedTransaction['status']
    //     selectedTransaction['status'] = iStatus
    // }
    // setSelectedStatus(selectedTransaction['status'])

    return (
        <div className="flex justify-between w-full space-y-2 text-black">
            <label className="self-center">Status:</label>
            <div className="flex flex-col w-[12rem]  rounded">
                <select
                    name="status" // Add the name attribute here
                    className="p-1 text-black bg-white border rounded"
                    value={
                        selectedTransaction ? selectedTransaction['status'] : selectedStatus
                    }
                    onChange={handleOnChange}
                    // defaultValue={selectedTransaction['status']}
                >
                    <option value="">Select a status</option>
                    {branchOptions}
                </select>
            </div>
        </div>
    )
}

// NOTES
// THIS IS USED TO POPULATE THE DROPDOWN LIST WITH NAME OF BRANCHES
