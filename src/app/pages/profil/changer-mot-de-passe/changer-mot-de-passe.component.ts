import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangerMotDePasseUtilisateurDto } from '../../../../gs-api/src/models/changer-mot-de-passe-utilisateur-dto';
import { UserService } from '../../../services/user/user.service';
import { AdresseDto, UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.scss']
})
export class ChangerMotDePasseComponent implements OnInit {
  visible: boolean = true;
  view_password() {
    if (this.visible == true) { this.visible = false }
    else { this.visible = true }
  }
  changerMotDePasseDto: ChangerMotDePasseUtilisateurDto = {};
  ancienMotDePasse = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  user: UtilisateurDto = {};
  adress_user: AdresseDto = {};
  ngOnInit(): void {
    if (localStorage.getItem('origin') && localStorage.getItem('origin') === 'inscription') {
      this.ancienMotDePasse = 'som3R@nd0mP@$$word';
      localStorage.removeItem('origin');
    } this.get_data()
  }

  cancel(): void {
    this.router.navigate(['profil']);
  }

  changerMotDePasseUtilisateur(): void {
    this.changerMotDePasseDto.id = this.userService.getConnectedUser().id;
    this.userService.changerMotDePasse(this.changerMotDePasseDto)
      .subscribe(data => {
        // rien faire
        this.router.navigate(['profil']);
      });
  }
  get_data() {
    this.user = this.userService.getConnectedUser() as UtilisateurDto;
    this.adress_user = this.userService.getConnectedUser().adresse as AdresseDto;
  }



}
