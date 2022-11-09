import React, { useContext, useEffect, useState } from 'react'
import { getUsers } from '../../api/Requests'
import { AuthContext } from '../../Context/AuthContext'
import { SingleUser } from '../Styled/Components'
import Chat from './Chat'

const AvailableUsers = () => {
    const [To, setTo] = useState({})
    const [Users, setUsers] = useState([])
    const { user } = useContext(AuthContext)

    const SelectUser = (id, username) => {
        setTo({ id, username })
    }

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users.data.filter(u => u.username !== user.result.username))
        })
    }, [user.result.username])

    /*     useEffect(() => {
            setUsers(...user, user)
            return () => {
                console.log("cleaned")
            }
        }, [state]) */

    return (
        <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4">
                <div className="mt-3 mx-3 p-3 rounded bg-light">
                    <h3 className="border-bottom pb-3 mb-0 text-center">Available Users</h3>
                    <div className="text-muted pt-3">
                        {Users.map(user =>
                            <SingleUser key={user._id} onClick={() => SelectUser(user._id, user.username)} className="SingleUser">
                                {user.username}
                            </SingleUser>
                        )}
                    </div>
                </div>
            </div>
            <Chat To={To} />
        </div>

    )
}

export default AvailableUsers