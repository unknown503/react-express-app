import React, { useEffect, useRef, useState } from 'react'
import { ChatStyled } from '../Styled/Components'
import Messages from './Messages';
import Gif from '../../api/GifData'
import { getChat } from '../../api/Requests';
import io from 'socket.io-client';
import Form from './Form'

let socket;

const Chat = () => {
/*     const [Message, setMessage] = useState("")
    const [Messages, setMessages] = useState([])
    const [Loader, setLoader] = useState(true)
    const MessagesInserted = useRef(0)
    const ENDPOINT = "http://localhost:4000/";

    getChat().then(({ data }) => {
        if (MessagesInserted.current === 0) {
            MessagesInserted.current += 1;
            setLoader(false)
            setMessages(data)
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault()
        if (Message) {
            let options = {}
            if (Message.charAt(0) === "/") {
                const search = Message.replace("/", "")
                const gif = await Gif(search)
                if (gif.data.data.length === 0) return;
                options = {
                    message: gif.data.data[0].images.downsized_medium.url,
                    gif: true
                }
            } else {
                options = {
                    message: Message
                }
            }
            socket.emit("client:message", options)
            setMessage("")
        }
    }
    useEffect(() => {
        socket = io.connect(ENDPOINT);
        socket.on("server:message", ({ _id, user, message, gif }) => {
            setMessages([...Messages, {
                _id, user, message, gif
            }])
        })
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        return () => socket.disconnect()
    }, [Messages])

 */
    return (
        <div className="row justify-content-center align-items-center">
            <div className="my-3 p-3 rounded col-xl-5 col-lg-8 bg-light">
                <h3 className="border-bottom pb-3 mb-0 text-center">Chat</h3>
                <div className="text-muted pt-3">
                    <ChatStyled className="scroll">
                        <MessageComp Messages={Messages} Loader={Loader} />
                    </ChatStyled>
                    <Form onSubmit={onSubmit} Message={Message} setMessage={setMessage} />
                </div>
            </div>
        </div>
    )
}

export default Chat
