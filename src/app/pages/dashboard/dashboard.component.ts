import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { CmdcltfrsService } from 'src/app/services/cmdcltfrs/cmdcltfrs.service';
import { UserService } from 'src/app/services/user/user.service';
import { Ventesservice } from 'src/app/services/ventes/ventes.service';
import { ArticleDto, ClientDto, CommandeClientDto, CommandeFournisseurDto, FournisseurDto, LigneCommandeClientDto, LigneCommandeFournisseurDto, MvtStkDto, UtilisateurDto, VentesDto } from 'src/gs-api/src/models';
import { MvtstkService } from 'src/gs-api/src/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listClient: Array<ClientDto> = [];
  listClientSplit: Array<ClientDto> = [];
  listVente: Array<VentesDto> = [];
  listVente2: Array<VentesDto> = [];
  listFrs: Array<FournisseurDto> = [];
  listFrsSplit: Array<FournisseurDto> = [];
  listArticles: Array<ArticleDto> = [];
  cd_user: UtilisateurDto = {}
  listCFrn: Array<CommandeFournisseurDto> = []
  listCC: Array<CommandeClientDto> = []


  count: number = 0

  constructor(
    private router: Router,
    private cltFrsService: CltfrsService,
    private art: ArticleService,
    private user: UserService,
    private mvtstk: MvtstkService,
    private vente: UserService,
    private service: CmdcltfrsService,
    private venteS: Ventesservice
  ) { }

  ngOnInit(): void {
    this.findAllVente();
    this.findAllClients();
    this.findAllFournisseurs();
    this.findAllArticles();
    this.profil();
    // this.findmvt_stk(1);
    this.findallCC();
    this.findallCF();
    this.findAllFournisseurs2()
    this.findAllClients2()


  }
  findAllVente() {
    this.vente.findAllVente().subscribe(
      (data) => {
        this.listVente = data.body.reverse()
        this.listVente2 = data.body.reverse()
        // alert(JSON.stringify(data.body[0]))
        this.listVente2.splice(5, this.listVente.length)
      }

    )

  }

  findAllClients() {
    this.cltFrsService.findAllClients()
      .subscribe(clts => {
        this.listClient = clts;
      });
  }
  findAllClients2() {
    this.cltFrsService.findAllClients()
      .subscribe(clts => {
        this.listClientSplit = clts.reverse().splice(0, 3);
      });
  }

  findAllFournisseurs() {
    this.cltFrsService.findAllFournisseurs()
      .subscribe(frs => {
        this.listFrs = frs;

        // this.listFrsSplit = frs.splice(0, 5).reverse();
        // alert(JSON.stringify(frs))
      })
  }
  findAllFournisseurs2() {
    this.cltFrsService.findAllFournisseurs()
      .subscribe(frs => {
        // this.listFrs = frs;

        this.listFrsSplit = frs.reverse().splice(0, 3);
        // alert(JSON.stringify(frs))
      })
  }

  findAllArticles() {
    this.art.findAllArticles().subscribe(r => { this.listArticles = r })

  }

  profil() {
    this.cd_user = this.user.getConnectedUser()
  }


  revenu: number = 0;
  revenu2: string = "";

  findallCC() {
    // alert("enter")
    this.service.findAllCommandesClient().subscribe(r => {
      this.listCC = r
      this.listCC.forEach((ele) => {
        // alert(JSON.stringify(ele))
        if (ele.id) {
          this.service.findAllLigneCommandesClient(ele.id).subscribe(
            (data) => {
              data.forEach(element => {
                if (element.prixUnitaire != undefined) {
                  this.revenu += Number(element.prixUnitaire)
                }
              });
              this.listVente.forEach(element => {
                if (element.total) {
                  this.revenu += element.total
                }
              });
              this.revenu2 = this.revenu.toFixed(2)
            }
          )

        }
      })
    })

  }
  depence: number = 0;
  depence2: string = "";
  findallCF() {
    this.service.findAllCommandesFournisseur().subscribe(r => {
      this.listCFrn = r

      this.listCFrn.forEach((ele) => {
        // alert(JSON.stringify(ele))
        if (ele.id) {
          this.service.findAllLigneCommandesFournisseur(ele.id).subscribe(
            (data) => {
              data.forEach(element => {
                if (element.prixUnitaire != undefined) {
                  this.depence += Number(element.prixUnitaire)
                }
              });
              this.depence2 = this.depence.toFixed(2)
            }
          )

        }
      })
    })
  }

  calculeProfit() {
    let profit: number = this.revenu - this.depence
    return (profit.toFixed(2))
  }



  //routing_funcs
  go_to_frs() { this.router.navigate(['/fournisseurs']) }
  go_to_cmd_frs() { this.router.navigate(['/commandesfournisseur']) }
  go_to_clt() { this.router.navigate(['/clients']) }
  go_to_cmd_clt() { this.router.navigate(['/commandesclient']) }
  go_to_vnt() { this.router.navigate(['/ventes']) }
  go_to_art() { this.router.navigate(['/articles']) }


}
