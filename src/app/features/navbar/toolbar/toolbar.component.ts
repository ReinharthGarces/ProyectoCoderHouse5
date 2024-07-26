import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})

export class ToolbarComponent implements OnInit{
  @Output() drawerToggle = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  toggleDrawer() {
    this.drawerToggle.emit();
  }
}
