import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { UserService } from 'src/app/services/user/user.service';
import { RolesDto, UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-detail-clt-frs',
  templateUrl: './detail-clt-frs.component.html',
  styleUrls: ['./detail-clt-frs.component.scss']
})
export class DetailCltFrsComponent implements OnInit {

  @Input()
  origin = '';
  @Input()
  clientFournisseur: any = {};
  @Output()
  suppressionResult = new EventEmitter();

  constructor(
    private router: Router,
    private cltFrsService: CltfrsService,
    private utilisateurService: UserService

  ) { }

  isLoading = true
  localuser: UtilisateurDto = {}
  role: RolesDto = {}

  ngOnInit(): void {
    this.showall()
  }

  showall() {
    this.localuser = this.utilisateurService.getConnectedUser()
    if (this.localuser.roles != undefined) {
      this.role = this.localuser.roles[0]
      const R = this.role.roleName
      if (R == 'ADMIN') {
        this.isLoading = false

      }
      else if (R == 'USER') {
        this.isLoading = true

      }
      else {
        alert('There is no Role')
      }
    }
  }
  modifierClientFournisseur(): void {
    if (this.origin === 'client') {
      this.router.navigate(['nouveauclient', this.clientFournisseur.id]);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['nouveaufournisseur', this.clientFournisseur.id]);
    }
  }

  confirmerEtSupprimer(): void {
    if (this.origin === 'client') {
      this.cltFrsService.deleteClient(this.clientFournisseur.id)
        .subscribe(res => {
          this.suppressionResult.emit('success');
        }, error => {
          this.suppressionResult.emit(error.error.error);
        });
    } else if (this.origin === 'fournisseur') {
      this.cltFrsService.deleteFournisseur(this.clientFournisseur.id)
        .subscribe(res => {
          this.suppressionResult.emit('success');
        }, error => {
          this.suppressionResult.emit(error.error.error);
        });
    }
  }
}
