import React, { useState } from 'react'
import { editUser } from '../services/Users'

const EditUser = ({ user, handleEditAlertClose }) => {
    const initial_users_data = {
        // user_id: user.user['user_id'] || '',
        user_name: user['user_name'] || '',
        password: user['password'] || '',
        first_name: user['first_name'] || '',
        last_name: user['last_name'] || '',
        user_type: user['user_type'] || '',
    }
    const [showModal, setShowModal] = useState(false)
    const [userUpdatedData, setUserUpdatedData] = useState(initial_users_data)
    //HANDLES THE UPDATE
    const handleSubmit = (e) => {
        e.preventDefault()
        userUpdatedData.user_id = user['user_id']
        editUser(userUpdatedData)
            .then(() => {
                handleEditAlertClose()
                toggleModal()
            })
            .catch((error) => {
                console.log(error.message)
            })
        // console.log('Updated Object: ', userUpdatedData)
        // Database Connection
    }

    // SWITCH MODAL (edit)
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setUserUpdatedData((prev) => {
            return { ...prev, [name]: value }
        })
        // console.log(name, value)
    }

    return (
        <>
            <button className="hover:text-green-600" onClick={toggleModal}>
                Edit
            </button>

            {showModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="flex flex-col justify-around w-[25rem] p-6 text-white border-2 border-gray-500   bg-white rounded-lg px-15 items-left h-9/12">
                            <div className="p-4">
                                <h2 className="mb-4 text-lg font-bold text-orange-500 ">
                                    Edit User Information
                                </h2>
                                <form onSubmit={handleSubmit} className="">
                                    <div className="flex mb-4">
                                        <div className="w-1/2">
                                            <label className="mr-2 text-black">
                                                User Name
                                            </label>
                                        </div>
                                        <input
                                            className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                            defaultValue={user['user_name']}
                                            onChange={handleOnChange}
                                            name="user_name"
                                        />
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="w-1/2">
                                            <label className="mr-2 text-black">
                                                Password
                                            </label>
                                        </div>
                                        <input
                                            type="password"
                                            className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                            defaultValue={user['password']}
                                            onChange={handleOnChange}
                                            name="password"
                                        />
                                    </div>

                                    <div className="flex mb-4">
                                        <div className="w-1/2">
                                            <label className="mr-2 text-black">
                                                First Name
                                            </label>
                                        </div>
                                        <input
                                            className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                            defaultValue={user['first_name']}
                                            onChange={handleOnChange}
                                            name="first_name"
                                        />
                                    </div>

                                    <div className="flex mb-4">
                                        <div className="w-1/2">
                                            <label className="mr-2 text-black">
                                                Last Name
                                            </label>
                                        </div>
                                        <input
                                            className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                            defaultValue={user['last_name']}
                                            onChange={handleOnChange}
                                            name="last_name"
                                        />
                                    </div>

                                    <div className="flex mb-4">
                                        <div className="w-1/2">
                                            <label className="mr-2 text-black">
                                                User Type
                                            </label>
                                        </div>
                                        <input
                                            className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                            defaultValue={user['user_type']}
                                            onChange={handleOnChange}
                                            name="user_type"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between w-full mt-4 ">
                                        <button className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500">
                                            Update
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between w-full mt-4 ">
                                        <button
                                            className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                            onClick={toggleModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditUser
