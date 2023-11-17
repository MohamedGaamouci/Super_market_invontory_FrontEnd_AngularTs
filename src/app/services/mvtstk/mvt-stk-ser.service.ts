import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MvtStkDto } from 'src/gs-api/src/models';
import { MvtstkService } from 'src/gs-api/src/services';

@Injectable({
  providedIn: 'root'
})
export class MvtStkSerService {

  constructor(
    private mvtstk: MvtstkService,
  ) { }

  findById(id: number): Observable<MvtStkDto | MvtStkDto[]> {
    return this.mvtstk.mvtStkArticle(id)
  }

  correction_pos(data: MvtStkDto) {
    this.mvtstk.correctionStockPosResponse(data).subscribe(
      response => (window.location.replace('mvtstk')),
      error => alert(JSON.stringify(error.error.message))
    );
  }
  correction_nig(data: MvtStkDto) {
    this.mvtstk.correctionStockNegResponse(data).subscribe(
      response => (window.location.replace('mvtstk')),
      error => alert(JSON.stringify(error.error.message))
    );
  }


}
