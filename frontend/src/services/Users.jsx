// CREATE/POST User
export async function createUser(userDetails) {
    try {
        const response = await fetch('http://localhost:8000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
        })
        return await response.json()
    } catch (error) {
        console.log('Error: ', error)
    }
}

// READ Users
export async function getUsers() {
    // alert('Paghugot nang data')
    try {
        const response = await fetch('http://localhost:8000/users')
        return response.json()
    } catch (error) {
        console.log('Error: ', error)
    }
}
