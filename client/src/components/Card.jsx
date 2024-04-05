import React, { useState } from 'react';
import EditTask from '../modals/EditTask';

const Card = ({ taskObj, index, deleteTask, updateTask, markAsCompleted, isInCompletedSection }) => {
    const [modal, setModal] = useState(false);

    const colors = [
        { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
        { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
        { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" }
    ];

    const toggle = () => {
        setModal(!modal);
    };

    const handleDelete = () => {
        deleteTask(taskObj._id);
    };

    const handleMarkAsCompleted = () => {
        markAsCompleted(taskObj._id);
    };

    return (
        <div className="card-wrapper" style={{ backgroundColor: colors[index % 5]?.secondaryColor }}>
            <div className="card-top" style={{ backgroundColor: colors[index % 5]?.primaryColor }}></div>
            <div className="task-holder">
                <span className="card-header">{taskObj?.title}</span>
                <p className="mt-3">{taskObj?.description}</p>
                {isInCompletedSection ? (
                    <div className="card-actions">

                    </div>
                ) : (
                    <div className="card-actions" style={{ display: "flex", alignItems: "center" }}>
                        <i className="far fa-edit mr-3" style={{ color: colors[index % 5]?.primaryColor, cursor: "pointer", marginRight: "10px" }} onClick={toggle}></i>
                        <i className="fas fa-trash-alt" style={{ color: colors[index % 5]?.primaryColor, cursor: "pointer" }} onClick={handleDelete}></i>
                        <button className="btn btn-success ml-3" onClick={handleMarkAsCompleted} style={{ marginLeft: "20px" }}>Mark as completed</button>
                    </div>
                )}
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Card;
