import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../services/Users'
import '../App.css'
import EditUser from './EditUser'
import { CreateUser } from './CreateUser'

export const ShowUsers = () => {
    const [userDetails, setUserDetails] = useState(false)

    useEffect(() => {
        getUsers()
            .then((users) => {
                setUserDetails(users)
                console.log(users)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleDelete = (user_id, user_name) => {
        const confirmed = window.confirm('Do you want to delete this user?')
        confirmed
            ? deleteUser(user_id)
                  .then(() => {
                      alert('Deleted User: ' + user_name)
                  })
                  .catch((error) => {
                      alert('Error: ', error)
                  })
            : alert('Cancelled')
    }

    return (
        <div className="flex items-center justify-center w-full h-screen overflow-x-auto ">
            <CreateUser />
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            User Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Password
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails ? (
                        userDetails.map((user, index) => {
                            return (
                                <tr
                                    className="bg-gray-800 border-gray-700"
                                    key={index}
                                >
                                    <td className="px-6 py-4">
                                        {user.user_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.password}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.user_type}
                                    </td>
                                    <td className="flex gap-5 px-6 py-4">
                                        <EditUser user={user} />
                                        <button
                                            className="hover:text-red-600"
                                            onClick={() =>
                                                handleDelete(
                                                    user.user_id,
                                                    user.user_name
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
