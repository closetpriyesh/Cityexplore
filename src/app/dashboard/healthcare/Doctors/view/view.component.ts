import { Component, OnInit } from "@angular/core";
import { doctors, hospitals } from "../../healthcare.apis";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";
import { FormService } from "../../../../services/form.service";
import { Approve } from "../../../../shared/action.model";
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Doctor } from "../../../models/doctor";
import { DoctorService, DOCTOR } from "../../../../services/doctor.service";
import { of } from "rxjs/observable/of";
import { SuccessDialog } from "../../../successdialog/successdialog";
import { FailureDialog } from "../../../failuredialog/failuredialog";
import { MatDialog } from "@angular/material";

@Component({
    selector: 'app-doctor-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../view.css']
})

export class ViewDoctorComponent{
    
    doctors$: Observable<DOCTOR[]>;

    private selectedId: number;
    departments;
    doctor;
    formName = doctors.getdoctors_list;
    cityId;
    data;
    current_page = 1;
    page_count: number;
    private timer:Observable<any>;
    private subscription:Subscription;
    server_response;
    fileDialogRef;


    constructor(private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private service:DoctorService,private route:ActivatedRoute,private dialog:MatDialog) {}
        
    ngOnInit() {
        console.log(this.formName);
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.doctor = data, console.log(this.doctor);     
                this.page_count = (<any>data).page_count;
                this.server_response=this.doctor.response;
                this.doctor=this.doctor.doctor_list;
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
        this.router.navigate(['/doctorform',num]);
    }

    delete(num: number) {
        this.dataTransfer.del(doctors.deleteDoctors, num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(doctors.moderateDoctors, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(doctors.moderateDoctors, this.data)
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