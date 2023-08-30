import { useState } from 'react'
import { createdBranch, getAllBranches } from '../services/BranchServices'

export function BranchesAdd() {
    const [branchesInputs, setBranchesInputs] = useState({
        branch_code: '',
        branch_name: '',
        percent_share: null,
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setBranchesInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleOnSubmit = () => {
        return createdBranch(branchesInputs)
            .then(() => getAllBranches())
            .catch((error) => {
                console.log('Error creating or fetching branches:', error)
                throw error // Rethrow the error to handle it in the main component if needed
            })
    }

    return {
        branchesInputs,
        handleOnChange,
        handleOnSubmit,
    }
}
