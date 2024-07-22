// pages/addCourses.tsx
import React from 'react';
import { useRouter } from 'next/router';
import AddCourseView from '../views/addCourseView';
import CourseController from '../controllers/courseController';
import { Course } from '../models/course';

const AddCoursesPage: React.FC = () => {
    const controller = new CourseController();
    const router = useRouter();

    const handleAddCourse = async (course: Course) => {
        await controller.addCourse(course);
        router.push('/courses'); // Redirigir a la página de cursos después de agregar un curso
    };

    return (
        <div>
            <h1>Agregar Nuevo Curso</h1>
            <AddCourseView onAddCourse={handleAddCourse} />
        </div>
    );
};

export default AddCoursesPage;
