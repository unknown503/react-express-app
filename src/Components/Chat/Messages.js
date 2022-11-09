const Messages = ({ Messages, Loader, id }) => {
    return (
        <>
            {
                (!Loader) ?
                    Messages.map((message) =>
                        <div className={message.userId === id ? "d-flex justify-content-end" : ""} key={message._id}>
                            <div className="d-block">
                                <div className="d-inline-block">
                                    <div className="text-primary fw-bold fs-6 d-inline-block">{message.userName}</div> : {
                                        (message.gif) ?
                                            <img src={message.message} alt={message.userName} className="py-2 w-25" /* style={{ maxWidth: "305px" }}  *//>
                                            :
                                            message.message
                                    }
                                </div>
                            </div>
                        </div>
                    ) :
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
            }
        </>
    )
}

export default Messages
