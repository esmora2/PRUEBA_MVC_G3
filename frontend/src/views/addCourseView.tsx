// views/addCourseView.tsx
import React, { useState } from 'react';
import { Course } from '../models/course';
import Link from 'next/link';

interface AddCourseViewProps {
    onAddCourse: (course: Course) => void;
}

const AddCourseView: React.FC<AddCourseViewProps> = ({ onAddCourse }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCourse = new Course(Date.now(), name, description, instructor); // Usar Date.now() como ID temporal
        onAddCourse(newCourse);
        setName('');
        setDescription('');
        setInstructor('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Curso:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Instructor:</label>
                    <input
                        type="text"
                        value={instructor}
                        onChange={(e) => setInstructor(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Agregar Curso</button>
            </form>
            <div style={{ marginBottom: '20px' }}>
                <Link href="/" legacyBehavior>
                    <a>Regresar</a>
                </Link>
            </div>
        </div>
        
    );
};

export default AddCourseView;
