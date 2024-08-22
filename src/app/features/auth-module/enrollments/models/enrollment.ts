import { Course } from "../../../courses/models/course.model";
import { User } from "../../login/models/user.model";

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  student: User;
  course: Course;
}

export interface LoadStudentsAndCoursesResponse {
  students: User[];
  courses: Course[];
}
export interface CreateEnrollmentPayload {
  userId: User['id'];
  courseId: Course['id'];
}
