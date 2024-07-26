import React, { useState } from 'react';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTask, setEditTask] = useState({ title: '', description: '', completed: false });

    const handleEditClick = (task) => {
        setEditTaskId(task.id);
        setEditTask({ title: task.title, description: task.description, completed: task.completed });
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
                                placeholder="Nombre de la tarea"
                                required
                            />
                            <input
                                name="description"
                                value={editTask.description}
                                onChange={handleChange}
                                placeholder="Descripción"
                                required
                            />
                            <label className='form-field'>
                                Completo:
                                <input
                                    name="completed"
                                    type="checkbox"
                                    checked={editTask.completed}
                                    onChange={handleChange}
                                />
                            </label>
                            <button onClick={() => handleSaveClick(task.id)} className='lista'>Guardar</button>
                        </>
                    ) : (
                        <>
                            <span>{task.title} - {task.description}</span>
                            <div className="button-container">
                                <button onClick={() => handleEditClick(task)} className='lista2'>Editar</button>
                                <button onClick={() => onDelete(task.id)} className='lista3'>Eliminar</button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
