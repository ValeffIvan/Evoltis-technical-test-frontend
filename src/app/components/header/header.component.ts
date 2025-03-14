import { Component, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [Menubar, ButtonModule, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = 'Usuario';

  ngOnInit() {
    const storedName = localStorage.getItem('userName');
    this.name = storedName ? storedName : 'Usuario';
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
