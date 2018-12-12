import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { FormService } from "../../../../../services/form.service";
import { Approve1 } from "../../../../../shared/action.model";
import { transport } from "../../../transport.apis";


@Component({
    selector: 'app-configvehicle-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../../secondaryview.css']
})

export class ViewVehicleConfiguration{
    data;
    page_count;
    vehicle_id;
    formName;
    configvehicle;
    cityId;
    

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute) {}
        
    ngOnInit() {

        
        this.route.params.subscribe((params:Params)=>
    {
        this.vehicle_id=params['id'];

    });


        this.formName=transport.get_approved_config;
        this.dataTransfer.get(this.formName+this.vehicle_id)
        .subscribe(
            (data: any[]) => {
                this.configvehicle = data;
                this.page_count = (<any>data).page_count;
                this.configvehicle=this.configvehicle.data;
                console.log(this.configvehicle);
            }
        ); 
        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    edit(id:string) {
        this.router.navigate(['/addvehicleconfiguration',id]);
    }

  
    app(id: string) {
        
        this.data = new Approve1(id, 'Approved');
        this.dataTransfer.push(transport.moderate_config, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(id:string) {
        this.data = new Approve1(id, 'Rejected');
        this.dataTransfer.push(transport.moderate_config, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    

}