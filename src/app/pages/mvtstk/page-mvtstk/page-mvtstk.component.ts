import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import { MvtStkSerService } from 'src/app/services/mvtstk/mvt-stk-ser.service';
import { ArticleDto, MvtStk, Article, MvtStkDto } from 'src/gs-api/src/models';
import { MvtstkService } from 'src/gs-api/src/services';
@Component({
  selector: 'app-page-mvtstk',
  templateUrl: './page-mvtstk.component.html',
  styleUrls: ['./page-mvtstk.component.scss']
})
export class PageMvtstkComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private mvtstkser: MvtstkService,
    private router: Router,
    private mvtservice: MvtStkSerService,
  ) { }

  ngOnInit(): void {
    this.findListArticle();
  }
  corection: MvtStkDto = {
    "article": {
      "category": {

        "id": 23

      },

      "id": 14
    },
    "dateMvt": "2023-05-06T19:37:17.354Z",
    "id": 23,
    "idEntreprise": 4,
    "quantite": 4,
    "sourceMvt": "COMMANDE_CLIENT",
    "typeMvt": "CORRECTION_NEG"
  }


  listArticle: ArticleDto[] = [];



  put(id: MvtStkDto) {
    this.corection.id = id.id;
    this.corection.article!.id = id.article?.id
    this.corection.article!.category!.id = id.article?.category?.id
    this.corection.idEntreprise = id.idEntreprise
    this.corection.quantite = id.quantite
    this.corection.dateMvt = id.dateMvt
    this.corection.sourceMvt = id.sourceMvt
    this.corection.typeMvt = id.typeMvt
  }
  ids: any | Array<number> = [];
  g: Array<MvtStkDto> = []

  reelstock: number = 0
  ArticleName: string | undefined = ''
  getmvtstk(id: number) {
    this.reelstock = 0;
    this.ArticleName = '';
    this.mvtstkser.mvtStkArticle(id).subscribe(r => {
      if (Array.isArray(r)) {
        this.g = r
        this.ArticleName = r[0].article?.designation
        this.ArticleName += " " + r[0].article?.codeArticle
        r.forEach(element => {
          this.reelstock += element.quantite as number
        });
      }
    });


  }



  correction() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    this.corection.dateMvt = dateString + 'T19:37:17.354Z'

    if (this.corection.typeMvt == "CORRECTION_POS") {
      this.mvtservice.correction_pos(this.corection);

    }
    else {
      this.mvtservice.correction_nig(this.corection)

    }


  }

  findListArticle(): void {
    this.articleService.findAllArticles()
      .subscribe(articles => {
        this.listArticle = articles;
      });
  }

}

