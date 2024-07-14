import { Component, Input, Inject, Output, EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})

export class StudentFormComponent implements OnInit, OnChanges {
  @Input() student: Student | null = null;
  @Input() isEditing: boolean = false;
  @Output() studentAdded = new EventEmitter<Student>();
  @Output() formClosed = new EventEmitter<void>();
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder ) {
    this.studentForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.studentAdded.emit(this.studentForm.value);
      this.studentForm.reset();
    }
  }
}