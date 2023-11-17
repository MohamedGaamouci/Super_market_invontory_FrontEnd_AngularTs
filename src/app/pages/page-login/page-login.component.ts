import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthenticationRequest } from '../../../gs-api/src/models/authentication-request';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;
  view_password() {
    if (this.visible == true) { this.visible = false } else { this.visible = true }
  }
  authenticationRequest: AuthenticationRequest = {};
  errorMessage = '';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  email: string = 'gaamoucimohamed@gmail.com'
  new: boolean = false
  ngOnInit(): void {
    if (localStorage.getItem('connectedUser')) {
      this.router.navigate(['board'])
    }
    this.email = this.activatedRoute.snapshot.params.email;
    if (this.email) {
      this.new = true
      localStorage.clear()
      this.authenticationRequest.login = this.email
      this.authenticationRequest.password = "ADMIN"
    } else {
      this.new = false
    }

  }

  // tslint:disable-next-line:typedef
  login() {
    this.userService.login(this.authenticationRequest).subscribe(async (data) => {
      this.userService.setAccessToken(data);
      await this.getUserByEmail();

    }, error => {
      this.errorMessage = 'Login et / ou mot de passe incorrecte';
    });
  }

  getUserByEmail(): void {
    this.userService.getUserByEmail(this.authenticationRequest.login)
      .subscribe(user => {
        this.userService.setConnectedUser(user);
        while (true) {

          if (localStorage.getItem('connectedUser')) {
            if (!this.new) {
              this.router.navigate(['board'])
            } else {
              this.router.navigate(['changermotdepasse'])
            }
            break;
          } else {
            this.userService.setConnectedUser(user)

          }
        }
      });
  }

}
