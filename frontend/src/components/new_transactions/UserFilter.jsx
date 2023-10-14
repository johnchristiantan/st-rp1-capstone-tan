import React, { useState, useEffect } from 'react'
import UserAutocompleteInput from './UserAutocompleteInput'
import { getUsers } from '../../services/Users'

const UserFilter = ({ selectedTransaction, isEditMode }) => {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        // Fetch and update the 'users' state with the fetched data
        getUsers()
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.error('Error fetching users:', error)
            })
    }, [])

    return (
        <div>
            <UserAutocompleteInput
                users={users}
                isEditMode={isEditMode}
                selectedTransaction={selectedTransaction}
            />
        </div>
    )
}

export default UserFilter
