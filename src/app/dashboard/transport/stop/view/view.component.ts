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
import { MatDialog } from "@angular/material";
import { SuccessDialog } from "../../../successdialog/successdialog";
import { FailureDialog } from "../../../failuredialog/failuredialog";


@Component({
    selector: 'app-stop-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewStop{
    data;
    page_count;
    stop_id;
    formName;
    stop;
    cityId;
    city;
    status;
    city_id=2;
    private subscription: Subscription;
    private timer: Observable<any>;
    server_response;

    constructor(private dataTransfer: DataTransferService, private cityservice: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute,private dialog:MatDialog) {}

    fileDialogRef;
        
    ngOnInit() {
        this.formName=transport.get_approved_stops;
        this.getCity();
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.stop = data, console.log(this.stop);
                this.page_count = (<any>data).page_count;
                this.server_response=this.stop.response;
                this.stop=this.stop.data;
                this.setTimer();
            },
            (error:any[])=>
            {
                this.server_response="failure";
                this.setTimer();
            }
        
        );

      
    
    }

    

  
    edit(id:string) {
        this.router.navigate(['/addstop',id]);
    }

    getCity() {
            
        this.cityservice.currentMessage.subscribe(message => this.city = message);
        this.cityservice.currentNumber.subscribe(message => {this.city_id = message;
        
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