import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { RestApiService } from '../../rest-api.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  users: any;
  displayedColumns: string[] = ['label', 'name', 'oib', 'gender', 'entryDate', 'service', 'actions'];
  dataSource = new MatTableDataSource(this.users);

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

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

  get token() {
    return localStorage.getItem('token');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user: User) {
    this.router.navigate([`users/${user._id}`]);
  }

  async deleteUser(user: User) {
    try {
      const data = await this.rest.delete(
        `http://localhost:3000/api/user/${user._id}`
      );
      data['success']
        ? this.router.navigate(['/'])
          .then(async () => {
            this.data.success(data['message']);
            this.matSnackBar.open('Korisnik je izbrisan.', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
            this.ngOnInit();
          })
          .catch(error => this.data.error(error))
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
