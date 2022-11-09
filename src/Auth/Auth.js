import { login } from '../api/Requests';
import decode from 'jwt-decode'

export const LoginAuth = async ({ username, password }) => {
    const auth = await login({
        username, password
    });
    if (auth.data.token) setToLocalStorage(auth.data);
    return auth;
}

export const isLogged = () => {
    const user = localStorage.getItem("user");
    if (user) {
        const jsonUser = JSON.parse(user);
        const decoded = decode(jsonUser.token);
        const isExpired = Date.now() >= decoded.exp * 1000;
        if (isExpired) {
            if (decoded.id === jsonUser.result.id) {
                localStorage.removeItem("user");
                return false;
            }
        } else {
            return true;
        }
    }
    return false;
}

const setToLocalStorage = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
}