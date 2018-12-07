import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../data.service';
import { RestApiService } from '../../rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any = {
    label: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.user);
    this.activatedRoute.params.subscribe(res => {
      this.rest
        .get(`http://localhost:3000/api/users/${res['id']}`)
        .then(data => {
          data['success']
            ? (this.user = data['user'])
            : this.router.navigate(['/']);
            console.log(data['user']);
        })
        .catch(error => this.data.error(error['message']));
    });
  }

  async addUser() {
    try {
      const formData = new FormData();
      console.log(formData);
      const data = await this.rest.post(
        'http://localhost:3000/api/users',
        formData
      );
      data['success']
        ? this.router.navigate(['/users/'])
          .then(() => this.data.success(data['message']))
          .catch(error => this.data.error(error))
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
