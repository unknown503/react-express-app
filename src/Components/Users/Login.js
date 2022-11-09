import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import useAuth from '../../Context/useAuth'
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const [User, setUser] = useState({ username: "", password: '' })
    const { login } = useAuth();
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (User.username && User.password) {
            const res = await login(User)
             if (!res.error){
                history.push("/")
            }else{
                toast.error(res.error, {
                    position: 'bottom-right',
                });
            }
        } else {
            toast.error('Some inputs are empty.', {
                position: 'bottom-right',
            });
        }
    }

    return (
        <div className="row justify-content-center align-items-center">
            <div className="my-3 p-3 rounded col-xl-3 col-lg-5 col-md-6 col-sm-8 col-xs-10 bg-light">
                <h3 className="border-bottom pb-3 mb-0 text-center">Login Form</h3>
                <div className="text-muted pt-3">
                    <form className="p-3 mb-0" onSubmit={(e) => onSubmit(e)} autoComplete="off">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="username" onChange={(e) => setUser({ ...User, username: e.target.value })} placeholder="Username" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" onChange={(e) => setUser({ ...User, password: e.target.value })} placeholder="Password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                            <FontAwesomeIcon icon={faSignInAlt} size="lg" className="me-1" />
                            Login
                        </button>
                        <div className="text-center mt-3">
                            <p className="mb-0">Don't have an account? <a href="/sign-up">Sign up</a></p>
                        </div>
                        <Toaster />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
