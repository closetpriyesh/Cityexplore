import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { extra, hospitals } from "../../../healthcare.apis";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { Approve } from "../../../../../shared/action.model";
import { FormService } from "../../../../../services/form.service";

@Component({
    selector: 'app-facility-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../../secondaryview.css']
})

export class ViewHospitalFacility{
    

    private selectedId: number;
    facilitys;
    facility;
    formName = hospitals.getfacilities;
    cityId;
    data;
    hospital_id;
    current_page = 1;
    specialization;
    page_count: number;

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute) {}
        
    ngOnInit() {

        this.route.params.subscribe(
            (params:ParamMap)=>
            {
                this.hospital_id=params['id'];
            }
        )

        console.log(this.formName);
        this.dataTransfer.get(this.formName+this.hospital_id)
        .subscribe(
            (data: any[]) => {
                this.facility = data, console.log(this.facility);
                this.page_count = (<any>data).page_count;
                this.facility=this.facility.hospital_facility_list;
                
                
            }
        ); 


        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    

    edit(num:number) {
        this.router.navigate(['/addhospitalfacility',this.hospital_id,num]);
    }

    delete(num: number) {
        this.dataTransfer.del(hospitals.deletefacilities,num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(hospitals.moderatefacilities, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(hospitals.moderatefacilities, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    

}