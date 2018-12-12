import { Component, OnInit } from "@angular/core";

import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { FormService } from "../../../../services/form.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Approve } from "../../../../shared/action.model";
import {Observable, Subscription} from 'rxjs';
import { LAB, LabService } from "../../../../services/lab.service";
import { labs } from "../../healthcare.apis";
import { SuccessDialog } from "../../../successdialog/successdialog";
import { FailureDialog } from "../../../failuredialog/failuredialog";
import { MatDialog } from "@angular/material";

@Component({
    selector: 'app-lab-view',
    templateUrl: './view.component.html',
    styleUrls:['../../view.css']
})

export class ViewLabComponent{
    labs$: Observable<LAB[]>;

    private selectedId: number;
  
    lab;
    formName = labs.getLabs;
    cityId;
    data;
    current_page = 1;
    page_count: number;
    private timer:Observable<any>;
    private subscription:Subscription;
    server_response;
    fileDialogRef;
    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private service:LabService,private route:ActivatedRoute,private dialog:MatDialog) {}
        
    ngOnInit() {
        console.log(this.formName);
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.lab = data, console.log(this.lab);
              
                this.page_count = (<any>data).page_count;
                this.server_response=this.lab.response;
                this.lab=this.lab.lab_list;
             
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

    

    edit(num:number) {
        this.router.navigate(['/labform',num]);
    }

    delete(num: number) {
        this.dataTransfer.del(labs.deleteLab, num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(labs.moderateLab, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(labs.moderateLab, this.data)
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