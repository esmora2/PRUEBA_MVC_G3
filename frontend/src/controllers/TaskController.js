import axios from 'axios';

const TaskController = {
    getTasks: async (token) => {
        const res = await axios.get('http://localhost:5000/api/tasks', {
            headers: { 'x-auth-token': token }
        });
        return res.data;
    },

    createTask: async (task, token) => {
        const res = await axios.post('http://localhost:5000/api/tasks', task, {
            headers: { 'x-auth-token': token }
        });
        return res.data;
    },

    updateTask: async (id, task, token) => {
        const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
            headers: { 'x-auth-token': token }
        });
        return res.data;
    },

    deleteTask: async (id, token) => {
        const res = await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
            headers: { 'x-auth-token': token }
        });
        return res.data;
    }
};

export default TaskController;
