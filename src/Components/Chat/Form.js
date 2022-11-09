import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Form = ({ onSubmit, setChatMessage, ChatMessage }) => {
    return (
        <form className="row g-3 border-top text-dark" onSubmit={onSubmit}>
            <div className="col">
                <input type="text" className="form-control" onChange={(e) => setChatMessage(e.target.value)} style={{ border: "1px solid #BBBBBB" }} placeholder="Type something..." value={ChatMessage} />
            </div>
            <div className="col-auto">
                <button type="submit" className="btn" style={{ padding: 0 }}>
                    <FontAwesomeIcon icon={faPaperPlane} size="2x" className="cursor-pointer" />
                </button>
            </div>
        </form>
    )
}

export default Form
