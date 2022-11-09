import React from 'react';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Task from './Task'

const TaskList = ({ Tasks, Loader, onDelete, loadTasks, getShowDoneTasks, token }) => {
    return (
        <>
            {
                (Loader) ?
                    <div className="text-light text-center">
                        <FontAwesomeIcon icon={faSpinner} size="4x" spin />
                    </div>
                    :
                    (Tasks.length > 0) ?
                        Tasks.map((task) => {
                            const ComponentTask = <Task task={task} onDelete={onDelete} loadTasks={loadTasks} key={task._id} token={token} />;
                            return (getShowDoneTasks) ? ComponentTask : (!task.done) && ComponentTask
                        })
                        :
                        <div className="text-light text-center">
                            <div className="mb-2"><FontAwesomeIcon icon={faFolderOpen} size="4x" /></div>
                            <h5>No Tasks Available</h5>
                        </div>
            }
        </>
    )
}

export default TaskList
