import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import useAuth from '../Context/useAuth';

function Navbar() {
    const history = useHistory();
    const { user, signOut } = useAuth();

    const onSignOut = () => {
        signOut()
        history.push("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container">
                <Link className="navbar-brand" to="/">NotesApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact={true}>Home</NavLink>
                        </li>
                        {
                            user ?
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/notepad">Notepad</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/notes">Notes</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/chat">Chat</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <div className="dropdown ">
                                            <Link to="#" className="d-block nav-link text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                                {user.result.username}
                                            </Link>
                                            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                                <li><Link className="dropdown-item" to="#">Settings</Link></li>
                                                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="dropdown-item" onClick={onSignOut}>Sign out</button></li>
                                            </ul>
                                        </div>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/sign-up">Sign-up</NavLink>
                                    </li>
                                </>

                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;