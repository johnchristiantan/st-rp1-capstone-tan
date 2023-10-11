import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import useTransactionFormStore from '../data/Store'

const UserAutocompleteInput = ({ users, onChange }) => {
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null) // State to store selected option

    const { createTransactionInputField } = useTransactionFormStore()

    useEffect(() => {
        // Filter the users based on the input value (first name or last name)
        const filteredOptions = users.filter(
            (user) =>
                user.first_name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                user.last_name.toLowerCase().includes(inputValue.toLowerCase())
        )

        // Map the filtered options to the format expected by React-Select
        const selectOptions = filteredOptions.map((user) => ({
            value: user.user_id,
            label: `${user.first_name} ${user.last_name}`,
        }))

        setOptions(selectOptions)
    }, [inputValue, users])

    const handleChange = (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            const userId = selectedOption.value // This will give you the user_id
            // alert(`Selected User ID: ${userId}`)
            createTransactionInputField['customer_id'] = userId
            // Pass the userId to the onChange callback
            // onChange(userId)
        } else {
            alert('No user selected')
        }

        setSelectedOption(selectedOption)
    }

    return (
        <>
            <div className="flex justify-between w-full text-black">
                <label className="self-center">Customer:</label>
                <div className="mt-2 w-[12rem] mb-2">
                    <Select
                        value={selectedOption}
                        options={options}
                        inputValue={inputValue}
                        onInputChange={(value) => setInputValue(value)}
                        onChange={handleChange}
                        placeholder="Search by name..."
                        isClearable={true} // Allow clearing the selected option
                    />
                </div>
            </div>
        </>
    )
}

export default UserAutocompleteInput
