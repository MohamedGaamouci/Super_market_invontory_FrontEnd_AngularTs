import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LigneVenteDto, VentesDto } from 'src/gs-api/src/models';
import { VentesService } from 'src/gs-api/src/services';

@Injectable({
  providedIn: 'root'
})

export class Ventesservice {

  constructor(
    private vente: VentesService,
  ) { }

  save(VentesDto: VentesDto) {
    this.vente.saveResponse(VentesDto).subscribe(
      () => { },
      (error) => { alert(JSON.stringify(error.error.error) + "::" + JSON.stringify(error.error.message)) }
    )
  }

  delete(id: number) {
    this.vente.deleteResponse(id).subscribe(
      () => { alert("delete with seccess") },
      (error) => { alert(JSON.stringify(error.error.error + " :: " + error.error.message)) }
    )
  }

  getbyventeId(id: number): Observable<Array<LigneVenteDto>> {
    let a: LigneVenteDto[] = []
    if (id) {
      return this.vente.findlignebyIdvente(id);
    }
    return of(a); // Return an empty Observable if id is not provided
  }
}
