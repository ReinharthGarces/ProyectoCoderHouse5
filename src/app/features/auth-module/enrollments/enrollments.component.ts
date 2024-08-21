import { Component, OnInit } from '@angular/core';
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
    this.store.dispatch(EnrollmentsActions.loadStudentsAndCourses());
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
    }
  }
  
}