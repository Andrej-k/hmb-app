import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { RestApiService } from '../../rest-api.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any;
  displayedColumns: string[] = ['label', 'name', 'OIB', 'gender', 'entryDate', 'service'];
  dataSource: any;

  constructor(private data: DataService, private rest: RestApiService, private router: Router) {}

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3000/api/users');
      data['success']
        ? (this.users = data['users'])
        : this.data.error('Could not fetch users.');
    } catch (error) {
      this.data.error(error['message']);
    }

    console.log(this.users);

    this.dataSource = this.users;
  }

  editUser(user: User) {
    this.router.navigate([`users/${user._id}`]);
  }

}
