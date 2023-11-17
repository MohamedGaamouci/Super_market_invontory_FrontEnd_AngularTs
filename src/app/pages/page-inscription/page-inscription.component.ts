import { Component, OnInit } from '@angular/core';
import { EntrepriseDto } from '../../../gs-api/src/models/entreprise-dto';
import { EntrepriseService } from '../../services/entreprise/entreprise.service';
import { AdresseDto } from '../../../gs-api/src/models/adresse-dto';
import { UserService } from '../../services/user/user.service';
import { AuthenticationRequest } from '../../../gs-api/src/models/authentication-request';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, finalize, map } from 'rxjs/operators';
import { UtilisateurDto } from 'src/gs-api/src/models';
import { Observable } from 'rxjs';
import { StrictHttpResponse } from 'src/gs-api/src/strict-http-response';

@Component({
  selector: 'app-page-inscription',
  templateUrl: './page-inscription.component.html',
  styleUrls: ['./page-inscription.component.scss']
})
export class PageInscriptionComponent implements OnInit {

  entrepriseDto: EntrepriseDto = {};
  adresse: AdresseDto = {};
  errorsMsg: Array<string> = [];
  msg = 'Loading ...'
  msg2 = ''
  msg3 = ''

  constructor(
    private entrepriseService: EntrepriseService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('connectedUser')) {
      this.router.navigate(['board'])
    }
  }
  isLoading = false;

  inscrire(): void {
    this.errorsMsg = []
    this.isLoading = true
    this.entrepriseDto.adresse = this.adresse;
    this.entrepriseService.sinscrire(this.entrepriseDto)
      .subscribe(entrepriseDto => {

        this.connectEntreprise();

      }, error => {
        this.isLoading = false
        this.errorsMsg = error.error.errors as Array<string>;

      });
  }



  connectEntreprise(): void {
    const authenticationRequest: AuthenticationRequest = {
      login: this.entrepriseDto.email,
      password: 'ADMIN'
    };
    this.router.navigate(['login',this.entrepriseDto.email])
    // this.userService.login(authenticationRequest)
    //   .pipe(
    //     finalize(() => {
    //     })
    //   )
    //   .subscribe(async (response) => {
    //     try {

    //       await this.userService.setAccessToken(response);
    //       setTimeout(() => {
    //         this.getUserByEmail(authenticationRequest.login);
    //         localStorage.setItem('origin', 'inscription');
    //       }, 2);

    //     } catch (error) {
    //     }
    //   });
  }








  getUserByEmail(email?: string): void {

    this.userService.getUserByEmail(email)
      .subscribe(user => {

        if (!localStorage.getItem('connectedUser')) {
          localStorage.setItem('connectedUser', JSON.stringify(user));
          setTimeout(function () {
            window.location.replace('changermotdepasse')
          }, 5);
        };

        console.log('passed')

      });


  }


}
