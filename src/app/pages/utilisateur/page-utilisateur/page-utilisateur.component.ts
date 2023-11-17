import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { RolesDto, UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.scss']
})
export class PageUtilisateurComponent implements OnInit {

  constructor(
    private router: Router,
    private user: UserService
  ) { }
  isLoading = true
  localuser: UtilisateurDto = {}
  role: RolesDto = {}

  ngOnInit(): void {

    this.showall()
  }
  t: any;
  bd: UtilisateurDto[] = [];
  showall() {
    this.localuser = this.user.getConnectedUser()
    if (this.localuser.roles != undefined) {
      this.role = this.localuser.roles[0]
      const R = this.role.roleName
      if (R == 'ADMIN') {
        this.isLoading = false
        this.user.getall().subscribe(
          r => { this.bd = r; this.t = JSON.stringify(r) });
      }
      else if (R == '') {
        this.isLoading = true

      }
      else {
        alert('There is no Role')
      }
    }
  }

  async delete_user(id: number) {
    await this.user.deleteUser(id)
    // await this.showall();
    // window.location.replace('utilisateurs')
    // this.router.navigate(['utilisateurs']);

  }


  nouvelUtilosateur(): void {
    this.router.navigate(['nouvelutilisateur']);
  }
}
