import { useState, createContext } from 'react'
import { isLogged } from '../Auth/Auth'
import { LoginAuth } from '../Auth/Auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(isLogged() ? JSON.parse(localStorage.getItem("user")) : "");

    const signOut = () => {
        if (isLogged()) {
            localStorage.removeItem("user");
            setUser(null)
        }
    }

    const setEmptyUser = () => setUser(null)

    const login = async (data) => {
        const res = await LoginAuth(data);
        if (!res.data.error) {
            setUser(res.data)
            return true
        } else {
            return { error: res.data.message }
        }
    }

    const contextValue = {
        user, setUser, signOut, login, setEmptyUser
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider }