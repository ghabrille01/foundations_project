import { users } from "../storage/dataBase";

export function register(username, password) {

    if (usernameAvailable(username)) {
        const newUser = {
            id: users.length,
            username: username,
            password: password,
            role: employee,
        }

        users.push(newUser);
        return `User ${username} has been created.`;
    } else {
        return `${username} is not available.`;
    }
    
}

function usernameAvailable(username) {
    users.forEach((user) => {
        if (username === user.username) {
            return false
        }
    })
    return true;
}