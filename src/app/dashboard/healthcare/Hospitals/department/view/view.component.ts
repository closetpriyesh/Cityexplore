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
    selector: 'app-department-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../../secondaryview.css']
})

export class ViewHospitalDepartment{
    

    private selectedId: number;
    departments;
    department;
    formName = hospitals.getDepartments;
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
                this.department = data, console.log(this.department);
                this.page_count = (<any>data).page_count;
                this.department=this.department.hospital_department_list;
                
                
            }
        ); 


        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    

    edit(num:number) {
        this.router.navigate(['/addhospitaldepartment',this.hospital_id,num]);
    }

    delete(num: number) {
        this.dataTransfer.del(hospitals.deleteHospitalDepartment,num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(hospitals.moderateHospitalDepartment, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(hospitals.moderateHospitalDepartment, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    

}