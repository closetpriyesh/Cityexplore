import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { FormService } from "../../../../services/form.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";
import { Approve, Approve1 } from "../../../../shared/action.model";


@Component({
    selector: 'app-company-view',
    templateUrl: './viewmoderate.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewModerateCompany{
 
    page_count;
    company_id;
    formName;
    company;
    city_id;
    city_name;
    data;
   
   
    

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute) {}
        
    ngOnInit() {
        this.formName=transport.get_companies_for_mod;
    this.getCity();
    
        this.dataTransfer.get(this.formName+this.city_id)
        .subscribe(
            (data: any[]) => {
                this.company = data;
                this.page_count = (<any>data).page_count;
                this.company=this.company.data;
                console.log(this.company);
            }
        );      
    }

    

    edit(id:string) {
        this.router.navigate(['/addcompany',id]);
    }

    getCity() {
            
        this.city.currentMessage.subscribe(message => this.city_name = message);
        this.city.currentNumber.subscribe(message => {this.city_id = message;
            this.dataTransfer.get(this.formName+this.city_id)
            .subscribe(
                (data: any[]) => {
                    this.company = data;
                    this.page_count = (<any>data).page_count;
                    this.company=this.company.data;
                    console.log(this.company);
                }
            );      
        
        });
    }

 
    app(id:string) {

        console.log(id);
        this.data = new Approve1(id, 'Approved');
        this.dataTransfer.push(transport.moderate_company, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(id:string) {
        this.data = new Approve1(id, 'Rejected');
        this.dataTransfer.push(transport.moderate_company, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    

}