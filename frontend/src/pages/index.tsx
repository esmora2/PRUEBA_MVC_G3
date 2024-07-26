import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <div className="container">
            <header className="header">
                <h1>Sistema de Gestion de Tareas</h1>
                <nav className="nav">
                    <Link href="/courses">
                        Ver Tareas
                    </Link>
                    <Link href="/addCourses">
                         Agregar Tarea
                    </Link>
                    <Link href="/enrollCourse">
                        Inscribirse a un Curso
                    </Link>
                    <Link href="/courseDetails">
                        Detalles del Curso
                    </Link>
                </nav>
            </header>
            <div className="content">
                <img src="https://www.sancristobalsl.com/archivos/noticias/3218/20201003172024.img_8845-1370.jpg" alt="Descripción del curso" />
                <p className="description">
                    Nuestra plataforma ofrece una variedad de cursos diseñados para mejorar tus habilidades y conocimientos en diferentes áreas. Inscríbete hoy y comienza tu viaje de aprendizaje con nosotros.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
