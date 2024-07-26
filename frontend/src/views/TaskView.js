import React, { useState, useEffect } from 'react';
import TaskController from '../controllers/TaskController';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

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

    return (
        <div>
            <TaskForm token={token} onTaskCreated={handleTaskCreated} />
            <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
    );
};

export default TaskView;
