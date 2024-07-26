const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const getTasks = () => {
    const data = fs.readFileSync(path.join(__dirname, '../data/tasks.json'));
    return JSON.parse(data);
};

const saveTasks = (tasks) => {
    fs.writeFileSync(path.join(__dirname, '../data/tasks.json'), JSON.stringify(tasks, null, 2));
};

router.post('/', (req, res) => {
    const tasks = getTasks();
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, 
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false,
        userId: Number(req.body.userId) 
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

router.get('/', (req, res) => {
    const tasks = getTasks();
    res.json(tasks);
});

router.put('/:id', (req, res) => {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id));
    console.log("Updating task with ID:", req.params.id); 
    if (taskIndex !== -1) {
        console.log("Task found. Updating:", tasks[taskIndex], "with:", req.body); 
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body, userId: Number(req.body.userId) }; 
        saveTasks(tasks);
        res.json(tasks[taskIndex]);
    } else {
        console.log("Task not found with ID:", req.params.id); 
        res.status(404).json({ message: 'Task not found' });
    }
});

router.delete('/:id', (req, res) => {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    saveTasks(tasks);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
