import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { signup } from '../../api/Requests'

function Signup() {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [Repassword, setRepassword] = useState("")
    const [Errors, setErrors] = useState(false)
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (Password === Repassword && Username.length >= 3) {
            const res = signup({
                username: Username,
                password: Password,
                repassword: Repassword
            })
            if (res.data.result) {
                history.push("/")
            } else {
                toast.error(res.data.message, {
                    position: 'bottom-right',
                });
            }
        } else {
            setErrors(true)
        }
    }
    return (
        <div className="row justify-content-center align-items-center">
            <div className="my-3 p-3 rounded col-xxl-3 col-xl-4 col-lg-5 col-md-5 col-sm-10 bg-light">
                <h3 className="border-bottom pb-3 mb-0 text-center">Sign-up Form</h3>
                <div className="text-muted pt-3">
                    <form className="p-3 mb-0" onSubmit={(e) => onSubmit(e)}>
                        {
                            (Errors) ?
                                <div className="alert alert-danger" role="alert">
                                    You have some errors.
                                </div>
                                : ""
                        }
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="repassword" onChange={(e) => setRepassword(e.target.value)} placeholder="Repeat Password" />
                            <label htmlFor="repassword">Repeat Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" className="me-1" />
                            Sign up
                        </button>
                        <div className="text-center mt-3">
                            <p className="mb-0">Already have an account? <a href="/login">Login</a></p>
                        </div>
                        <Toaster />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
