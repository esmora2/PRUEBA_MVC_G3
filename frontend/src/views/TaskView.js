import React, { useState, useEffect } from 'react';
import TaskController from '../controllers/TaskController';
import TaskList from '../components/TaskList';

const TaskView = ({ token }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (token) {
            fetchTasks();
        }
    }, [token]);

    const fetchTasks = async () => {
        const data = await TaskController.getTasks(token);
        setTasks(data);
    };

    const handleTaskCreated = () => {
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await TaskController.deleteTask(id, token);
        fetchTasks();
    };

    const handleUpdate = async (id, updatedTask) => {
        await TaskController.updateTask(id, updatedTask, token);
        fetchTasks();
    };

    const handleAdd = async (newTask) => {
        await TaskController.createTask(newTask, token);
        fetchTasks();
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Gestor de Tareas</h1>
            </header>
            <div className="content">
                <div>
                <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} onAdd={handleAdd} />
                    
                </div>
            </div>
        </div>
    );
};

export default TaskView;
