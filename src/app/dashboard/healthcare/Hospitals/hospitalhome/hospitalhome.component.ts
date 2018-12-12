import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { DataTransferService } from '../../../../services/data-transfer.service';
import { hospitals } from '../../healthcare.apis';
import { HOSPITAL, HospitalService } from '../../../../services/hospital.service';
import { CityService } from '../../../../services/city-data.service';


@Component({
    selector: 'app-hospital-home',
    templateUrl: './hospitalhome.component.html',
    styleUrls:['../../home.css']
})

export class HospitalHome {

    hospital$: Observable<HOSPITAL>;

    private selectedId: number;
    hospital;
    page_count;
    f=0;
    city_id;
    address;
    hospital_id;
    constructor(
      private service: HospitalService,
      private route: ActivatedRoute,
      private dataTransfer:DataTransferService,
      private city:CityService,
    ) {}
  
    ngOnInit() {
        let formName=hospitals.getHospitalById;
        let hospital;
        this.getCity();

        this.route.params.subscribe((params: Params) => {
            this.hospital_id = params['id'];
                console.log(this.hospital_id);
              });

        this.dataTransfer.get(formName+this.hospital_id)
        .subscribe(
            (data: any[]) => {
                this.hospital= data, console.log(this.hospital);              
                this.page_count = (<any>data).page_count;
       
              
            }
        ); 
     
    }
    
    getCity() {
            
            this.city.currentNumber.subscribe(message => this.city_id = message);
    }
}