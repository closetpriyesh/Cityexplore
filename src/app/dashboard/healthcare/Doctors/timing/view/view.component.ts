import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { Approve } from "../../../../../shared/action.model";
import { FormService } from "../../../../../services/form.service";
import { doctors } from "../../../healthcare.apis";

@Component({
    selector: 'app-timing-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../../secondaryview.css']
})

export class ViewDoctorTiming{
    

    private selectedId: number;
    timings;
    timing;
    formName = doctors.getTimings;
    cityId;
    data;
    doctor_id;
    current_page = 1;

    page_count: number;

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute) {}
        
    ngOnInit() {

        this.route.params.subscribe(
            (params:ParamMap)=>
            {
                this.doctor_id=params['id'];
            })


        console.log(this.formName);
        this.dataTransfer.get(this.formName+this.doctor_id)
        .subscribe(
            (data: any[]) => {
                this.timing = data, console.log(this.timing);
                this.page_count = (<any>data).page_count;
                this.timing=this.timing.doctor_timing_list;
            }
        ); 


        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    

    edit(num:number) {
        this.router.navigate(['/adddoctortiming',this.doctor_id,num]);
    }

    delete(num: number) {
        this.dataTransfer.del(doctors.deleteTiming, num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(doctors.moderateTimings, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(doctors.moderateTimings, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    

}