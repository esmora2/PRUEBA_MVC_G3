import React, { useEffect, useState } from 'react';
import CourseView from '../views/courseView';
import CourseController from '../controllers/courseController';
import { Course } from '../models/course';

const CoursesPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const controller = new CourseController();

    useEffect(() => {
        async function fetchData() {
            const coursesData = await controller.initialize();
            setCourses(coursesData);
        }
        fetchData();
    }, []);

    const handleDeleteCourse = async (id: number) => {
        await controller.deleteCourse(id);
        setCourses(courses.filter(course => course.id !== id));
    };

    return (
        <div>
            <h1>Lista de Cursos</h1>
            <CourseView courses={courses} onDelete={handleDeleteCourse} />
        </div>
    );
};

export default CoursesPage;
