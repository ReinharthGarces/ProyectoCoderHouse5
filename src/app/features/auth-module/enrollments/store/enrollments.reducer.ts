import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentsActions } from './enrollments.actions';
import { Enrollment } from '../models/enrollment';
import { Course } from '../../../courses/models/course.model';
import { User } from '../../login/models/user.model';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  isLoading: boolean
  isLoadingStudentsAndCourses: boolean;
  enrollments: Enrollment[];
  students: User[];
  courses: Course[];
  error: unknown
}

export const initialState: State = {
  isLoading: false,
  isLoadingStudentsAndCourses: false,
  enrollments: [],
  students: [],
  courses: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentsActions.loadEnrollments, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      enrollments: action.data,
    };
  }),
  on(EnrollmentsActions.loadEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(EnrollmentsActions.loadStudentsAndCourses, (state) => ({
    ...state,
    isLoadingStudentsAndCourses: true,
  })),

  on(EnrollmentsActions.loadStudentsAndCoursesSuccess, (state, action) => ({
    ...state,
    isLoadingStudentsAndCourses: false,
    courses: action.data.courses,
    students: action.data.students,
    error: null,
  })),

  on(EnrollmentsActions.loadStudentsAndCoursesFailure, (state, action) => ({
    ...state,
    isLoadingStudentsAndCourses: false,
    error: action.error,
  })),

  on(EnrollmentsActions.createEnrollmentSuccess, (state, action) => {
    console.log('action.data', action.data);
    return {
      ...state,
      enrollments: [...state.enrollments, action.data],
      error: null,
    };
  }),

  on(EnrollmentsActions.createEnrollmentFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});

