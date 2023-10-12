// import React, { useEffect, useState } from 'react'
// import { getTotalDiscountedAmountByServiceType } from '../../../server/model/Transactions'

// function SalesByServiceType() {
//     const [discountedAmounts, setDiscountedAmounts] = useState([])
//     const serviceType = 'Massage' // Replace with the service type you want to query

//     useEffect(() => {
//         const fetchDiscountedAmounts = async () => {
//             try {
//                 const result = await getTotalDiscountedAmountByServiceType(
//                     serviceType
//                 )

//                 if (result) {
//                     setDiscountedAmounts(result)
//                 } else {
//                     console.error(
//                         'Error occurred while fetching discounted amounts.'
//                     )
//                 }
//             } catch (error) {
//                 console.error('An error occurred:', error.message)
//             }
//         }

//         fetchDiscountedAmounts()
//     }, [serviceType])

//     return (
//         <div>
//             <h1>Total Discounted Amounts for Service Type: {serviceType}</h1>
//             <ul>
//                 {discountedAmounts.map((amount, index) => (
//                     <li key={index}>
//                         {amount.total_discounted_amount_per_type}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default SalesByServiceType
