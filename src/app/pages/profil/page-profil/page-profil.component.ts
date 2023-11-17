import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  connectedUser: UtilisateurDto = {};

  ngOnInit(): void {
    this.connectedUser = this.userService.getConnectedUser();
  }

  modifierMotDePasse(): void {
    this.router.navigate(['changermotdepasse']);
  }



}
