import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})

export class StudentListComponent{}
// export class StudentListComponent implements OnInit {
//   students: Student[];

//   constructor(private studentService: StudentService) { }

//   ngOnInit(): void {
//     this.students = this.studentService.getStudents();
//   }

//   deleteStudent(id: number): void {
//     this.studentService.deleteStudent(id);
//     this.students = this.studentService.getStudents();
//   }
// }