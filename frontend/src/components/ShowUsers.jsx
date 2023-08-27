import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../services/Users'
import '../App.css'
import EditUser from './EditUser'
import { CreateUser } from './CreateUser'

export const ShowUsers = () => {
    const [userDetails, setUserDetails] = useState(false)
    const [alertEditedMessage, setalertEditedMessage] = useState(false) //TOASTMESSAGE
    const [alertDeletedMessage, setalertDeletedMessage] = useState(false) //TOASTMESSAGE
    const [alertCreatedMessage, setalertCreatedMessage] = useState(false) //TOASTMESSAGE

    useEffect(() => {
        getUsers()
            .then((users) => {
                setUserDetails(users)
                console.log(users)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [alertDeletedMessage, alertCreatedMessage, alertEditedMessage]) //REFRESH TABLE

    const handleDelete = (user_id, user_name) => {
        const confirmed = window.confirm('Do you want to delete this user?')
        confirmed
            ? deleteUser(user_id)
                  .then(() => {
                      handleDeleteAlertClose()
                  })
                  .catch((error) => {
                      alert('Error: ', error)
                  })
            : alert('Cancelled')
    }

    const handleEditAlertClose = () => {
        setalertEditedMessage((prev) => !prev)
    }

    const handleDeleteAlertClose = () => {
        setalertDeletedMessage((prev) => !prev)
    }

    const handleCreatedAlertClose = () => {
        setalertCreatedMessage((prev) => !prev)
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen gap-4 mt-32 overflow-x-auto overflow-y-scroll">
                {alertCreatedMessage && (
                    <div className="flex flex-row items-center justify-between p-2 text-xs text-left bg-green-100 rounded-lg">
                        <span className="font-semibold text-green-900">
                            {/* {alertCreatedMessage} */}
                            Created Successfully
                        </span>
                        <button type="button" onClick={handleCreatedAlertClose}>
                            X
                        </button>
                    </div>
                )}

                {alertEditedMessage && (
                    <div className="flex flex-row items-center justify-between p-2 text-xs text-left bg-green-100 rounded-lg">
                        <span className="font-semibold text-green-900">
                            {/* {alertEditedMessage} */}
                            Edited Successfully
                        </span>
                        <button type="button" onClick={handleEditAlertClose}>
                            X
                        </button>
                    </div>
                )}
                {alertDeletedMessage && (
                    <div className="flex flex-row items-center justify-between p-2 text-xs text-left bg-green-100 rounded-lg">
                        <span className="font-semibold text-green-900">
                            {/* {alertDeletedMessage} */}
                            Deleted Successfully
                        </span>
                        <button type="button" onClick={handleDeleteAlertClose}>
                            X
                        </button>
                    </div>
                )}

                <CreateUser handleCreatedAlertClose={handleCreatedAlertClose} />
                {/* w-5/6 text-sm text-left text-gray-400" */}
                <table className="w-5/6 text-sm text-left text-gray-400">
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
                                            <EditUser
                                                user={user}
                                                handleEditAlertClose={
                                                    handleEditAlertClose
                                                }
                                            />
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
        </>
    )
}
