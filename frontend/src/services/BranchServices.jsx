import axios from 'axios'
const baseURL = 'http://localhost:8000/branches'

export async function getAllBranches() {
    try {
        const branches = await axios.get(baseURL)
        return branches.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

export async function createdBranch(branch_input) {
    try {
        const createdBranch = await axios.post(baseURL, branch_input)
        return createdBranch.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

export async function editBranch(branch_input) {
    try {
        const editBranch = await axios.put(
            `${baseURL}/${branch_input.branch_code}`,
            branch_input
        )
        return editBranch.data
    } catch (error) {
        console.log('Error: ', error)
    }
}

export async function deleteBranch(branch_code) {
    try {
        const deleteBranch = await axios.delete(`${baseURL}/${branch_code}`)
        return deleteBranch.data
    } catch (error) {
        console.log('Error: ', error)
    }
}
