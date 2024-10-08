import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollmentsActions } from './enrollments.actions';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';


@Injectable()
export class EnrollmentsEffects {
  constructor(
    private actions$: Actions,
    private enrollmentsService: EnrollmentsService,
  ) {}
  
  createEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.createEnrollment),
      concatMap((action) =>
        this.enrollmentsService.addEnrollment(action.payload).pipe(
          map((data) => EnrollmentsActions.createEnrollmentSuccess({ data })),
          catchError((error) => of(EnrollmentsActions.createEnrollmentFailure({ error })))
        )
      )
    )
  });

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentsService.getEnrollments().pipe(
          map(data => EnrollmentsActions.loadEnrollmentsSuccess({ data })),
          catchError(error => of(EnrollmentsActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });

  loadStudentsAndProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadStudentsAndCourses),
      concatMap(() =>
        this.enrollmentsService.getStudentsAndCourses().pipe(
          map((data) =>
            EnrollmentsActions.loadStudentsAndCoursesSuccess({ data })
          ),
          catchError((error) =>
            of(EnrollmentsActions.loadStudentsAndCoursesFailure({ error }))
          )
        )
      )
    );
  });
}

