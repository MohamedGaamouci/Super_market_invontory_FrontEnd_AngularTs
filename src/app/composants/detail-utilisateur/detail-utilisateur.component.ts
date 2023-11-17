import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { UtilisateurDto } from 'src/gs-api/src/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss']
})
export class DetailUtilisateurComponent implements OnInit {

  constructor(
    private user: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showall()
  }
  t: any;
  bd: UtilisateurDto[] = [];
  showall() {
    this.user.getall().subscribe(
      r => { this.bd = r; this.t = JSON.stringify(r) });
  }

  async delete_user(id: number) {
    await this.user.deleteUser(id)
    await this.showall();
    this.router.navigate(['utilisateurs']);

  }


}
