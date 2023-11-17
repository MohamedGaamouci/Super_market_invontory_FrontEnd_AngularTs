import { Component, Input, OnInit } from '@angular/core';
import { MvtStkSerService } from 'src/app/services/mvtstk/mvt-stk-ser.service';
import { MvtStkDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-detail-mvt-stk',
  templateUrl: './detail-mvt-stk.component.html',
  styleUrls: ['./detail-mvt-stk.component.scss']
})
export class DetailMvtStkComponent implements OnInit {
  @Input()
  mtstk: MvtStkDto = {};
  constructor(private mvtstkser:MvtStkSerService) { }

  ngOnInit(): void {this.get()}
body:any;


get(): void {
  let id = 1;
  this.mvtstkser.findById(id).subscribe(r => {
    this.body=r
    
    })
  
}


}
