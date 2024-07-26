const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const getUsers = () => {
    const data = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2));
};

router.post('/register', (req, res) => {
    const users = getUsers();
    const { username, password } = req.body;
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = {
        id: users.length + 1,
        username,
        password,
    };
    users.push(newUser);
    saveUsers(users);
    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
    const users = getUsers();
    const { username, password } = req.body;
    console.log("Login attempt with username:", username); // Log de la solicitud de login
    const user = users.find(user => user.username === username);
    if (!user) {
        console.log("User not found"); // Log si el usuario no existe
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (user.password !== password) {
        console.log("Invalid password"); // Log si la contraseña es incorrecta
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
