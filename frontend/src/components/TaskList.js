import React, { useState } from 'react';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTask, setEditTask] = useState({ title: '', description: '', completed: false, userId: '' });

    const handleEditClick = (task) => {
        setEditTaskId(task.id);
        setEditTask({ title: task.title, description: task.description, completed: task.completed, userId: task.userId });
    };

    const handleSaveClick = (id) => {
        onUpdate(id, editTask);
        setEditTaskId(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setEditTask({ ...editTask, [name]: name === 'userId' ? Number(newValue) : newValue });
    };

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    {editTaskId === task.id ? (
                        <>
                            <input
                                name="title"
                                value={editTask.title}
                                onChange={handleChange}
                                placeholder="Title"
                                required
                            />
                            <input
                                name="description"
                                value={editTask.description}
                                onChange={handleChange}
                                placeholder="Description"
                                required
                            />
                            <input
                                name="userId"
                                type="number"
                                value={editTask.userId}
                                onChange={handleChange}
                                placeholder="User ID"
                                required
                            />
                            <label>
                                Completed:
                                <input
                                    name="completed"
                                    type="checkbox"
                                    checked={editTask.completed}
                                    onChange={handleChange}
                                />
                            </label>
                            <button onClick={() => handleSaveClick(task.id)}>Guardar</button>
                        </>
                    ) : (
                        <>
                            <span>{task.title} - {task.description} - {task.userId}</span>
                            <button onClick={() => handleEditClick(task)}>Editar</button>
                        </>
                    )}
                    <button onClick={() => onDelete(task.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
