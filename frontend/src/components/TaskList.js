import React, { useState } from 'react';
import Link from 'next/link';

const TaskList = ({ tasks, onDelete, onUpdate, onAdd }) => {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTask, setEditTask] = useState({ title: '', description: '', completed: false, userId: '' });
    const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
    const [newTask, setNewTask] = useState({ title: '', description: '', completed: false, userId: '' });

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

    const handleAddChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNewTask({ ...newTask, [name]: name === 'userId' ? Number(newValue) : newValue });
    };

    const handleAddClick = () => {
        onAdd(newTask);
        setNewTask({ title: '', description: '', completed: false, userId: '' });
        setShowForm(false);
    };

    return (
        
        <div>
            <header className="header">
                <h1>Gestor de Tareas - JESA</h1>
            </header>
            <button onClick={() => setShowForm(!showForm)} className="agregar">Agregar Tarea</button>
            {showForm && (
                <div className="task-form">
                    <input
                        name="title"
                        value={newTask.title}
                        onChange={handleAddChange}
                        placeholder="Nombre de la tarea"
                        required
                    />
                    <input
                        name="description"
                        value={newTask.description}
                        onChange={handleAddChange}
                        placeholder="Descripción"
                        required
                    />
                    <input
                        name="userId"
                        type="number"
                        value={newTask.userId}
                        onChange={handleAddChange}
                        placeholder="User ID"
                        required
                    />
                    <label className="form-field">
                        Completo:
                        <input
                            name="completed"
                            type="checkbox"
                            checked={newTask.completed}
                            onChange={handleAddChange}
                        />
                    </label>
                    <button onClick={handleAddClick} className="lista">Guardar Tarea</button>
                </div>
            )}
            <h3>Tareas agregadas:</h3>
            <div className="task-container">
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        {editTaskId === task.id ? (
                            <div className="edit-form">
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
                                <input
                                    name="userId"
                                    type="number"
                                    value={editTask.userId}
                                    onChange={handleChange}
                                    placeholder="User ID"
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
                            </div>
                        ) : (
                            <div className="task-content">
                                <span>{task.description} - {task.completed ? 'Completado' : 'Pendiente'}</span>
                                <div className="button-container">
                                    <button onClick={() => handleEditClick(task)} className='lista2'>Editar</button>
                                    <button onClick={() => onDelete(task.id)} className='lista3'>Eliminar</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
