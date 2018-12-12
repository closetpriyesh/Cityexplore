import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { extra, labs } from "../../../healthcare.apis";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { FormService } from "../../../../../services/form.service";
import { Approve } from "../../../../../shared/action.model";


@Component({
    selector: 'app-timing-view',
    templateUrl: './view.component.html',
    styleUrls:['../../../secondaryview.css']
})

export class ViewLabTiming{
    

    private selectedId: number;
    timings;
    timing;
    formName = labs.getLabTimings;
    cityId;
    data;
    lab_id;
    current_page = 1;
    specialization;
    page_count: number;

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute) {}
        
    ngOnInit() {

        this.route.params.subscribe(
            (params:ParamMap)=>
            {
                this.lab_id=params['id'];
            }
        )

        console.log(this.formName);
        this.dataTransfer.get(this.formName+this.lab_id)
        .subscribe(
            (data: any[]) => {
                this.timing = data, console.log(this.timing);
                this.page_count = (<any>data).page_count;
                this.timing=this.timing.lab_timing_list;
                
                
            }
        ); 


        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    

    edit(num:number) {
        this.router.navigate(['/addlabtiming',this.lab_id,num]);
    }

    delete(num: number) {
        this.dataTransfer.del(labs.deleteLabTimings, num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(labs.moderateLabTimings, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(labs.moderateLabTimings, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    

}