import { Component, OnInit } from '@angular/core';
import { WebWorkerController } from './web-worker-controller/web-worker-controller';
import { User } from './user-controller/user-model';
import { UserController } from './user-controller/user-controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-web-worker';
  user: User;
  savedUser: User;

  ngOnInit() {
    const userContoller: UserController = new UserController();
    new WebWorkerController().get('user/retrieve-user').subscribe((user: User) => {
      this.user = user;
    });
    new WebWorkerController().post('user/create-user', {
      firstName: 'Yaduveer',
      lastName: 'H'
    }).subscribe((user: User) => {
      this.savedUser = user;
    });
  }

}