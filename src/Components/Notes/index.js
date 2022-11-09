import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import TaskList from './TaskList'
import { getNotes, createNote, deleteNote } from '../../api/Requests';
import Form from './Form'
import { AuthContext } from '../../Context/AuthContext'

const Tasks = () => {
    const [Tasks, setTasks] = useState([])
    const [Task, setTask] = useState("");
    const [Error, setError] = useState(false);
    const [Loader, setLoader] = useState(true);
    const [ShowDoneTasks, setShowDoneTasks] = useState(localStorage.getItem("ShowDoneTasks") === "true")
    const { user } = useContext(AuthContext);
    const token = user.token;

    const loadTasks = () => {
        getNotes(token).then((tasks) => {
            setTasks(tasks.data);
        })
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (Task) {
            await createNote({ content: Task }, token);
            setTask("");
            loadTasks();
            setError(false);
        } else {
            setError(true);
        }
    }

    const onDelete = async (e) => {
        await deleteNote(e.target.id, token);
        loadTasks();
    }
    const toggleShowDone = () => {
        localStorage.setItem("ShowDoneTasks", !ShowDoneTasks);
        setShowDoneTasks(!ShowDoneTasks);
    }

    useEffect(() => {
        getNotes(token).then((tasks) => {
            setTasks(tasks.data);
        })
        setLoader(false);
    }, [token]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <div>
                                Task Form
                            </div>
                            <div className="cursor-pointer" onClick={toggleShowDone} >
                                <FontAwesomeIcon icon={(!ShowDoneTasks) ? faEye : faEyeSlash} size="lg" className="me-1" />
                                {(!ShowDoneTasks) ? "Show" : "Hide"} Done Tasks
                            </div>
                        </div>
                        <div className="card-body">
                            {(Error) ?
                                <div className="alert alert-danger" role="alert">
                                    Content is empty.
                                </div>
                                : ""
                            }
                            <Form onSubmit={onSubmit} Task={Task} setTask={setTask} />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <TaskList Tasks={Tasks} Loader={Loader} onDelete={onDelete} loadTasks={loadTasks} getShowDoneTasks={ShowDoneTasks} token={token} />
                </div>
            </div>
        </div>
    )
}

export default Tasks
