import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { DataTransferService } from '../../../../services/data-transfer.service';
import { chemists } from '../../healthcare.apis';
import { CHEMIST, ChemistService } from '../../../../services/chemist.service';


@Component({
    selector: 'app-chemist-home',
    templateUrl: './chemisthome.component.html',
    styleUrls:['../../home.css']
})

export class ChemistHome {

    chemist$: Observable<CHEMIST>;
     address;
    private selectedId: number;
    chemist;
    page_count;
    f=0;
    chemist_id;
    constructor(
      private service:ChemistService,
      private route: ActivatedRoute,
      private dataTransfer:DataTransferService,
    ) {}
  
    ngOnInit() {
        let formName=chemists.getChemistById;
        this.route.params.subscribe((params:Params)=>
        {
            this.chemist_id=params['id'];

        });
        let chemist;
        this.dataTransfer.get(formName+this.chemist_id)
        .subscribe(
            (data: any[]) => {
                this.chemist= data, console.log(this.chemist);              
                this.page_count = (<any>data).page_count;
           
            }
        ); 
    
        
      
     
    }
    
    
}