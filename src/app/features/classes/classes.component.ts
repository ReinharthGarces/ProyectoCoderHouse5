import { Component, OnInit } from '@angular/core';
import { Class, Schedule } from './models/class.model';
import { CoursesService } from '../../core/services/courses.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})

export class ClassesComponent implements OnInit {
  classes: Class[] = [];

  constructor(private coursesService: CoursesService) { 
    const courses = this.coursesService.getAllCourses();

    const schedules: { [key: string]: Schedule[] } = {
  'HTML': [
    { day: 'Lunes', time: '09:00 - 11:00', instructor: 'Carmelo Anthony', preview: 'Introducción a los elementos y la estructura de HTML.' },
    { day: 'Miércoles', time: '13:00 - 15:00', instructor: 'Khawi Leonard', preview: 'Formularios y elementos de entrada en HTML.' },
    { day: 'Viernes', time: '10:00 - 12:00', instructor: 'Bob White', preview: 'Elementos multimedia y contenido incrustado.' },
    { day: 'Sábado', time: '11:00 - 13:00', instructor: 'Alice Blue', preview: 'Mejores prácticas de SEO en HTML.' }
  ],
  'CSS': [
    { day: 'Martes', time: '10:00 - 12:00', instructor: 'Alice Johnson', preview: 'Selectores y propiedades básicas de CSS.' },
    { day: 'Jueves', time: '14:00 - 16:00', instructor: 'Bob Brown', preview: 'Sistemas de diseño con Flexbox y Grid.' },
    { day: 'Viernes', time: '09:00 - 11:00', instructor: 'Clara Red', preview: 'Principios de diseño responsivo.' },
    { day: 'Domingo', time: '12:00 - 14:00', instructor: 'Diana Green', preview: 'Animaciones y transiciones en CSS.' }
  ],
  'JavaScript': [
    { day: 'Miércoles', time: '10:00 - 12:00', instructor: 'Chris Lee', preview: 'Introducción a la sintaxis y tipos de JavaScript.' },
    { day: 'Viernes', time: '14:00 - 16:00', instructor: 'Sara White', preview: 'Manipulación del DOM y manejo de eventos.' },
    { day: 'Sábado', time: '09:00 - 11:00', instructor: 'Eve Purple', preview: 'Programación asíncrona con promesas y async/await.' },
    { day: 'Lunes', time: '15:00 - 17:00', instructor: 'Frank Yellow', preview: 'Características de JavaScript ES6 y más allá.' }
  ],
  'React': [
    { day: 'Lunes', time: '10:00 - 12:00', instructor: 'Mike Green', preview: 'Introducción a los componentes de React y JSX.' },
    { day: 'Jueves', time: '14:00 - 16:00', instructor: 'Linda Black', preview: 'Gestión del estado con hooks.' },
    { day: 'Sábado', time: '11:00 - 13:00', instructor: 'Greg Orange', preview: 'Creación y uso de hooks personalizados.' },
    { day: 'Martes', time: '16:00 - 18:00', instructor: 'Helen Pink', preview: 'React Router para la navegación.' }
  ],
  'Angular': [
    { day: 'Martes', time: '11:00 - 13:00', instructor: 'Emily Clarke', preview: 'Introducción a Angular y su arquitectura.' },
    { day: 'Viernes', time: '15:00 - 17:00', instructor: 'Jack Black', preview: 'Creación de componentes y servicios en Angular.' },
    { day: 'Domingo', time: '14:00 - 16:00', instructor: 'Ivy White', preview: 'Formularios y validación en Angular.' },
    { day: 'Miércoles', time: '17:00 - 19:00', instructor: 'Oscar Blue', preview: 'Enrutamiento y navegación en Angular.' }
  ]
    };

    this.classes = courses.map(course => ({
      title: `Clases de ${course.title}`,
      description: `Detalles y cronograma de las proximas clases de ${course.title}`,
      schedule: schedules[course.title] || []
    }));
  }

  ngOnInit(): void {}
}