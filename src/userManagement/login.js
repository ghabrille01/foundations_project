import { users } from "../storage/dataBase";

export function login(username, password) {
    users.forEach((user) => {
        if ((user.username === username)  && (user.password === password) && ((user.role === "Employee") || (user.role === "Manager"))) {
            return `${username} has successfully logged in.`
        }
    })
    
    return `Invalid Credentials`;
}
