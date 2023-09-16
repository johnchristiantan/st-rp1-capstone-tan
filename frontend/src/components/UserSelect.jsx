// UserSelect.jsx
import React from 'react'

const UserSelect = ({ userDetails, selectedUserName, setSelectedUserName }) => {
    // Filter the users whose user_type is "Therapist"
    const therapistUsers = userDetails.filter(
        (user) => user.user_type === 'Therapist'
    )

    return (
        <div>
            <select
                className="w-[12rem] p-1 text-black rounded"
                name="user_name"
                value={selectedUserName}
                onChange={(e) => setSelectedUserName(e.target.value)}
            >
                <option value="">Select a Therapist</option>
                {therapistUsers &&
                    therapistUsers.map((user, index) => (
                        <option key={index} value={user.user_name}>
                            {user.user_name}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default UserSelect

// TO TARGET LOCATION OF DROPDOWN LIST

// import React, { useState, useEffect } from 'react'
// import { getUsers } from '../services/Users' // Import any necessary services
// import UserSelect from './UserSelect' // Import the UserSelect component

// const [userDetails, setUserDetails] = useState([])
//     const [selectedUserName, setSelectedUserName] = useState('')

//     useEffect(() => {
//         getUsers()
//             .then((users) => {
//                 setUserDetails(users)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }, [])

//  Use the UserSelect component
{
    /* <div className="mb-4 bg-yellow-400">
<UserSelect
    userDetails={userDetails}
    selectedUserName={selectedUserName}
    setSelectedUserName={setSelectedUserName}
/>
</div> */
}
