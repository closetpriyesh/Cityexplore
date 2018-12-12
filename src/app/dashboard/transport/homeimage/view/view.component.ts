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
    selector: 'app-homeimage-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewHomeImage{
    data;
    page_count;
    homeimage_id;
    formName;
    homeimage;
    cityId;
    city;
    city_id=2;

    constructor(private dataTransfer: DataTransferService, private cityservice: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute) {}
        
    ngOnInit() {
        this.formName=transport.get_home_images;
        this.getCity();
        this.dataTransfer.get(this.formName+this.city_id)
        .subscribe(
            (data: any[]) => {
                this.homeimage = data, console.log(this.homeimage);
                this.page_count = (<any>data).page_count;
                this.homeimage=this.homeimage.image_list;
            });

      
    
    }

    

  
    edit(id:string) {
        this.router.navigate(['/addhomeimage',id]);
    }

    getCity() {
            
        this.cityservice.currentMessage.subscribe(message => this.city = message);
        this.cityservice.currentNumber.subscribe(message => {this.city_id = message;
        
        });
    }

    // app(id:string) {

    //     console.log(id);
    //     this.data = new Approve1(id, 'Approved');
    //     this.dataTransfer.push(transport.moderate_homeimage, this.data)
    //     .subscribe((Response)=>
    //     {
    //         this.ngOnInit();
    //     });
    // }

    // dis(id:string) {
    //     this.data = new Approve1(id, 'Rejected');
    //     this.dataTransfer.push(transport.moderate_homeimage, this.data)
    //     .subscribe((Response)=>
    //     {
    //         this.ngOnInit();
    //     });
    // }
  

    

}