import axios from 'axios';
import { Course } from '../models/course';

class CourseController {
    private static API_URL = 'http://localhost:5000/courses';

    async initialize(): Promise<Course[]> {
        try {
            const response = await axios.get(CourseController.API_URL);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            return [];
        }
    }

    async addCourse(course: Course): Promise<void> {
        try {
            await axios.post(CourseController.API_URL, course);
        } catch (error) {
            console.error('Failed to add course:', error);
        }
    }

    async updateCourse(course: Course): Promise<void> {
        try {
            await axios.put(`${CourseController.API_URL}/${course.id}`, course);
        } catch (error) {
            console.error('Failed to update course:', error);
        }
    }

    async deleteCourse(courseId: number): Promise<void> {
        try {
            await axios.delete(`${CourseController.API_URL}/${courseId}`);
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    }


    async getAllCourses(): Promise<Course[]> {
        try {
            const response = await axios.get(CourseController.API_URL);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            return [];
        }
    }
}

export default CourseController;
