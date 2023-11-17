import {Component, Input, OnInit} from '@angular/core';
import {ClientDto} from '../../../gs-api/src/models/client-dto';
import { CommandefournisseurService, CommandesclientsService } from 'src/gs-api/src/services';

@Component({
  selector: 'app-detail-cmd-clt-frs',
  templateUrl: './detail-cmd-clt-frs.component.html',
  styleUrls: ['./detail-cmd-clt-frs.component.scss']
})
export class DetailCmdCltFrsComponent implements OnInit {

  @Input()
  origin = '';
  @Input()

  commande: any = {};
  cltFrs: ClientDto | undefined = {};

  constructor(private clt:CommandesclientsService, private frs:CommandefournisseurService) { }

  ngOnInit(): void {
    this.extractClientFournisseur();
  }

  extractClientFournisseur(): void {
    if (this.origin === 'client') {
      this.cltFrs = this.commande?.client;
    } else if (this.origin === 'fournisseur') {
      this.cltFrs = this.commande.fournisseur;
    }
  }

  delet(id:number|undefined){
    if(id){
      if(this.origin==='client') {
        alert(this.origin)
        this.clt.delete(id as number).subscribe()}
      else if(
        this.origin === 'fournisseur') {
          alert(this.origin)
          this.frs.deleteResponse(id as number).subscribe(
          ()=>{},
          (error)=>{alert(error.error.error +" :: "+error.error.message)}
          )}
    }
  }

}
