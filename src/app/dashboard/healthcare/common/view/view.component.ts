import { Component, OnInit } from "@angular/core";
import { hospitals, extra } from "../../healthcare.apis";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";
import { FormService } from "../../../../services/form.service";
import { Approve } from "../../../../shared/action.model";
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { MatDialog } from "@angular/material";
import { SuccessDialog } from "../../../successdialog/successdialog";
import { FailureDialog } from "../../../failuredialog/failuredialog";

@Component({
    selector: 'app-specialization-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../view.css']
})

export class ViewSpecializationComponent{
    

    private selectedId: number;
    departments;
   
   
    cityId;
    data;
    current_page = 1;
    specialization;
    page_count: number;
    formName;
    private timer:Observable<any>;
    private subscription:Subscription;
    server_response;
    fileDialogRef;

    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private route:ActivatedRoute,private dialog:MatDialog) {}
        
    ngOnInit() {
        console.log(this.formName);
       
        this.formName=extra.getspecialization;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.specialization = data, console.log(this.specialization);
                this.server_response=this.specialization.response;
                this.page_count = (<any>data).page_count;
                this.specialization=this.specialization.specialization_list;
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
        this.router.navigate(['/specializationform',num]);
    }


  

    delete(num: number) {
        this.dataTransfer.del(extra.deletespecialization, num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }


    app(num: number) {

        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(extra.moderateSpecialization, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(extra.moderateSpecialization, this.data)
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