import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../auth-module/login/models/user.model';


@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.scss'
})
export class StudentsFormComponent implements OnInit {
  @Output() studentAdded = new EventEmitter<User>();
  studentForm: FormGroup;
  isEditing: boolean;
  student: User | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.isEditing = !!data?.id;
    this.studentForm = this.fb.group({
      id: [data?.id || ''],
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      password: [data?.password || '', Validators.required]
    });
  }

  ngOnInit(): void {
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
