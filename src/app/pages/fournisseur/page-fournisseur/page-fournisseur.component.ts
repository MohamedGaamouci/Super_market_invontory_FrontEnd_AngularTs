import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CltfrsService } from '../../../services/cltfrs/cltfrs.service';
import { FournisseurDto } from '../../../../gs-api/src/models/fournisseur-dto';
import { RolesDto, UtilisateurDto } from 'src/gs-api/src/models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-fournisseur',
  templateUrl: './page-fournisseur.component.html',
  styleUrls: ['./page-fournisseur.component.scss']
})
export class PageFournisseurComponent implements OnInit {

  listFournisseur: Array<FournisseurDto> = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private cltFrsService: CltfrsService,
    private utilisateurService: UserService
  ) { }
  isLoading = true
  localuser: UtilisateurDto = {}
  role: RolesDto = {}

  ngOnInit(): void {
    this.findAllFournisseurs();
    this.showall()
  }
  showall() {
    this.localuser = this.utilisateurService.getConnectedUser()
    if (this.localuser.roles != undefined) {
      this.role = this.localuser.roles[0]
      const R = this.role.roleName
      if (R == 'ADMIN') {
        this.isLoading = true

      }
      else if (R == 'USER') {
        this.isLoading = false

      }
      else {
        alert('There is no Role')
      }
    }
  }

  findAllFournisseurs(): void {
    this.cltFrsService.findAllFournisseurs()
      .subscribe(fournisseurs => {
        this.listFournisseur = fournisseurs.reverse();
      });
  }

  nouveauFournisseur(): void {
    this.router.navigate(['nouveaufournisseur']);
  }

  handleSuppression(event: any): void {
    if (event === 'success') {
      this.findAllFournisseurs();
    } else {
      this.errorMsg = event;
    }
  }
}
