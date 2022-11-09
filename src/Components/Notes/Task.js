import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle, faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { updateNote } from '../../api/Requests';

function Task({ task, onDelete, loadTasks, token }) {
    const [EditedContent, setEditedContent] = useState(task.content || "");
    const [Editing, setEditing] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateNote(task._id, {
            content: EditedContent,
        }, token);
        onEdit();
        loadTasks();
    }
    const onChange = (e) => {
        setEditedContent(e.target.value);
    }

    const onEdit = () => {
        setEditing(!Editing)
    }

    const toggleDone = async () => {
        await updateNote(task._id, {
            content: task.content,
            author: task.author,
            done: !task.done
        }, token);
        loadTasks()
    }
    return (
        <div className="card card-body mb-2">
            <div className="d-flex justify-content-between">
                <div>
                    <div className="d-flex justify-content-start">
                        <div className="me-2 cursor-pointer d-flex align-items-center">
                            <FontAwesomeIcon icon={task.done ? faCheckSquare : faSquare} size="lg" onClick={toggleDone} />
                        </div>
                        {(Editing) ?
                            <form className="d-flex justify-content-start" onSubmit={onSubmit}>
                                <input type="text" className="form-control me-2" value={EditedContent} onChange={onChange} />
                                <button className="btn btn-dark" type="submit">
                                    <FontAwesomeIcon icon={faSave} size="lg" />
                                </button>
                            </form>
                            :
                            <div className="text-break">
                                {task.content}
                            </div>
                        }
                    </div>
                </div>
                <div className="cursor-pointer d-flex align-items-center">
                    <FontAwesomeIcon icon={faEdit} size="lg" className="me-1" onClick={onEdit} />
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" id={task._id} onClick={onDelete} />
                </div>
            </div>
        </div >
    )
}

export default Task
