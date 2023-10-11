// import React, { useState, useEffect } from 'react'

// import { getTotalDiscountedAmountByServiceType } from '../../../server/model/Transactions'

// function DiscountedAmountFilter() {
//     const [serviceType, setServiceType] = useState('Spa') // Replace with the initial service type
//     const [totalDiscountedAmount, setTotalDiscountedAmount] = useState(null)

//     useEffect(() => {
//         async function fetchTotalDiscountedAmount() {
//             try {
//                 const result = await getTotalDiscountedAmountByServiceType(
//                     serviceType
//                 )

//                 if (result) {
//                     setTotalDiscountedAmount(result)
//                 } else {
//                     console.log('An error occurred while fetching the data.')
//                 }
//             } catch (err) {
//                 console.error('An error occurred:', err)
//             }
//         }

//         fetchTotalDiscountedAmount()
//     }, [serviceType])

//     return (
//         <div>
//             <label>Service Type:</label>
//             <input
//                 type="text"
//                 value={serviceType}
//                 onChange={(e) => setServiceType(e.target.value)}
//             />
//             <div>
//                 <h2>Total Discounted Amount for {serviceType}:</h2>
//                 {totalDiscountedAmount ? (
//                     <ul>
//                         {totalDiscountedAmount.map((item, index) => (
//                             <li key={index}>
//                                 {item.service_type}:{' '}
//                                 {item.total_discounted_amount_per_type}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default DiscountedAmountFilter
