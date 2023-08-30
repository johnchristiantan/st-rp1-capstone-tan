import { useState } from 'react'
import { createdDiscount, getAllDiscounts } from '../services/DiscountServices'

export function DiscountsAdd() {
    const [discountsInputs, setDiscountsInputs] = useState({
        discount_code: '',
        discount_description: '',
        percentage: null,
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setDiscountsInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleOnSubmit = () => {
        return createdDiscount(discountsInputs)
            .then(() => getAllDiscounts())
            .catch((error) => {
                console.log('Error creating or fetching discounts:', error)
                throw error // Rethrow the error to handle it in the main component if needed
            })
    }

    return {
        discountsInputs,
        handleOnChange,
        handleOnSubmit,
    }
}
