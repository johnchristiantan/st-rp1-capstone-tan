import React, { useState, useEffect } from 'react'
import UserAutocompleteInput from './UserAutocompleteInput'
import { getUsers } from '../services/Users'

const UserFilter = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        // Fetch user data from your API here using getUsers()
        // Update the 'users' state with the fetched data
        getUsers()
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.error('Error fetching users:', error)
            })
    }, [])

    const handleUserSelect = (selectedOption) => {
        setSelectedUser(selectedOption)
    }

    return (
        <div>
            <UserAutocompleteInput users={users} onChange={handleUserSelect} />
            {/* Display selected user details */}
            {selectedUser && (
                <div className="text-black">
                    {/* <p>ID: {selectedUser.value}</p> */}
                    {/* <p>Name: {selectedUser.label}</p> */}
                </div>
            )}
            {/* Add more filtering or user details display logic as needed */}
        </div>
    )
}

export default UserFilter
