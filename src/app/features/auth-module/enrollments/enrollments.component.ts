import { Component, OnInit, signal } from '@angular/core';
import { Course } from '../../courses/models/course.model';
import { Store } from '@ngrx/store';
import { EnrollmentsActions } from './store/enrollments.actions';
import { catchError, map, Observable, of } from 'rxjs';
import { Enrollment } from './models/enrollment';
import { selectEnrollments, selectEnrollmentsCourses, selectEnrollmentsError, selectEnrollmentsIsLoading, selectEnrollmentsStudents } from './store/enrollments.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalService } from '../../../core/services/swal.service';
import { User } from '../login/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  readonly panelOpenState = signal(false);
  enrollmentForm: FormGroup;
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  students$: Observable<User[]>;
  courses$: Observable<Course[]>;
  enrollmentSuccess: boolean = false;
  isProfessor: boolean = false;
  courseIdFromUrl: string | null = null;
  selectedCourse: Course | undefined;

  constructor(
    private swalService: SwalService,
    private fb: FormBuilder,
    private store: Store<any>,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading);
    this.courses$ = this.store.select(selectEnrollmentsCourses);
    this.error$ = this.store.select(selectEnrollmentsError);
    this.students$ = this.store.select(selectEnrollmentsStudents).pipe(
      map(students => students.filter(student => student.role === 'Student')),
      catchError(error => {
        console.error('Error fetching students:', error);
        return of([]);
      })
    );
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.store.dispatch(EnrollmentsActions.loadEnrollments());
    this.store.dispatch(EnrollmentsActions.loadStudentsAndCourses());
    this.initializeCourseId();
    this.initializeUserRole();
    this.loadSelectedCourse();
  }

  addEnrollment(): void {
    if (this.enrollmentForm.invalid) {
      alert('El formulario es inválido');
    } else {
      let payload = {
        userId: this.enrollmentForm.get('studentId')?.value,
        courseId: this.enrollmentForm.get('courseId')?.value,
      };
      this.store.dispatch(EnrollmentsActions.createEnrollment({ payload }));
      this.swalService.sendSuccessNotification('¡Inscripción añadida con éxito!');
      this.enrollmentForm.reset();
    }
  }

  private initializeCourseId(): void {
    this.route.paramMap.subscribe(params => {
      this.courseIdFromUrl = params.get('id');
      if (this.courseIdFromUrl) {
        this.enrollmentForm.patchValue({
          courseId: this.courseIdFromUrl
        });
      }
    });
  }

  private initializeUserRole(): void {
    this.authService.authUser$.subscribe(user => {
      if (user) {
        this.isProfessor = user.role === 'Professor';
        if (!this.isProfessor) {
          const storedUserId = user.id;
          this.enrollmentForm.patchValue({
            studentId: storedUserId
          });
        }
      }
    });
  }

  private loadSelectedCourse(): void {
    this.courses$.subscribe(courses => {
      if (this.courseIdFromUrl) {
        this.selectedCourse = courses.find(course => course.id === this.courseIdFromUrl);
      }
    });
  }
}