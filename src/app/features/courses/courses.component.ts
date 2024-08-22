import { Component, OnInit } from '@angular/core';
import { Course } from './models/course.model';
import { CoursesService } from '../../core/services/courses.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  userRole: string = '';

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.authService.authUser$.subscribe(user => {
      if (user) {
        this.userRole = user.role;
      }
    });
  }

  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    });
  }

  getButtonText(): string {
    return this.userRole === 'Professor' ? 'Inscribir alumnos en cursos' : 'Inscribirse';
  }
}