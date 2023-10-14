import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import useTransactionFormStore from '../../data/Store'

const UserAutocompleteInput = ({ users, selectedTransaction=null, isEditMode }) => {
    const [inputValue, setInputValue] = useState('')
    const [inputFromClick, setInputFromClick] = useState('')
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null) // State to store selected option

    const { createTransactionInputField, setCreateTransactionInputField } = useTransactionFormStore()

    useEffect(() => {
        if (selectedTransaction !== null) {
            const filteredCustomerByClick = users.filter((user) => {
                return user.user_id === selectedTransaction.customer_id;
            });
            setCreateTransactionInputField('customer_id', filteredCustomerByClick[0].user_id)

            const selectedCustomerByClick = filteredCustomerByClick.map((user) => ({
                value: user.user_id,
                label: `${user.first_name} ${user.last_name}`,
            }))
            setInputFromClick(selectedCustomerByClick)
        }
        console.log("createTransactionInputField", createTransactionInputField)
    }, [selectedTransaction])
    
    useEffect(() => {
        
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

            console.log('Filtered Options', filteredOptions)

            // Map the filtered options to the format expected by React-Select
            const userListOption = filteredOptions.map((user) => ({
                value: user.user_id,
                label: `${user.first_name} ${user.last_name}`,
            }))

            console.log('userListOption', userListOption)
            setOptions(userListOption)
        }
    }, [inputValue, users])


    const handleChange = (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            const userId = selectedOption.value // This will give you the user_id
            setCreateTransactionInputField('customer_id', userId)
            createTransactionInputField['customer_id'] = userId

            setSelectedOption(selectedOption)
        } else {
            alert('No user selected')
        }
    }

    return (
        <>
            <div className="flex justify-between w-full text-black">
                <label className="self-center">Customer:</label>
                <div className="mt-2 w-[12rem] mb-2">
                    <Select
                        value={selectedOption}
                        options={options}
                        inputValue={inputFromClick ? inputFromClick[0]['label'] : inputValue}
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
