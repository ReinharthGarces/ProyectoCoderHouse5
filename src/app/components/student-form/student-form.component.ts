import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})

export class StudentFormComponent {
  @Output() studentAdded = new EventEmitter<Student>();
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private matDialogRef: MatDialogRef<StudentFormComponent>,
    // @Inject(MAT_DIALOG_DATA) public editingStudent?: Student
  ) {
    this.studentForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // if (this.editingStudent) {
    //   this.studentForm.patchValue(this.editingStudent);
    // }
  }


  onSubmit(): void {
    if (this.studentForm.valid) {
      this.studentAdded.emit(this.studentForm.value);
      this.studentForm.reset();
    }
  }
}