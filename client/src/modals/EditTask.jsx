import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setTitle(taskObj.title);
        setDescription(taskObj.description);
    }, [taskObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTitle(value);
        } else {
            setDescription(value);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // Basic form validation
        if (!title.trim()) {
            setError('Task title cannot be empty');
            return;
        }
    
        setError(''); 
        const updatedTask = {
            _id: taskObj._id,
            title: title,
            description: description
        };
        updateTask(updatedTask);
    };
    

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange} name="title" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>
                {error && <div className="text-danger">{error}</div>} {/* Display error message */}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;
