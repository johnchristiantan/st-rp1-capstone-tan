import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

let url = import.meta.env.VITE_SERVER

const LoginForm = () => {
    const [loginDetail, setLoginDetail] = useState({})
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setLoginDetail((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        // console.log(loginDetail)
        try {
            const response = await axios.post(
                'http://localhost:8000/login',
                loginDetail
            )
            if (response.data.length > 0) {
                localStorage.setItem(
                    'loginDetail',
                    JSON.stringify(response.data[0])
                )
                navigate('/new-transaction')
            }
            console.log(JSON.parse(localStorage.getItem('loginDetail')))
            // console.log(response.data)
        } catch {
            console.log()
        }
    }

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
            <form
                className="w-[25rem]  p-4 border bg-white rounded-lg shadow-lg max-w-md"
                onSubmit={handleLoginSubmit}
            >
                <h2 className="mb-4 text-2xl font-semibold">Login</h2>
                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="user_name"
                    >
                        Username
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        type="text"
                        id="user_name"
                        name="user_name"
                        required
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={handleOnChange}
                    />
                </div>
                <div className="text-center">
                    <button
                        className="w-1/3 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        type="submit"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
