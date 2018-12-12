import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { DoctorService, DOCTOR } from '../../../../services/doctor.service';
import { Doctor } from '../../../models/doctor';
import { DataTransferService } from '../../../../services/data-transfer.service';
import { doctors } from '../../healthcare.apis';


@Component({
    selector: 'app-doctor-home',
    templateUrl: './doctorhome.component.html',
    styleUrls:['../../home.css']
})

export class DoctorHome {

    doctor$: Observable<DOCTOR>;
    address;
    private selectedId: number;
    doctor;
    page_count;
    f=0;
    doctor_id;

    constructor(
      private service: DoctorService,
      private route: ActivatedRoute,
      private dataTransfer:DataTransferService,
    ) {}
  
    ngOnInit() {
   
        this.route.params.subscribe((params: Params) => {
            this.doctor_id = params['id'];
                console.log(this.doctor_id);
              });

                   let formName=doctors.getdoctor;

        this.dataTransfer.get(formName+this.doctor_id)
        .subscribe(
            (data: any[]) => {
                this.doctor= data, console.log(this.doctor);              
                this.page_count = (<any>data).page_count;
          
            }


            
        ); 
      
        
        

      
     
    }
    
}