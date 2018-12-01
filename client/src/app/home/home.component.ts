import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any;
  displayedColumns: string[] = ['label', 'name', 'OIB'];
  dataSource: any;

  constructor(private data: DataService, private rest: RestApiService) {}

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3000/api/users');
      data['success']
        ? (this.users = data['users'])
        : this.data.error('Could not fetch users.');
    } catch (error) {
      this.data.error(error['message']);
    }

    this.dataSource = this.users;
  }

  editUser(user) {
    console.log(user);
  }

}
