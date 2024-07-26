import axios from 'axios';

const UserController = {
    register: async (user) => {
        const res = await axios.post('http://localhost:5000/api/users/register', user);
        return res.data;
    },

    login: async (credentials) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', credentials);
            return res.data;
        } catch (error) {
            console.error("Login error:", error.response.data);
            throw error;
        }
    }
};

export default UserController;
