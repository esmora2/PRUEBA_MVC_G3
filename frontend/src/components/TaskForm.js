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
        <form onSubmit={handleSubmit} className="task-form">
            <div className="form-field">
                <label htmlFor="title">Nombre:</label>
                <input id="title" name="title" value={task.title} onChange={handleChange} placeholder="Nombre de la tarea" required />
            </div>
            <div className="form-field">
                <label htmlFor="description">Descripción:</label>
                <input id="description" name="description" value={task.description} onChange={handleChange} placeholder="Descripción" required />
            </div>
            <div className="form-field">
                <label htmlFor="completed">Completo:</label>
                <input id="completed" name="completed" type="checkbox" checked={task.completed} onChange={handleChange} />
            </div>
            <button type="submit" className='agregar'>Añadir tarea</button>
        </form>
    );
};

export default TaskForm;
