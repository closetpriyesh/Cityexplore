import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { FormService } from "../../../../services/form.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";
import { Approve1 } from "../../../../shared/action.model";


@Component({
    selector: 'app-link-view',
    templateUrl: './viewmoderate.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewModerateLink{
    data;
    page_count;
    link_id;
    formName;
    link;
    cityId;
    

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute) {}
        
    ngOnInit() {

        this.formName=transport.get_links_for_mod;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.link = data, console.log(this.link);
                this.page_count = (<any>data).page_count;
                this.link=this.link.data;
            }
        ); 
        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    

    edit(id:string) {
        this.router.navigate(['/addlink',id]);
    }

    app(id:string) {

        console.log(id);
        this.data = new Approve1(id, 'Approved');
        this.dataTransfer.push(transport.moderate_link, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(id:string) {
        this.data = new Approve1(id, 'Rejected');
        this.dataTransfer.push(transport.moderate_link, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

}