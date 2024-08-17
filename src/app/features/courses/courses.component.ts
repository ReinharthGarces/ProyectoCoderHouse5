import { Component, OnInit } from '@angular/core';
import { Course } from './models/course.model';
import { CoursesService } from '../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
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
}