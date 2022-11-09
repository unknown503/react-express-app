import { AuthContext } from '../Context/AuthContext'
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { isLogged } from './Auth';

const Private = (props) => {
    const { setEmptyUser } = useContext(AuthContext);

    if (!isLogged()) {
        setEmptyUser()
        return <Redirect to="/login" />
    }
    return <Route {...props} />
}

export default Private
