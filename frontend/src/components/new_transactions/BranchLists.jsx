import { useState, useEffect } from 'react'
import { getAllBranches } from '../../services/BranchServices'
import useTransactionFormStore from '../../data/Store'

export default function BranchLists({ selectedTransaction, isEditMode }) {
    const [branches, setBranches] = useState([])
    const [selectedBranch, setSelectedBranch] = useState('') // State to track the selected branch
    const { createTransactionInputField, setCreateTransactionInputField } =
        useTransactionFormStore()

    // console.log('jc', selectedTransaction)
    // console.log('mode', isEditMode)

    useEffect(() => {
        async function fetchBranches() {
            try {
                const fetchedBranches = await getAllBranches()
                setBranches(fetchedBranches)
            } catch (error) {
                console.log('Error fetching branches: ', error)
            }
        }

        fetchBranches()
    }, [])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setSelectedBranch(value)
        setCreateTransactionInputField(name, value)

        console.log(name, value)
        console.log(createTransactionInputField)
    }

    // Create an array of option elements
    const branchOptions = branches.map((branch) => (
        <option key={branch.branch_id} value={branch.branch_id}>
            {branch.branch_name}
        </option>
    ))

    // console.log('transaction in branch', selectedTransaction)
    // console.log('branch', selectedTransaction.branch_id)
    // console.log('jjj', selectedTransaction['branch_id'])

    // if (selectedTransaction !== null) {
    //     //     selectedTransaction['transaction_date'] = selectedTransaction.branch_id
    // }

    return (
        <div className="flex justify-between w-full text-black">
            <label className="self-center">Branch:</label>
            <div className="flex flex-col w-[12rem]   rounded">
                <select
                    name="branch_id" // Add the name attribute here
                    className="p-1 text-black bg-white border rounded"
                    value={selectedBranch}
                    onChange={handleOnChange}
                    // defaultValue={selectedTransaction['branch_id']}
                >
                    <option value="">Select a branch</option>
                    {branchOptions}
                </select>
            </div>
        </div>
    )
}

// NOTES
// THIS IS USED TO POPULATE THE DROPDOWN LIST WITH NAME OF BRANCHES
