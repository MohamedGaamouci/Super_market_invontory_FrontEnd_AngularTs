import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Ventesservice } from 'src/app/services/ventes/ventes.service';
import { LigneVenteDto, VentesDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-ventes-component',
  templateUrl: './page-ventes-component.component.html',
  styleUrls: ['./page-ventes-component.component.scss']
})
export class PageVentesComponentComponent implements OnInit {

  listVente: VentesDto[] = [];
  mapLignesVente = new Map();
  lignevente: LigneVenteDto = {};
  mapPrixTotalCommande = new Map();

  constructor(
    private router: Router,
    private vente: UserService,
    private venteS: Ventesservice,
  ) { }



  ngOnInit(): void {
    this.findAllVente()
    // this.getlignebyid(22)

  }
  calculerTotalCommande(id?: number): number {
    return this.mapPrixTotalCommande.get(id);
  }

  findAllVente() {
    this.vente.findAllVente().subscribe(
      (data) => {
        this.listVente = data.body.reverse();
        // data.forEach(element => {
        //   this.listVente.push(element)

        // });
      },
      (error) => { alert(JSON.stringify(error.error.error + " :: " + error.error.message)) }
    )
  }

  nouvel_vente() {
    // alert(JSON.stringify(this.listVente))
    window.location.replace('nouvel-vente')
  }
  openAccordionIndex: number = -1;
  toggleAccordion(index: number): void {
    this.openAccordionIndex = this.openAccordionIndex === index ? -1 : index;
  }

  isAccordionOpen(index: number): boolean {
    return this.openAccordionIndex === index;
  }

  listligneV: LigneVenteDto[] = []
  getlignebyid(id: number | undefined) {
    if (id && id != undefined) {
      this.venteS.getbyventeId(id).subscribe(
        (data) => {
          this.listligneV = data
          // alert(JSON.stringify(data))
        },
        (error) => { alert(JSON.stringify(error.error.error + " :: " + error.error.message)) }
      )
    }
    else {
      alert("error in vente id")
    }
  }


}
