import React from 'react';
import EnrollCourseView from '../views/enrollCourseView';
import Link from 'next/link';

const EnrollCoursePage: React.FC = () => {
    return (
        <div>
            <h1>Inscribirse en un Curso</h1>
            <EnrollCourseView />
            <div style={{ marginBottom: '20px' }}>
                <Link href="/" legacyBehavior>
                    <a>Regresar</a>
                </Link>
            </div>
        </div>
    );
};

export default EnrollCoursePage;