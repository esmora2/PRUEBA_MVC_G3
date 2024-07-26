import React, { useState } from 'react';
import Task from '../models/Task';
import TaskController from '../controllers/TaskController';

const TaskForm = ({ token, onTaskCreated }) => {
    const [task, setTask] = useState(new Task('', '', '', false, ''));

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setTask({ ...task, [name]: name === 'userId' ? Number(newValue) : newValue }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await TaskController.createTask(task, token);
        onTaskCreated();
        setTask(new Task('', '', '', false, ''));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
            <input name="description" value={task.description} onChange={handleChange} placeholder="Description" required />
            <input name="userId" value={task.userId} onChange={handleChange} placeholder="User ID" required />
            <label>
                Completo:
                <input name="completed" type="checkbox" checked={task.completed} onChange={handleChange} />
            </label>
            <button type="submit">Añadir tarea</button>
        </form>
    );
};

export default TaskForm;
