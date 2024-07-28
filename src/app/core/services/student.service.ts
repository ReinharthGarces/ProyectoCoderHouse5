import { Injectable } from '@angular/core';
import { Student } from '../../features/students/models/student.model';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  constructor(private swalService: SwalService) {}
  private students: Student[] = [
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
    },
    {
      id: 6,
      firstName: 'Sophia',
      lastName: 'Williams',
      email: 'sophia.williams@example.com'
    }
  ];

  getAllStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    const maxId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) : 0;
    student.id = maxId + 1;
    this.students.push(student);
    this.swalService.success('Estudiante agregado');
  }

  editStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
      this.swalService.success('Datos editados');
    }
  }

  deleteStudent(student: Student, callback: () => void): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.swalService.delete('¿Está seguro de que desea eliminar este estudiante?')
        .then((result) => {
          if (result.isConfirmed) {
            this.students.splice(index, 1);
            this.swalService.success('Estudiante eliminado');
            callback();
          } else {
            console.log('Eliminación cancelada por el usuario.');
          }
        });
    } else {
      console.log('Estudiante no encontrado.');
    }
  }
}
