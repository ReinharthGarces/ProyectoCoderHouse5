import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  courses = [
    { id: 1, name: 'Angular for Beginners', description: 'Learn the basics of Angular framework.' },
    { id: 2, name: 'Advanced React', description: 'Dive deep into React and learn advanced concepts.' },
    { id: 3, name: 'Vue.js Essentials', description: 'Essential concepts and features of Vue.js.' }
  ];

  students = [
    { id: 1, name: 'John Doe', enrolledCourses: ['Angular for Beginners', 'Advanced React'] },
    { id: 2, name: 'Jane Smith', enrolledCourses: ['Vue.js Essentials'] }
  ];

  classes = [
    { id: 1, name: 'Frontend Mastery', schedule: 'Mon, Wed, Fri - 10:00 AM to 12:00 PM' },
    { id: 2, name: 'Fullstack Development', schedule: 'Tue, Thu - 2:00 PM to 5:00 PM' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
