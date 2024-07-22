import React from 'react';
import { Course } from '../models/course';
import Link from 'next/link';

interface CourseViewProps {
    courses: Course[];
    onDelete: (id: number) => void;
}

const CourseView: React.FC<CourseViewProps> = ({ courses, onDelete }) => {
    if (!courses || courses.length === 0) {
        return <div>No hay cursos disponibles.</div>;
    }

    const handleDelete = (id: number) => {
        onDelete(id);
    };

    return (
        <div style={{marginLeft: '50px', backgroundColor: '#E4F2F5', marginRight: '50px', borderRadius: '50px'}}>       
            {courses.map((course) => (
                <div key={course.id} style={{marginLeft: '50px'}}>
                    <h2>{course.name}</h2>
                    <p>{course.description}</p>
                    <p>Instructor: {course.instructor}</p>
                    <Link href={`/editCourse?id=${course.id}`} legacyBehavior>
                        <a style={{backgroundColor: 'white'}}>Editar</a>
                    </Link>
                    <a style={{backgroundColor: 'white'}}>
                    <button onClick={() => handleDelete(course.id)}>Eliminar</button>
                    </a>
                </div>
            ))}
            <div style={{ padding: '50px' }}>
                <Link href="/" legacyBehavior>
                    <a style={{backgroundColor: 'white'}}>Regresar</a>
                </Link>
            </div>
        </div>
    );
};

export default CourseView;
