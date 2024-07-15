import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {
  @Output() studentAdded = new EventEmitter<Student>();
  studentForm: FormGroup;
  isEditing: boolean;
  student: Student | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.isEditing = !!data?.id;
    this.studentForm = this.fb.group({
      id: [data?.id || ''],
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    console.log(this.data)
      if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.studentAdded.emit(this.studentForm.value);
      this.dialogRef.close(this.studentForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
