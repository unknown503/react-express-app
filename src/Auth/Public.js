import { Route, Redirect  } from 'react-router-dom';
import useAuth from '../Context/useAuth';

const Private = (props) => {
    const { user } = useAuth();

    if (user) return <Redirect to="/" />
    return (
        <Route {...props} />
    )
}

export default Private
