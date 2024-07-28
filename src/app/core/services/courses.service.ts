import { Injectable } from '@angular/core';
import { Course } from '../../features/courses/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor() { }
  private courses: Course[] = [
    {
      title: 'HTML',
      description: 'El lenguaje de marcado de hipertexto, Hypertext Markup Language o HTML es un lenguaje de programación que forma parte de la mayoría de las páginas web y aplicaciones en línea.',
      topics: ['Desarrollo web', 'Elementos de bloque', 'Elementos en línea', 'Ventajas y desventajas de HTML', 'Cómo se relacionan HTML, CSS y JavaScript']
    },
    {
      title: 'CSS',
      description: 'CSS son las siglas en inglés de Cascading Style Sheets, que significa «hojas de estilo en cascada». Es un lenguaje que se usa para estilizar elementos escritos en un lenguaje de marcado como HTML.',
      topics: ['La relación entre HTML y CSS', 'Estilos CSS interno, externo e inline', 'Ventajas de CSS', 'Las reglas de la estructura', 'Las posibilidades de personalización']
    },
    {
      title: 'JavaScript',
      description: 'JavaScript es un lenguaje de programación ligero que los desarrolladores web suelen utilizar para crear interacciones más dinámicas al desarrollar páginas web, aplicaciones, servidores e incluso juegos.',
      topics: ['ECMAScript', 'Aplicaciones web y móviles', 'Comportamiento interactivo en los sitios web', 'Construcción de servidores web y aplicaciones de servidor', '¿En qué se diferencia de otros lenguajes de programación?']
    },
    {
      title: 'React',
      description: 'ReactJS es una de las librerías más populares de JavaScript para el desarrollo de aplicaciones móviles y web. Creada por Facebook, contiene una colección de fragmentos de código JS reutilizables utilizados para crear interfaces de usuario.',
      topics: ['JSX', 'Virtual DOM', 'Componentes y Props', 'Gestión de Estado', 'Redux']
    },
    {
      title: 'Angular',
      description: 'Es un framework de ingeniería de software de código abierto que se utiliza para crear aplicaciones web de una sola página, es una creación de los ingenieros de Google, Misko Hevery y Adam Abrons.',
      topics: ['Enlace bidireccional de datos', 'Estructura de código', 'Compatibilidad móvil y de escritorio', 'Directivas', 'Futuro brillante']
    }
  ];


  getAllCourses(): Course[] {
    return this.courses;
  }
}
