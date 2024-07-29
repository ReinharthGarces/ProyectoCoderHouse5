import { Component, OnInit} from '@angular/core';
import { Student } from '../models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from '../students-form/students-form.component';
import { StudentsService } from '../../../core/services/student.service';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})

export class StudentsListComponent implements OnInit{
  constructor(
  private studentsService: StudentsService,
  private dialog: MatDialog) {}
  dataSource: Student[] = []
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];
  showForm: boolean = false;
  isEditing: boolean = false;
  selectedStudent: Student | null = null;

  ngOnInit(): void {
    this.updateDataSource();
  }

  
  public deleteDataUpdate() {
    this.studentsService.students$.subscribe (res => {
      [...this.dataSource] = res
    })
  }

  private updateDataSource(): void {
    this.dataSource = this.studentsService.getAllStudents();
    this.dataSource = [...this.dataSource];
  }

  openDialog(student?: Student): void {
    const dialogRef = this.dialog.open(StudentsFormComponent, {
      data:student || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!student) {
          this.addStudent(result);
        } else {
          this.isEditing = true;
          this.editStudent(result)
        }
      }
    });
  }
  
  addStudent(student: Student): void {
    this.studentsService.addStudent(student);
    this.updateDataSource();
    this.showForm = false;
    this.isEditing = false;
    this.selectedStudent = null;
  }

  editStudent(student: Student): void {
    this.studentsService.editStudent(student);
    this.updateDataSource();
    this.selectedStudent = student;
    this.isEditing = true;
  }

  deleteStudent(student: Student): void {
    this.studentsService.deleteStudent(student)
    this.deleteDataUpdate();
  }
}
