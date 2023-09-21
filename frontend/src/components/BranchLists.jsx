// BranchLists.jsx
import React, { useState, useEffect } from 'react'
import { getAllBranches } from '../services/BranchServices'

export default function BranchLists() {
    const [branches, setBranches] = useState([])
    const [selectedBranch, setSelectedBranch] = useState('') // State to track the selected branch

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

    // Create an array of option elements
    const branchOptions = branches.map((branch) => (
        <option key={branch.branch_code} value={branch.branch_code}>
            {branch.branch_name}
        </option>
    ))

    return (
        <select
            name="branch_code" // Add the name attribute here
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
        >
            <option value="">Select a branch</option>
            {branchOptions}
        </select>
    )
}

// NOTES
// THIS IS USED TO POPULATE THE DROPDOWN LIST WITH NAME OF BRANCHES
