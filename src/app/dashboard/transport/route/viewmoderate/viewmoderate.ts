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
    selector: 'app-route-view',
    templateUrl: './viewmoderate.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewModerateRoute{
    data;
    page_count;
    route_id;
    formName;
    route;
    cityId;
    

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route1:ActivatedRoute) {}
        
    ngOnInit() {

        this.formName=transport.get_routes_for_mod;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.route = data;
                this.page_count = (<any>data).page_count;
                this.route=this.route.data;
                console.log(this.route);
            }
        ); 
        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    

    edit(id:string) {
        this.router.navigate(['/addroute',id]);
    }


    app(id:string) {
        
        this.data = new Approve1(id, 'Approved');
        this.dataTransfer.push(transport.moderate_route, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(id:string) {
    

        this.data = new Approve1(id, 'Rejected');
        this.dataTransfer.push(transport.moderate_route, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    

}