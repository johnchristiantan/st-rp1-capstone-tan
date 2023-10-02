import { useState, useEffect } from 'react'
import { getAllBranches } from '../../services/BranchServices'
import useTransactionFormStore from '../../data/Store'

export default function BranchLists() {
    const [branches, setBranches] = useState([])
    const [selectedBranch, setSelectedBranch] = useState('') // State to track the selected branch
    const { createTransactionInputField, setCreateTransactionInputField } =
        useTransactionFormStore()

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

    return (
        <div className="flex justify-between w-full space-y-2 text-black">
            <label className="self-center">Branch:</label>
            <div className="flex flex-col w-[12rem]  border-gray-500 rounded-lg">
                <select
                    name="branch_id" // Add the name attribute here
                    className="p-1 text-black bg-white border border-gray-500 rounded"
                    value={selectedBranch}
                    onChange={handleOnChange}
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
