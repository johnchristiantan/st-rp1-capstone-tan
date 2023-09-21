import React, { useState } from 'react'

function StatusChange({ selectedTransaction, onStatusChange }) {
    // alert(selectedTransaction.transaction_id)

    const [newStatus, setNewStatus] = useState(selectedTransaction.status)

    const handleStatusChange = async (event) => {
        const updatedStatus = event.target.value
        setNewStatus(updatedStatus)
        console.log('Transaction ID:', selectedTransaction.transaction_id)
        const encodedTransactionId = encodeURIComponent(
            selectedTransaction.transaction_id
        )
        console.log('Request URL:', `/new-transaction/${encodedTransactionId}`)

        // Log the selectedTransaction object to check its content
        console.log('Selected Transaction:', selectedTransaction)

        try {
            // Make an HTTP PUT request to update the status in the database
            const response = await fetch(
                `/new-transaction/${encodedTransactionId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: updatedStatus }),
                }
            )
            // console.log(selectedTransaction.transaction_id)
            if (response.ok) {
                // Status updated successfully
                onStatusChange(
                    selectedTransaction.transaction_id,
                    updatedStatus
                )
            } else {
                console.log('Status update failed. Please try again.')
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    return (
        <select
            className="p-1 text-black rounded"
            name="status"
            onChange={handleStatusChange}
            value={newStatus}
        >
            <option value="Booked">Booked</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
        </select>
    )
}

export default StatusChange
