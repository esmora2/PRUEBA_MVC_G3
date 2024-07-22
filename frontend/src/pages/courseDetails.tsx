import React, { useState, useEffect } from 'react';
import CourseController from '../controllers/courseController';
import { Course } from '../models/course';
import Link from 'next/link';

const CourseListPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const courseController = new CourseController();

    useEffect(() => {
        courseController.getAllCourses().then(setCourses).catch((error) => {
            console.error('Failed to fetch courses:', error);
        });
    }, []);

    if (courses.length === 0) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Lista de Cursos</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <h2>{course.name}</h2>
                        <p>Descripción: {course.description}</p>
                        <p>Instructor: {course.instructor}</p>
                    </li>
                ))}
            </ul>
            <Link href="/" legacyBehavior>
                    <a>Regresar</a>
                </Link>
        </div>
    );
};

export default CourseListPage;