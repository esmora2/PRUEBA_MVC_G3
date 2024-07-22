// models/course.ts
class Course {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public instructor: string
    ) {}
}

class CourseModel {
    private courses: Course[] = [];

    addCourse(course: Course): void {
        this.courses.push(course);
    }

    getCourses(): Course[] {
        return this.courses;
    }
}

export { Course, CourseModel };
