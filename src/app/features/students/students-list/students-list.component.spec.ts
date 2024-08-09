import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsListComponent } from './students-list.component';
import { StudentsService } from '../../../core/services/student.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Student } from '../models/student.model';
import { MaterialModule } from '../../../core/material/material.module';


describe('StudentsListComponent', () => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;
  let studentsServiceMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    studentsServiceMock = jasmine.createSpyObj('StudentsService', ['students$', 'addStudent', 'editStudent', 'deleteStudent']);
    studentsServiceMock.students$ = of([
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }
    ]);

    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });

    await TestBed.configureTestingModule({
      declarations: [ StudentsListComponent ],
      imports: [ MatDialogModule, MaterialModule ],
      providers: [
        { provide: StudentsService, useValue: studentsServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dataSource on initialization', () => {
    expect(component.dataSource.length).toBe(0);
  });

  it('should open dialog and add student', () => {
    const newStudent: Student = { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(newStudent) });

    component.openDialog();
    expect(studentsServiceMock.addStudent).toHaveBeenCalledWith(newStudent);
  });
});