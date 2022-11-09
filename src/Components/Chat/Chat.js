import React, { useContext, useEffect, useState } from 'react'
import { ChatStyled } from '../Styled/Components'
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../Context/AuthContext'
import Form from './Form'
import Messages from './Messages'
import Gif from '../../api/GifData'

let socket;
const ENDPOINT = "http://localhost:4000/";

const Chat = ({ To }) => {
    //const [OnlineUsers, setOnlineUsers] = useState([])
    const [Loader, setLoader] = useState(true)
    const [Online] = useState(true)
    const [ChatMessage, setChatMessage] = useState("")
    const [ChatMessages, setChatMessages] = useState([])
    const { user } = useContext(AuthContext);
    const [Room, setRoom] = useState("")

    useEffect(() => {
        socket = io(ENDPOINT)
        return () => {
            socket.disconnect()
            socket.off();
        }
    }, [])

    useEffect(() => {
        setChatMessages([]);
        socket.emit("handleRoom",
            {
                usersId: [To.id, user.result.id],
                admin: user.result.id
            }
        );
        socket.on("room", (room) => {
            setRoom(room)
        })
    }, [To.id, user.result.id])
    
    useEffect(() => {
        if (Room !== null) {
            socket.emit("getHistoryMessages", Room._id, user.result.id)
            socket.on("historyMessages", (data) => {
                setLoader(false)
                setChatMessages(data)
            })
        }
    }, [Room, user.result.id])

    useEffect(() => {
        if (Room !== null) {
            socket.emit("join", { user: user.result, room: Room._id })
        }
    }, [user.result, Room])

    useEffect(() => {
        socket.on("message", (data) => {
            setChatMessages([...ChatMessages, data])
        })
    }, [ChatMessages])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (ChatMessage) {
            let data = {
                userId: user.result.id,
                userName: user.result.username,
                room: Room._id,
                gif: false
            }
            if (ChatMessage.charAt(0) === "/") {
                const search = ChatMessage.replace("/", "")
                const gif = await Gif(search)
                if (gif.data.data.length === 0) return;
                data = {
                    ...data,
                    message: gif.data.data[0].images.downsized_medium.url,
                    gif: true
                }
            } else {
                data = {
                    ...data,
                    message: ChatMessage
                }
            }
            setChatMessage("");
            socket.emit("sendMessage", data)
        }
    }

    /*     useEffect(() => {
            socket.on("availableStatus", ({ user }) => {
                setOnlineUsers([...OnlineUsers, user]);
            })
        }, [OnlineUsers]) */

    /*     useEffect(() => {
            if (To > 0) {
                setTo(To.id)
            }

            // eslint-disable-next-line
        }, [To]) */


    return (
        <div className="my-3 p-3 rounded col-xl-5 col-lg-7 bg-light">
            <div className="d-flex justify-content-between border-bottom p-2 mb-0">
                <div className="d-flex">
                    <div className="me-2 mt-1">
                        <FontAwesomeIcon icon={faCircle} className={(Online) ? "text-success" : "text-danger"} />
                    </div>
                    <h3>
                        Chat
                    </h3>
                </div>
                <h6 className="mt-1">
                    {To.username}
                </h6>
            </div>
            <div className="text-muted pt-3">
                <ChatStyled className="scroll">
                    {
                        (To.id && ChatMessages !== null) ?
                            <Messages Messages={ChatMessages} Loader={Loader} id={user.result.id} />
                            :
                            <h6 className="d-flex justify-content-center align-items-center h-75">Select an Avaiable User to start chatting...</h6>
                    }
                </ChatStyled>
                {
                    To.id &&
                    <Form onSubmit={onSubmit} ChatMessage={ChatMessage} setChatMessage={setChatMessage} />
                }
            </div>
        </div>
    )
}

export default Chat