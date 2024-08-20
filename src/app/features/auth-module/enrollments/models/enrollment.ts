import { Course } from "../../../courses/models/course.model";
import { User } from "../../login/models/user.model";

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
}

export interface LoadStudentsAndCoursesResponse {
  students: User[];
  courses: Course[];
}
export interface CreateEnrollmentPayload {
  studentId: string;
  courseId: string;
}