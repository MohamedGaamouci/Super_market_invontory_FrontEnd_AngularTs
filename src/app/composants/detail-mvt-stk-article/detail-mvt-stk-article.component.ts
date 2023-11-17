import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import { MvtStkSerService } from 'src/app/services/mvtstk/mvt-stk-ser.service';
import { MvtStkDto } from 'src/gs-api/src/models/mvt-stk-dto';

@Component({
  selector: 'app-detail-mvt-stk-article',
  templateUrl: './detail-mvt-stk-article.component.html',
  styleUrls: ['./detail-mvt-stk-article.component.scss']
})
export class DetailMvtStkArticleComponent implements OnInit {

  // mvt_stk_s: Array<MvtStkDto> = [];
  @Input()
  mvt_stk: MvtStkDto = {}
  @Output()

  // mvt_stk_s: MvtStkDto | Array<MvtStkDto> = {};

  errorMsg = '';

  constructor(
    private mvt_stk_service: MvtStkSerService,
    private router: Router,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.convert_date()
  }

  convert_date() {
    let date: string | undefined
    date = this.mvt_stk.dateMvt?.toString()
    date = date?.substring(0, 16)
    date = date?.replace("T", " ")

    this.mvt_stk.dateMvt = date

  }

  // charge(): void {
  //   this.mvt_stk_service.findById(15).subscribe(res => {
  //     // this.mvt_stk_s = res

  //     if (Array.isArray(this.mvt_stk_service)) {
  //       // alert(this.mvt_stk_s.length);
  //     }


  //   }, error => {
  //     alert(error.error.message)
  //   });
  // }

}
