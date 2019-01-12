import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hmb';

  constructor(private router: Router, private data: DataService) {
    this.data.getProfile();
    console.log(data);
  }

  get token() {
    return localStorage.getItem('token');
  }

  logout() {
    this.data.employee = {};
    localStorage.clear();
    this.router.navigate(['']);
  }
}
