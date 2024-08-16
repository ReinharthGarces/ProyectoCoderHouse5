import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../core/services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  student: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.studentService.getStudentById(studentId).subscribe(
        (data) => {
          this.student = data;
        },
        (error) => {
          console.error('Error al cargar los datos del estudiante', error);
        }
      );
    }
  }
}