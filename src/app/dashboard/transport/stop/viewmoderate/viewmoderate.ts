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
    selector: 'app-stop-view',
    templateUrl: './viewmoderate.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewModerateStop{
    data;
    page_count;
    stop_id;
    formName;
    stop;
    cityId;
    city;
    city_id=2;

    constructor(private dataTransfer: DataTransferService, private cityservice: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute) {}
        
    ngOnInit() {

         this.formName=transport.get_stops_for_mod;
         this.getCity();
       
    
    }

    

    edit(id:string) {
        this.router.navigate(['/addstop',id]);
    }

    getCity() {
            
        this.cityservice.currentMessage.subscribe(message => this.city = message);
        this.cityservice.currentNumber.subscribe(message => {this.city_id = message;
            this.dataTransfer.get(this.formName+this.city_id)
            .subscribe(
                (data: any[]) => {
                    this.stop = data, console.log(this.stop);
                    this.page_count = (<any>data).page_count;
                    this.stop=this.stop.data;
                });
        });
    }

    app(id:string) {

        console.log(id);
        this.data = new Approve1(id, 'Approved');
        this.dataTransfer.push(transport.moderate_stop, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(id:string) {
        this.data = new Approve1(id, 'Rejected');
        this.dataTransfer.push(transport.moderate_stop, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }
  

    

}