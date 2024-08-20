import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})

export class ToolbarComponent implements OnInit{
  @Output() drawerToggle = new EventEmitter<void>();
  userName: string | null = '';

  constructor() {}

  ngOnInit() {
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      const user = JSON.parse(authUser);
      this.userName = user.firstName;
    }
  }

  toggleDrawer() {
    this.drawerToggle.emit();
  }
}
