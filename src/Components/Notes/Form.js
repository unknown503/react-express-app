import React from 'react'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Form = ({ onSubmit, Task, setTask }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-floating">
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="taskField"
                    style={{ height: '100px', maxHeight: '200px' }}
                    onChange={(e) => setTask(e.target.value)}
                    value={Task}
                ></textarea>
                <label htmlFor="taskField">Task Content</label>
            </div>
            <div className="d-grid gap-2 mt-3">
                <button className="btn btn-dark" type="submit">
                    <FontAwesomeIcon icon={faSave} size="lg" className="me-1" />
                    Save Task
                </button>
            </div>
        </form>
    )
}

export default Form
