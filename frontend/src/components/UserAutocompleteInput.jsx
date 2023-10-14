import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import useTransactionFormStore from '../data/Store'

const UserAutocompleteInput = ({ users, onChange, selectedTransaction }) => {
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null) // State to store selected option

    const { createTransactionInputField } = useTransactionFormStore()

    useEffect(() => {
        console.log('Users: ', users)
        console.log('2', selectedTransaction)
        if (users) {
            // Filter the users based on the input value (first name or last name)
            const filteredOptions = users.filter(
                (user) =>
                    user.first_name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                    user.last_name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
            )

            const filteredCustomer = users.filter((user) => {
                return (user.user_id = selectedTransaction['customer_id'])
            })

            console.log('customer filtered', filteredCustomer)

            // Map the filtered options to the format expected by React-Select
            const selectOptions = filteredOptions.map((user) => ({
                value: user.user_id,
                label: `${user.first_name} ${user.last_name}`,
            }))

            setOptions(
                selectedTransaction
                    ? selectedTransaction['customer_id']
                    : selectOptions
            )
        }
    }, [inputValue, users])

    const handleChange = (selectedOption) => {
        console.log('1', selectedOption)
        console.log('selectedTransaction', selectedTransaction)
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

    console.log('vvv', { inputValue })

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
