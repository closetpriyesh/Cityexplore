import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { FormService } from "../../../../services/form.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";
import { Approve1 } from "../../../../shared/action.model";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SuccessDialog } from "../../../successdialog/successdialog";
import { FailureDialog } from "../../../failuredialog/failuredialog";





@Component({
    selector: 'app-vehicle-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewVehicle{
    

    data;
    page_count;
    vehicle_id;
    formName;
    vehicle;
    files = [
        { name: 'foo.js', content: ''},
        { name: 'bar.js', content: ''}
      ];
    cityId;
    status=false;
    private subscription: Subscription;
    private timer: Observable<any>;
    server_response;
    

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute,private dialog:MatDialog) {}
    
  fileDialogRef: MatDialogRef<SuccessDialog>;
        
    ngOnInit() {
       
     

        this.formName=transport.get_approved_vehicles;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.vehicle = data;
                this.page_count = (<any>data).page_count;
                this.server_response=this.vehicle.response;
                this.vehicle=this.vehicle.data;
                this.setTimer();
              
                console.log(this.vehicle);
            },
            (error:any[])=>
            {
                this.server_response="failure";
                this.setTimer();
            }
        ); 
        this.city.currentNumber.subscribe(message => this.cityId = message);
    }

    add(id:string) {
        this.router.navigate(['/addvehicleconfiguration',id]);
    }

    view(id:string)
    {
        this.router.navigate(['/vehicleconfiguration',id]);
    }

    edit(id:string) {
        this.router.navigate(['/addvehicle',id]);
    }

  
    app(id: string) {
        
        this.data = new Approve1(id, 'Approved');
        this.dataTransfer.push(transport.moderate_vehicle, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(id:string) {
        this.data = new Approve1(id, 'Rejected');
        this.dataTransfer.push(transport.moderate_vehicle, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    ngOnDestroy() {
        if ( this.subscription && this.subscription instanceof Subscription) {
          this.subscription.unsubscribe();
        }
      }

    
      setTimer(){
        this.openDialog();
    
        // set showloader to true to show loading div on view
        this.status   = true;
        this.timer        = Observable.timer(1000); // 2000 millisecond means 2 seconds
        this.subscription = this.timer.subscribe(data=>setTimeout(() => {
            // set showloader to false to hide loading div from view after 2 seconds
            if(this.server_response=="success")
            this.fileDialogRef.close();
        }));
      }
  
   
      openDialog() {
         
        if(this.server_response=="success")   
      this.fileDialogRef= this.dialog.open(SuccessDialog);
      else
      this.fileDialogRef=this.dialog.open(FailureDialog);
      this.fileDialogRef.updatePosition({ top: '0', left: '350px' });
     

    }

}