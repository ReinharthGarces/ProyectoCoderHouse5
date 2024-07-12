import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})

export class StudentFormComponent {
  student: Student = { id: 0, firstName: '', lastName: '', email: '' };
  isEdit = false;

  constructor(private studentService: StudentService) { }

  addOrUpdateStudent(): void {
    if (this.isEdit) {
      this.studentService.updateStudent(this.student);
    } else {
      this.studentService.addStudent({ ...this.student, id: Date.now() });
    }
    this.resetForm();
  }

  resetForm(): void {
    this.student = { id: 0, firstName: '', lastName: '', email: '' };
    this.isEdit = false;
  }

  editStudent(student: Student): void {
    this.student = { ...student };
    this.isEdit = true;
  }
}