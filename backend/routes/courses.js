const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const coursesFilePath = path.join(__dirname, '../data/courses.json');

router.get('/', (req, res) => {
    fs.readFile(coursesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read courses data' });
        }
        res.json(JSON.parse(data));
    });
});

router.post('/', (req, res) => {
    const newCourse = req.body;

    fs.readFile(coursesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read courses data' });
        }

        const courses = JSON.parse(data);
        courses.push(newCourse);

        fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write courses data' });
            }
            res.status(201).json(newCourse);
        });
    });
});

router.put('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const updatedCourse = req.body;

    fs.readFile(coursesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read courses data' });
        }

        let courses = JSON.parse(data);
        const index = courses.findIndex(course => course.id === courseId);
        if (index === -1) {
            return res.status(404).json({ error: 'Course not found' });
        }

        courses[index] = { ...courses[index], ...updatedCourse, id: courses[index].id };

        fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write courses data' });
            }
            res.json(courses[index]);
        });
    });
});

router.delete('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);

    fs.readFile(coursesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read courses data' });
        }

        let courses = JSON.parse(data);
        const index = courses.findIndex(course => course.id === courseId);
        if (index === -1) {
            return res.status(404).json({ error: 'Course not found' });
        }

        courses.splice(index, 1);

        fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write courses data' });
            }
            res.status(204).end();
        });
    });
});


module.exports = router;
