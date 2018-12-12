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
    selector: 'app-image-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../../secondaryview.css']
})

export class ViewHospitalImages{
    

    private selectedId: number;
    images;
    image;
    formName = hospitals.getimages;
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
                this.images = data, console.log(this.images);
                this.page_count = (<any>data).page_count;
                this.images=this.images.hospital_image_list;
                
                
            }
        ); 


        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    

    edit(num:number) {
        this.router.navigate(['/addhospitalimages',this.hospital_id,num]);
    }

    delete(num: number) {
        this.dataTransfer.del(hospitals.deleteimages,num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(hospitals.moderateimages, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(hospitals.moderateimages, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    

}