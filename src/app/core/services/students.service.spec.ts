import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentsService } from './student.service';
import { Student } from '../../features/students/models/student.model';
import { environment } from '../../../environments/environment.development';
import { SwalService } from './swal.service';


describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;
  let swalServiceSpy: jasmine.SpyObj<SwalService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SwalService', ['success', 'delete']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StudentsService,
        { provide: SwalService, useValue: spy }
      ]
    });

    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
    swalServiceSpy = TestBed.inject(SwalService) as jasmine.SpyObj<SwalService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch students', () => {
    const dummyStudents: Student[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }
    ];

    service.getAllStudents().subscribe(students => {
      expect(students.length).toBe(1);
      expect(students).toEqual(dummyStudents);
    });

    const req = httpMock.expectOne(`${environment.apiURL}/students`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStudents);
  });
});
