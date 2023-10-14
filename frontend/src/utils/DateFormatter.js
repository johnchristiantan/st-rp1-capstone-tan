export const removeTimeStamp = (dateString) => {
    // selectedTransaction['transaction_date']
    const date = new Date(dateString)
    const formattedDate = date.toISOString().slice(0, 10)
    return formattedDate
}