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

// EDIT/UPDATE User
export async function editUser(userDetails) {
    try {
        const response = await fetch(`http://localhost:8000/users/${userDetails.user_id}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: userDetails }),
        })

        if (response.status === 200) {
            return await response.json()
        }
    } catch (error) {
        console.log('Error: ', error)
    }
}

// DELETE User
export async function deleteUser(userId) {
    try {
        const confirmed = window.confirm(
            'Are you sure you want to delete this user?'
        )
        if (confirmed) {
            const response = await fetch(`http://localhost:8000/users/${userId}`),
                {
                    method: 'DELETE',
                }
            )
            return await response.json()
        }
    } catch (error) {
        console.log('Error: ', error)
    }
}