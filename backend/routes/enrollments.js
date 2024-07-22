const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const enrollmentsFilePath = path.join(__dirname, '../data/enrollments.json');

router.get('/course/:courseId', (req, res) => {
    const courseId = parseInt(req.params.courseId);
    fs.readFile(enrollmentsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read enrollments data' });
        }
        const enrollments = JSON.parse(data);
        const filteredEnrollments = enrollments.filter(enrollment => enrollment.courseId === courseId);
        res.json(filteredEnrollments);
    });
});

router.post('/', (req, res) => {
    const newEnrollment = req.body;

    fs.readFile(enrollmentsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read enrollments data' });
        }

        const enrollments = JSON.parse(data);
        enrollments.push(newEnrollment);

        fs.writeFile(enrollmentsFilePath, JSON.stringify(enrollments, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write enrollments data' });
            }
            res.status(201).json(newEnrollment);
        });
    });
});

module.exports = router;