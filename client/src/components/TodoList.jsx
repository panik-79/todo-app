// TodoList.jsx
import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import axios from 'axios';
import { base_url } from '../utils/constant';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [activeSection, setActiveSection] = useState('pending');

    // Function to fetch both pending and completed tasks
    const fetchTasks = () => {
        axios.get(`${base_url}/get`)
            .then(response => {
                const tasks = response.data;
                setTaskList(tasks.filter(task => !task.completed));
                setCompletedTasks(tasks.filter(task => task.completed));
            })
            .catch(error => console.error('Error fetching tasks: ', error));
    };

    // Fetch tasks when the component mounts or when active section changes
    useEffect(() => {
        fetchTasks();
    }, [activeSection]);

    // Function to add a new task
    const saveTask = (taskObj) => {
        // Checking if both title and description fields are present in taskObj
        if (!taskObj.title || !taskObj.description) {
            console.error('Error: Both title and description are required.');
            return;
        }

        axios.post(`${base_url}/save`, taskObj)
            .then(response => {
                setTaskList(prevList => [...prevList, response.data]);
                setModal(false);
            })
            .catch(error => console.error('Error saving task: ', error));
    };

    // Function to delete a task
    const deleteTask = (id) => {
        axios.delete(`${base_url}/delete/${id}`)
            .then(() => {
                setTaskList(prevList => prevList.filter(task => task._id !== id));
                setCompletedTasks(prevTasks => prevTasks.filter(task => task._id !== id));
            })
            .catch(error => console.error('Error deleting task: ', error));
    };

    // Function to mark a task as completed
    const markAsCompleted = (id) => {
        const completedTask = taskList.find(task => task._id === id);
        if (completedTask) {
            axios.put(`${base_url}/complete/${id}`)
                .then(() => {
                    fetchTasks(); // Fetch tasks again to update lists
                })
                .catch(error => console.error('Error marking task as completed: ', error));
        }
    };

    // Function to update a task
    const updateTask = (updatedTask) => {
        const { _id, ...rest } = updatedTask;
        axios.put(`${base_url}/update/${_id}`, rest)
            .then(() => {
                fetchTasks(); // Fetch tasks again to update lists
            })
            .catch(error => console.error('Error updating task: ', error));
    };

    // Function to handle section change
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="container" style={{width:"100vw"}}>
            <div className="sidebar">
                <h2>Go to</h2>
                <ul>
                    <li className={activeSection === 'pending' ? 'active' : ''} onClick={() => handleSectionChange('pending')}>Pending Tasks</li>
                    <li className={activeSection === 'completed' ? 'active' : ''} onClick={() => handleSectionChange('completed')}>Completed Tasks</li>
                </ul>
            </div>
            <div className="main-content">
                {activeSection === 'pending' && (
                    <>
                        <div className="header">
                            <h3>Todo List</h3>
                            <br />
                            <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Create a To-Do</button>
                        </div>
                        <div className="task-container">
                            {taskList.map((task, index) => (
                                <Card
                                    key={task._id}
                                    taskObj={task}
                                    index={index}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    markAsCompleted={markAsCompleted}
                                />
                            ))}
                        </div>
                    </>
                )}
                {activeSection === 'completed' && (
                    <>
                        <h3>Completed Tasks</h3>
                        <br />
                        <div className="task-container">
                            {completedTasks.map((task, index) => (
                                <Card
                                    key={task._id}
                                    taskObj={task}
                                    index={index}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    isInCompletedSection={true}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <CreateTask toggle={() => setModal(!modal)} modal={modal} save={saveTask} />
        </div>
    );
};

export default TodoList;
