import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from '../students-form/students-form.component';
import { StudentsService } from '../../../core/services/student.service';
import { Router } from '@angular/router';
import { User } from '../../auth-module/login/models/user.model';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})

export class StudentsListComponent implements OnInit {
  dataSource: User[] = [];
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];
  showForm: boolean = false;
  isEditing: boolean = false;
  selectedStudent: User | null = null;
  isLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private studentsService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.isLoading = true; 
    setTimeout(() => {
      this.studentsService.students$.subscribe(students => {
        this.dataSource = students;
        this.isLoading = false;
      });
    }, 1000);
  }

  openDialog(student?: User): void {
    const dialogRef = this.dialog.open(StudentsFormComponent, {
      data: student || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!student) {
          this.addStudent(result);
        } else {
          this.isEditing = true;
          this.editStudent(result);
        }
      }
    });
  }

  addStudent(student: User): void {
    this.studentsService.addStudent(student);
  }

  editStudent(student: User): void {
    this.studentsService.editStudent(student);
  }

  deleteStudent(student: User): void {
    this.studentsService.deleteStudent(student);
  }

  viewProfile(studentId: number): void {
    this.router.navigate(['/students', studentId]);
  }
}
