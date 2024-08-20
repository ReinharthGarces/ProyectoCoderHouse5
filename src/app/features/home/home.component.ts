import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  constructor() {}
  title = 'Cursos de Frontend';
  heroTitle = 'Domina el Desarrollo Frontend';
  heroSubtitle = 'Aprende HTML, CSS, JavaScript y mas con nuestros cursos interactivos.';
  coursesTitle = 'Nuestros Cursos';
  courses = [
    { 
      name: 'HTML para Principiantes',
      image: '/frameworks-img/html.jpg',
      description: 'Aprende los fundamentos del HTML para construir páginas web.'
    },
    { 
      name: 'CSS Avanzado',
      image: '/frameworks-img/css.jpg',
      description: 'Domina técnicas avanzadas de diseño y maquetación con CSS.'
    },
    { 
      name: 'JavaScript desde Cero',
      image: '/frameworks-img/javaScript.png',
      description: 'Descubre cómo JavaScript puede mejorar tu desarrollo frontend.'
    }
  ];

  // Testimonials data
  testimonialsTitle = 'Lo que dicen nuestros alumnos...';
  testimonials = [
    {
      name: 'Ana Gómez',
      feedback: 'Los cursos son increíbles y muy fáciles de seguir. ¡Aprendí mucho! La estructura de cada módulo está muy bien pensada y los ejemplos prácticos son muy útiles para comprender los conceptos.'
    },
    {
      name: 'Juan Pérez',
      feedback: 'Excelente contenido y presentación. Los ejercicios son muy útiles. Además, la interfaz de usuario es muy intuitiva y facilita el aprendizaje de una manera muy efectiva.'
    },
    {
      name: 'Laura Martínez',
      feedback: 'Gran experiencia de aprendizaje, lo recomiendo a todos. Los instructores son muy profesionales y siempre están dispuestos a ayudar con cualquier duda que pueda surgir.'
    },
    {
      name: 'Carlos Sánchez',
      feedback: 'La plataforma es excelente y los cursos son muy completos. Me encantó cómo se abordan los temas de manera clara y concisa, y los recursos adicionales son de gran ayuda.'
    },
    {
      name: 'María Fernández',
      feedback: 'He tomado varios cursos aquí y cada uno ha superado mis expectativas. La calidad del contenido es impresionante y los proyectos prácticos me han ayudado a mejorar habilidades.'
    },
    {
      name: 'Pedro García',
      feedback: 'Recomiendo estos cursos a cualquier persona que quiera aprender sobre desarrollo frontend. El soporte técnico es excelente y siempre están dispuestos a resolver cualquier problema.'
    }
  ];
  
  ngOnInit(): void {}
}
