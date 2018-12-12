import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { FormService } from "../../../../services/form.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";
import { Approve, Approve1 } from "../../../../shared/action.model";
import { MatDialog } from "@angular/material";
import { SuccessDialog } from "../../../successdialog/successdialog";
import { FailureDialog } from "../../../failuredialog/failuredialog";


@Component({
    selector: 'app-company-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewCompany{
 
    page_count;
    company_id;
    formName;
    company;
    city_id;
    city_name;
    data;
    fileDialogRef;
    server_response;
    private subscription:Subscription;
    private timer:Observable<any>;



   
   
    

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute,private dialog:MatDialog) {}

        
    ngOnInit() {
    this.getCity();
     this.formName=transport.get_approved_companies;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.company = data;
                this.page_count = (<any>data).page_count;
                this.server_response=this.company.response;
                this.company=this.company.data;
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
        this.router.navigate(['/addcompany',id]);
    }

    getCity() {
            
        this.city.currentMessage.subscribe(message => this.city_name = message);
        this.city.currentNumber.subscribe(message => this.city_id = message);
    }

 
    dis(id:string) {
        this.data = new Approve1(id, 'Rejected');
        this.dataTransfer.push(transport.moderate_company, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    setTimer(){
        this.openDialog();
    
        // set showloader to true to show loading div on view
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