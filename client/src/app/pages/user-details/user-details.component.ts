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

  pageType: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      if (res['id']) {
        this.pageType = 'editPage';
        this.rest
          .get(`http://localhost:3000/api/user/${res['id']}`)
          .then(data => {
            data['success']
              ? (this.user = data['user'])
              : this.router.navigate(['/']);
          })
          .catch(error => this.data.error(error['message']));
      } else {
        this.pageType = 'newPage';
      }
    });
  }

  async saveUser() {
    if (this.pageType === 'newPage') {
      try {
        const data = await this.rest.post(
          'http://localhost:3000/api/users',
          this.user
        );
        data['success']
          ? this.router.navigate(['/users/'])
            .then(() => this.data.success(data['message']))
            .catch(error => this.data.error(error))
          : this.data.error(data['message']);
      } catch (error) {
        this.data.error(error['message']);
      }
    } else if (this.pageType === 'editPage') {
      try {
        const data = await this.rest.put(
          `http://localhost:3000/api/user/${this.user['id']}`,
          this.user
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

}
