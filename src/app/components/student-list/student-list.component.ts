import { Component} from '@angular/core';
import { Student } from '../../models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})

export class StudentListComponent  {
  constructor(public dialog: MatDialog) {}
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
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];
  showForm: boolean = false;
  isEditing: boolean = false;
  selectedStudent: Student | null = null;

  openDialog(student?: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      data:student || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        debugger
        if (!student) {
          this.addStudent(result);
        } else {
          this.isEditing = true;
          this.editStudent(result)
        }
      }
    });
  }
  
  addStudent(student: Student) {
    const maxId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) : 0;
    student.id = maxId + 1;
    this.students.push(student);

    this.dataSource = [...this.students]; 
    this.showForm = false; 
    this.isEditing = false;
    this.selectedStudent = null;
  }

  editStudent(student: Student) {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
    this.students[index] = student;

    this.dataSource = [...this.students]; 
    this.selectedStudent = student;
    this.isEditing = true;
    this.showForm = true;
    }
  }

  deleteStudent(student: Student) {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students.splice(index, 1);
      this.dataSource = [...this.students];
    }
  }
}
