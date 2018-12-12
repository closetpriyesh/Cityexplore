import { Component, OnInit, ChangeDetectorRef, NgZone, Input, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { FormService } from "../../../../services/form.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { CityService } from "../../../../services/city-data.service";
import { Approve } from "../../../../shared/action.model";
import { HOSPITAL, HospitalService } from "../../../../services/hospital.service";
import {Observable, Subject, Subscription} from 'rxjs';
import { hospitals } from "../../healthcare.apis";
import { SubscriptionLog } from "rxjs/testing/SubscriptionLog";
import { MatDialog } from "@angular/material";
import { SuccessDialog } from "../../../successdialog/successdialog";
import { FailureDialog } from "../../../failuredialog/failuredialog";

@Component({
    selector: 'app-hospital-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../view.css']
})

export class ViewHospitalComponent implements OnInit{

  
    @Input() addItemStream:Observable<any>;

    hospitals$: Observable<HOSPITAL[]>;
    private selectedId: number;
    hospital;
    
    hospital_id;
    formName = hospitals.getHospital;
    cityId;
    data;
    current_page = 1;
    hospital_new=[{}];
    page_count: number;
    city_id;
    private timer:Observable<any>;
    fileDialogRef;
    private subscription:Subscription;
    server_response;
    constructor(private zone: NgZone,private el:ElementRef,private ref:ChangeDetectorRef,private dataTransfer: DataTransferService, private city: CityService, private form: FormService, private router: Router,
    private service:HospitalService,private route:ActivatedRoute,private dialog:MatDialog){}

      DataTransferService:Observable<any>;

    ngOnInit() {
        console.log(this.formName);
        this.getCity();
        this.route.params.subscribe(
            (params:ParamMap)=>
            {
                this.hospital_id=params['id'];
            }
        )


        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.hospital = data, console.log(this.hospital);
                   this.page_count = (<any>data).page_count;
                   this.server_response=this.hospital.response;
                this.hospital=this.hospital.hospital_list;
                this.setTimer();
           
            },
            (error:any[])=>
            {
                this.server_response="failure";
                this.setTimer();
            }
        ); 
    
        
    
    }

  
     
       


    getCity() {
        this.city.currentNumber.subscribe(message => this.city_id = message);
    }
    

    edit(num:number) {
        this.router.navigate(['/hospitalform',num]);
    }

    delete(num: number) {
        this.dataTransfer.del(hospitals.deleteHospitals, num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(hospitals.moderateHospitals, this.data)
            .subscribe((Response)=>
            {
                this.ngOnInit();
            });
    
        
    
        
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(hospitals.moderateHospitals, this.data)
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
