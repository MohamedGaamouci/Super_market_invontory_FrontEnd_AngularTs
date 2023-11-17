import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { UserService } from 'src/app/services/user/user.service';
import { Ventesservice } from 'src/app/services/ventes/ventes.service';
import { ArticleDto, LigneVenteDto, VentesDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-nouvel-vent',
  templateUrl: './nouvel-vent.component.html',
  styleUrls: ['./nouvel-vent.component.scss']
})
export class NouvelVentComponent implements OnInit {


  listArticle: Array<ArticleDto> = [];

  codeArticle = '';
  quantite: number = 1;
  codeCommande = '';
  searchedArticle: ArticleDto = {};
  total = 0;
  articleNotYetSelected = false;
  prix_u_ht: number = 0;
  cd_vent = '';
  Commantaire = ''


  ligneVnt: LigneVenteDto = {}
  ligneVntTosend: LigneVenteDto = {
    "article": {

      "id": 0,

    },
    "idEntreprise": 0,
    "prixUnitaire": 0,
    "quantite": 0
  }


  Ventes: Array<LigneVenteDto> = []
  VentesTosend: Array<LigneVenteDto> = []

  generatecode: string = 'generate code'




  constructor(
    private articleService: ArticleService,
    private user: UserService,
    private vente: Ventesservice
  ) { }


  generateRandomValue() {
    // Generate a random string and number
    const randomString = Math.random().toString(36).substring(7);
    const randomNumber = Math.floor(Math.random() * 1000);

    // Combine the random string and number
    this.cd_vent = randomString + randomNumber;
  }


  ngOnInit(): void { this.findAllArticles(); }

  findAllArticles(): void {
    this.articleService.findAllArticles()
      .subscribe(articles => {
        this.listArticle = articles;
      });
  }

  filtrerArticle(): void {
    if (this.codeArticle.length === 0) {
      this.findAllArticles();
    }
    this.listArticle = this.listArticle
      .filter(art => art.codeArticle?.includes(this.codeArticle) || art.designation?.includes(this.codeArticle));
  }

  selectArticleClick(article: ArticleDto): void {
    this.searchedArticle = article;
    this.codeArticle = article.codeArticle ? article.codeArticle : '';
    this.articleNotYetSelected = true;
    if (article.prixUnitaireHt != undefined) { this.prix_u_ht = article.prixUnitaireHt as number; }
  }
  // ok() { alert(this.prix_u_ht); }


  AddligneVNT() {
    // alert('enter')
    this.listArticle.forEach((data) => {

      if (data.codeArticle === this.codeArticle) {

        if (this.quantite != 0) {
          // alert('enter')
          this.ligneVnt.article = data
          this.ligneVnt.idEntreprise = data.idEntreprise
          this.ligneVnt.quantite = this.quantite
          this.ligneVnt.prixUnitaire = (this.prix_u_ht * this.quantite)

          // alert(JSON.stringify(this.ligneVnt))
          this.Ventes.push(this.ligneVnt)
          this.VentesTosend.push(this.ligneVnt)
          this.codeArticle = ""
          this.quantite = 1
          this.ligneVnt = {}
          this.calculeTotal();

          this.articleNotYetSelected = false

          if (data && data.id) {
            this.ligneVntTosend.article = { id: data.id };
          }
          this.ligneVntTosend.idEntreprise = data.idEntreprise
          this.ligneVntTosend.quantite = this.quantite
          this.ligneVntTosend.prixUnitaire = (this.prix_u_ht * this.quantite)



        } else {

        }
      } else { }
    }
    )


  }

  calculeTotal() {
    this.total = 0
    this.Ventes.forEach((ele) => {
      if (ele.prixUnitaire) {
        this.total += ele.prixUnitaire

      }
    })
  }

  new_vente: VentesDto = {}
  date = "";
  prepaireVentes() {


    const dateString = this.date + 'T19:37:17.354Z';
    this.new_vente = {
      "code": this.cd_vent,
      "total": this.total,
      "commentaire": this.Commantaire,
      "dateVente": dateString,
      "idEntreprise": this.VentesTosend[0].idEntreprise,
      "ligneVentes": this.VentesTosend,
    }



  }

  saveVente() {
    if (this.new_vente && this.cd_vent && this.VentesTosend && this.date) {
      this.vente.save(this.new_vente)
      // alert(JSON.stringify(this.new_vente))
      window.location.replace('nouvel-vente')
    } else {
      alert("enter required field for this command (code / les lignes de vente)\n" + 'ventes et vide')
    }
  }


}
