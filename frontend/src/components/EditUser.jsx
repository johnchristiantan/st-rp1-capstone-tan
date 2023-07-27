import React, { useState } from 'react'
import { editUser } from '../services/Users'

const EditUser = ({ user }) => {
    // console.log('Galing sa Show Users', user)
    // console.log('Username: ', user.user['user_name'])
    const initial_users_data = {
        // user_id: user.user['user_id'] || '',
        user_name: user['user_name'] || '',
        password: user['password'] || '',
        user_type: user['user_type'] || '',
    }
    const [showModal, setShowModal] = useState(false)
    const [userUpdatedData, setUserUpdatedData] = useState(initial_users_data)
    //HANDLES THE UPDATE
    const handleSubmit = (e) => {
        e.preventDefault()
        userUpdatedData.user_id = user['user_id']
        editUser(userUpdatedData)
            .then(() => toggleModal())
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
                        <div className="text-black rounded-lg bg-slate-900">
                            <div className="p-4">
                                <h2 className="mb-4 text-lg font-bold text-white">
                                    Edit User Information
                                </h2>
                                <form onSubmit={handleSubmit} className="">
                                    <div className="flex mb-4">
                                        <div className="w-1/2">
                                            <label className="mr-2 text-white">
                                                User Name
                                            </label>
                                        </div>
                                        <input
                                            className="h-5 rounded-md grow"
                                            defaultValue={user['user_name']}
                                            onChange={handleOnChange}
                                            name="user_name"
                                        />
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="w-1/2">
                                            <label className="mr-2 text-white">
                                                Password
                                            </label>
                                        </div>
                                        <input
                                            type="password"
                                            className="h-5 rounded-md grow"
                                            defaultValue={user.user['password']}
                                            onChange={handleOnChange}
                                            name="password"
                                        />
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="w-1/2">
                                            <label className="mr-2 text-white">
                                                User Type
                                            </label>
                                        </div>
                                        <input
                                            className="h-5 rounded-md grow"
                                            defaultValue={user['user_type']}
                                            onChange={handleOnChange}
                                            name="user_type"
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-orange-600">
                                            Update
                                        </button>
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
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
