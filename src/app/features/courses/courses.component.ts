import { Component, OnInit } from '@angular/core';
import { Course } from './models/course.model';
import { CoursesService } from '../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent implements OnInit {
  courses: Course[];

  constructor(private coursesService: CoursesService) {
    this.courses = [];
  }

  ngOnInit(): void {
    this.courses = this.coursesService.getAllCourses();
  }
}