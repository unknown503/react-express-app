import React, { useContext, useEffect, useState } from 'react'
import { ChatStyled } from '../Styled/Components'
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/ChatContext'
import AvailableUsers from '.'
import Form from './Form'
import Messages from './Messages'
import Gif from '../../api/GifData'

let socket;
const ENDPOINT = "http://localhost:4000/";

const Chat = () => {
    //const [OnlineUsers, setOnlineUsers] = useState([])
    const [Loader, setLoader] = useState(true)
    const [Online] = useState(true)
    const [ChatMessage, setChatMessage] = useState("")
    const [ChatMessages, setChatMessages] = useState([])
    const { user } = useContext(AuthContext);
    const { To } = useContext(ChatContext);
    const [Room, setRoom] = useState("")

    useEffect(() => {
        socket = io(ENDPOINT)
        return () => {
            socket.disconnect()
            socket.off();
        }
    }, [])

    useEffect(() => {
        setRoom(To.id);
    }, [To.id])

    useEffect(() => {
        socket.emit("getHistoryMessages", Room)
        if (Room !== null) {
            socket.on("historyMessages", (data) => {
                setLoader(false)
                setChatMessages([data])
                console.log(data)
            })
        }
        return () => {
            //setChatMessages([])
        }
    }, [Room])

    useEffect(() => {
        socket.emit("join", { user: user.result, room: Room })
    }, [user.result, Room])

    /*     useEffect(() => {
            if (Room > 0) {
                setRoom(To.id)
            }
    
            // eslint-disable-next-line
        }, [To]) */

    /*     useEffect(() => {
            socket.on("message", (data) => {
                setChatMessages([...ChatMessages, data])
            })
        }, [ChatMessages]) */

    /*     useEffect(() => {
            socket.on("availableStatus", ({ user }) => {
                setOnlineUsers([...OnlineUsers, user]);
            })
        }, [OnlineUsers]) */

    const onSubmit = async (e) => {
        e.preventDefault();
        if (ChatMessage) {
            let data = {
                userId: user.result.id,
                userName: user.result.username,
                room: Room,
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
            setChatMessages(...ChatMessages, data)
            socket.emit("sendMessage", data, () => {
                setChatMessage("");
            })
        }
    }


    return (
        <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4">
                <AvailableUsers /* Users={OnlineUsers} */ />
            </div>
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
                    <div className="mt-1">
                        {To.username}
                    </div>
                </div>
                <div className="text-muted pt-3">
                    <ChatStyled className="scroll">
                        {
                            (To.id && ChatMessages !== null) &&
                            <Messages Messages={ChatMessages} Loader={Loader} />
                        }
                    </ChatStyled>
                    {
                        To.id &&
                        <Form onSubmit={onSubmit} ChatMessage={ChatMessage} setChatMessage={setChatMessage} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat