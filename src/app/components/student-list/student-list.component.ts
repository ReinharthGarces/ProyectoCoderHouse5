import { Component} from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentFormComponent } from '../student-form/student-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})

export class StudentListComponent  {
  constructor(private dialog: MatDialog) {}
  students: Student[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com'
    },
    {
      id: 3,
      firstName: 'Samuel',
      lastName: 'Green',
      email: 'samuel.green@example.com'
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com'
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
    }
  ];

  dataSource = this.students;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  showForm : boolean = false; 


  addStudent(student: Student) {
    const maxId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) : 0;
    student.id = maxId + 1;
    this.students.push(student);
    this.dataSource = [...this.students]; 
    this.showForm = false; 
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  // openDialog() {
  //   this.dialog
  //   .open(StudentFormComponent)
  //   .afterClosed()
  //   .subscribe({
  //     next: (value) =>{
  //       console.log('RECIBIMOS ESTE VALOR: ', value)
  //     }

  //   });
  // }

  // editCourse(editingStudent: Student) {
  //   this.dialog
  //     .open(StudentFormComponent, { data: editingStudent })
  //     .afterClosed()
  //     .subscribe({
  //       next: (value) => {
  //         if (!!value) {
  //           this.dataSource = this.dataSource.map((el) =>
  //             el.id === editingStudent.id
  //               ? { ...value, id: editingStudent.id }
  //               : el
  //           );
  //         }
  //       },
  //     });
  // }

  deleteStudent(student: Student) {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students.splice(index, 1);
      this.dataSource = [...this.students]; // Actualizamos la tabla
    }
  }
}