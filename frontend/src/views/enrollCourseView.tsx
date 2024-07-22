import React, { useState, useEffect } from 'react';
import EnrollmentController from '../controllers/enrollmentController';
import { Enrollment } from '../models/enrollment';

const EnrollCourseView: React.FC = () => {
    const [courseId, setCourseId] = useState<number | null>(null);
    const [studentId, setStudentId] = useState<number | null>(null);
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const enrollmentController = new EnrollmentController();

    const handleEnroll = async () => {
        if (courseId !== null && studentId !== null) {
            await enrollmentController.enrollInCourse({ courseId, studentId });
            alert('Inscripción exitosa');
            setEnrollments([...enrollments, { courseId, studentId }]);
        }
    };

    useEffect(() => {
        if (courseId) {
            enrollmentController.getEnrollmentsByCourseId(courseId).then(setEnrollments);
        }
    }, [courseId]);

    const enrolledCount = enrollments.length;

    return (
        <div>
            <div>
                <label>ID del Curso:</label>
                <input
                    type="number"
                    value={courseId || ''}
                    onChange={(e) => setCourseId(Number(e.target.value))}
                    required
                />
            </div>
            <div>
                <label>ID del Estudiante:</label>
                <input
                    type="number"
                    value={studentId || ''}
                    onChange={(e) => setStudentId(Number(e.target.value))}
                    required
                />
            </div>
            <button  onClick={handleEnroll} disabled={courseId === null || studentId === null}>Inscribirse</button>
            <div>
                <h2>Estudiantes Inscritos</h2>
                <p>Número de estudiantes inscritos: {enrolledCount}</p>
                <ul>
                    {enrollments.map((enrollment, index) => (
                        <li key={index}>Estudiante ID: {enrollment.studentId}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EnrollCourseView;