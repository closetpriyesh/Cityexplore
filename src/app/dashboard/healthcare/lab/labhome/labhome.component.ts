import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { DataTransferService } from '../../../../services/data-transfer.service';
import { labs } from '../../healthcare.apis';
import { LAB, LabService } from '../../../../services/lab.service';


@Component({
    selector: 'app-lab-home',
    templateUrl: './labhome.component.html',
    styleUrls:['../../home.css']
})

export class LabHome {

    lab$: Observable<LAB>;

    private selectedId: number;
    lab;
    page_count;
    frontpath;
    f=0;
    address;
    lab_id;
    constructor(
      private service: LabService,
      private route: ActivatedRoute,
      private dataTransfer:DataTransferService,
    ) {}
  
    ngOnInit() {
        this.route.params.subscribe((params:Params)=>
        {
            this.lab_id=params['id'];

        });
        let formName=labs.getLabById;
        let lab;
        this.dataTransfer.get(formName+this.lab_id)
        .subscribe(
            (data: any[]) => {
                this.lab= data, console.log(this.lab);              
                this.page_count = (<any>data).page_count;
               
            }

        );

      

        this.route.params.subscribe((params: Params) => {
            this.lab_id = params['id'];
                console.log(this.lab_id);
              });
     

        
      
     
    }
    
}