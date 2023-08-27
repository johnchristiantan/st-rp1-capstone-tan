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
export async function editUser(user) {
    try {
        const response = await fetch(
            `http://localhost:8000/users/${user.user_id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            }
        )

        if (response.status === 200) {
            // return await response.json()
            console.log(response)
        }
    } catch (error) {
        console.log('Error: ', error)
    }
}

// DELETE User
export async function deleteUser(user_id) {
    try {
        const response = await fetch(`http://localhost:8000/users/${user_id}`, {
            method: 'DELETE',
        })
        console.log(response)
        // return await response.json()
    } catch (error) {
        console.log('Error: ', error)
    }
}
