import axios from 'axios';

export default async (req, res) => {
    const { method } = req;
    const token = req.headers['x-auth-token'];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const config = {
            headers: {
                'x-auth-token': token
            }
        };
        let result;
        switch (method) {
            case 'GET':
                result = await axios.get('http://localhost:5000/api/tasks', config);
                return res.status(200).json(result.data);
            case 'POST':
                result = await axios.post('http://localhost:5000/api/tasks', req.body, config);
                return res.status(201).json(result.data);
            // Add other cases for PUT and DELETE if necessary
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
