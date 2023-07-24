import React, { useState } from 'react'
import { createUser } from '../services/Users'

export const CreateUser = () => {
    const [userDetails, setUserDetails] = useState({
        user_name: '',
        password: '',
        user_type: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(userDetails)
            .then((res) => {
                alert('Registered Successfully', res)
            })
            .catch((error) => alert('User not Created', error))
    }

    const handleUserChange = (e) => {
        // console.log(e.target.value)
        const { name, value } = e.target
        setUserDetails((prev) => {
            console.log(prev)
            return { ...prev, [name]: value }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="user_name"
                            defaultValue={userDetails.user_name}
                            onChange={handleUserChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            defaultValue={userDetails.password}
                            onChange={handleUserChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Usertype:
                        <input
                            type="text"
                            name="user_type"
                            defaultValue={userDetails.user_type}
                            onChange={handleUserChange}
                        />
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
