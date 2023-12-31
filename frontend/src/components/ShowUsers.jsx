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
            <div className="flex-col  flex items-center justify-center ">
                <div className="flex items-center justify-center mt-20 p-4 ">
                    {alertCreatedMessage && (
                        <div className="flex flex-row items-center justify-between p-2 text-xs text-left bg-green-100 rounded-lg">
                            <span className="font-semibold text-green-900">
                                {/* {alertCreatedMessage} */}
                                Created Successfully
                            </span>
                            <button
                                type="button"
                                onClick={handleCreatedAlertClose}
                            >
                                X
                            </button>
                        </div>
                    )}

                    {alertEditedMessage && (
                        <div className="flex flex-row items-center justify-between w-[25rem]  text-s text-left bg-green-100 rounded-lg">
                            <span className="font-semibold text-green-900">
                                {/* {alertEditedMessage} */}
                                Edited Successfully
                            </span>
                            <button
                                type="button"
                                onClick={handleEditAlertClose}
                            >
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
                            <button
                                type="button"
                                onClick={handleDeleteAlertClose}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-[25rem] max-w-md ">
                    {/* User List */}
                    {userDetails ? (
                        userDetails.map((user, index) => (
                            <div
                                key={index}
                                className={`w-[25rem] p-1 flex flex-col items-center `}
                            >
                                <div
                                    // onClick={() => handleSelectDiscount(discount)}
                                    className=" w-[25rem] bg-white border border-gray-400  rounded  cursor-pointer h-[5rem]  flex flex-col justify-center  text-left p-2"
                                >
                                    <div className="text-lg font-bold">
                                        {user.last_name} {user.first_name}
                                    </div>
                                    <div className="text-black text-base">
                                        {user.user_type}
                                    </div>
                                    <div className="flex flex-row text-sm text-gray-500 ">
                                        <div className="">
                                            <EditUser
                                                user={user}
                                                handleEditAlertClose={
                                                    handleEditAlertClose
                                                }
                                            />
                                        </div>
                                        <div className="ml-2 mr-2 text-sm text-gray-500">
                                            {' '}
                                            |{' '}
                                        </div>
                                        <div className="">
                                            <button
                                                className="hover:text-red-600 text-sm text-gray-500"
                                                onClick={() =>
                                                    handleDelete(
                                                        user.user_id,
                                                        user.user_name
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}

                    {/* End of User List */}
                </div>
            </div>

            <CreateUser handleCreatedAlertClose={handleCreatedAlertClose} />
        </>
    )
}
