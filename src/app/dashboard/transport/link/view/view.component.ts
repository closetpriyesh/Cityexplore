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
import { FailureDialog } from "../../../failuredialog/failuredialog";
import { SuccessDialog } from "../../../successdialog/successdialog";
import { MatDialog } from "@angular/material";


@Component({
    selector: 'app-link-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../secondaryview.css']
})

export class ViewLink{
    data;
    page_count;
    link_id;
    formName;
    link;
    cityId;
    server_response;
    private subscription:Subscription;
    private timer:Observable<any>;
    fileDialogRef;


    

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute,private dialog:MatDialog) {}
        
    ngOnInit() {

        this.formName=transport.get_approved_links;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.link = data, console.log(this.link);
                this.page_count = (<any>data).page_count;
                this.server_response=this.link.response;
                this.link=this.link.data;
                this.setTimer();
            },
            (error:any[])=>
            {
                this.server_response="failure";
                this.setTimer();
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