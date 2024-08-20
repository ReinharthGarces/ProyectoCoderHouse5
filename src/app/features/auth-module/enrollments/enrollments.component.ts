import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../courses/models/course.model';
import { Store } from '@ngrx/store';
import { EnrollmentsActions } from './store/enrollments.actions';
import { Observable } from 'rxjs';
import { Enrollment } from './models/enrollment';
import { selectEnrollments, selectEnrollmentsCourses, selectEnrollmentsError, selectEnrollmentsIsLoading, selectEnrollmentsStudents } from './store/enrollments.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalService } from '../../../core/services/swal.service';
import { User } from '../login/models/user.model';


@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  enrollmentForm: FormGroup;
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  students$: Observable<User[]>;
  courses$: Observable<Course[]>;
    enrollmentSuccess: boolean = false;
  // courseId: string | null = null;
  // course: Course | null = null;


  constructor(
    private swalService: SwalService,
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading);
    this.students$ = this.store.select(selectEnrollmentsStudents);
    this.courses$ = this.store.select(selectEnrollmentsCourses);
    this.error$ = this.store.select(selectEnrollmentsError);
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentsActions.loadEnrollments());
    // this.courseId = this.route.snapshot.paramMap.get('id');
    // if (this.courseId) {
    //   this.loadCourseDetails(this.courseId);
    // }
  }

  addEnrollment(): void {
    if (this.enrollmentForm.invalid) {
      alert('El form es invalido');
    } else {
      this.store.dispatch(
        EnrollmentsActions.createEnrollment({
          payload: {
            courseId: this.enrollmentForm.get('coursesId')?.value,
            studentId: this.enrollmentForm.get('studentId')?.value,
          },
        })
      );
      this.swalService.sendSuccessNotification('Se agrego una inscripcion!');
      this.enrollmentSuccess = true;
    }
  }
  // loadCourseDetails(id: string): void {
  //   this.coursesService.getCourseById(id).subscribe({
  //     next: (course) => {
  //       this.course = course;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error loading course details:', err);
  //       this.isLoading = false;
  //     }
  //   });
  // }

  // enrollInCourse(): void {
  //   if (this.courseId) {
  //     this.coursesService.enrollInCourse(this.courseId).subscribe({
  //       next: () => {
  //         this.enrollmentSuccess = true;
  //       },
  //       error: (err) => {
  //         console.error('Error enrolling in course:', err);
  //       }
  //     });
  //   }
  // }
}
