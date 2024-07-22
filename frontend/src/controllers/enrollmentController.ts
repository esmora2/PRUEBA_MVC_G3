import axios from 'axios';
import { Enrollment } from '../models/enrollment';

class EnrollmentController {
    private static API_URL = 'http://localhost:5000/enrollments';

    async enrollInCourse(enrollment: Enrollment): Promise<void> {
        try {
            await axios.post(EnrollmentController.API_URL, enrollment);
        } catch (error) {
            console.error('Failed to enroll in course:', error);
        }
    }

    async getEnrollmentsByCourseId(courseId: number): Promise<Enrollment[]> {
        try {
            const response = await axios.get(`${EnrollmentController.API_URL}/course/${courseId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch enrollments:', error);
            return [];
        }
    }

    async getEnrollments(): Promise<Enrollment[]> {
        try {
            const response = await axios.get(EnrollmentController.API_URL);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch enrollments:', error);
            return [];
        }
    }
}

export default EnrollmentController;