import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";

import { Params, ActivatedRoute } from "@angular/router";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { hospitals } from "../../../healthcare.apis";


@Component({
    selector: 'app-hospital-facilities',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './facilities.html',
    styleUrls:['./facilities.css']
})

export class AddHospitalFacility{

     
    formName;
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    facility_id;
    types;
    facilityForm:FormGroup;
    splForm:FormGroup;
    result: object;
    city_id;
    detail:'';
    page_count;
    hospital_id;
    approval_status;
    facility;

    

    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.initForm();
        this.getCity();
        this.route.params.subscribe((params: Params) => {
            this.hospital_id = params['id'];
            this.facility_id=params['id2'];
                console.log(this.hospital_id);
              });
        
        this.facilityForm.value.city= this.city;
        this.facilityForm.value.city_id=this.city_id;
        

        this.facilityForm = this.fb.group({
            detail:['',[Validators.required]],
            name:['',Validators.required]

            
        });     



        if(this.facility_id)
        {
           
            this.dataTransfer.get("http://uat2-healthcare.cityexploro.com/dashboard/healthcare/hospital/getHospitalFacility?hospital_id="+this.hospital_id+"&id="+this.facility_id).subscribe
            (
                (data:any[])=>
                {   
                    this.facility=data;
                    this.facilityForm.controls['name'].setValue(this.facility.name);
                    this.facilityForm.controls['detail'].setValue(this.facility.detail);
                }   
            )
        }

        this.onChanges();
        
       
    }


        getCity() {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void {
        
        
        
        let name;
        let detail;
        
        let degName:any;
        this.facilityForm= new FormGroup({
            name: new FormControl('',Validators.required),
            detail: new FormControl('',Validators.required),
           

        })    }


      fileEvent(fileInput: any) {
        console.log(fileInput);
        console.log(event);
        this.files = (<any>event).target.files;
        console.log(this.files);
        const file = this.files[0];
        console.log(file);
        this.file = file;
        console.log(file.name);
        console.log(file.type);
        this.dataTransfer.uploadFile(file.name, file.type)
            .subscribe(
                (response:Response) => {console.log(response.json()),
                    this.gg = response.json(),
                    console.log(this.gg.data),
                    console.log(this.gg.url),
                    this.image_url = this.gg.url;
                    this.dataTransfer.upload(file, this.gg.data, this.gg.url)
                        .then(
                            (data) => {console.log(data), console.log(this.image_url); },
                            (error) => console.log(error)
                        );
                });
    }

    Reset() {
        this.facilityForm.reset();
    }

   

  

    onSubmit() {
        this.formName=hospitals.addOrUpdatefacilities;
        this.facilityForm.value.hospital_id=+this.hospital_id;
        console.log(this.facilityForm.value);
        console.log(this.formName);
        this.dataTransfer.push(this.formName, this.facilityForm.value)
            .subscribe();
    }

  
    onChanges(): void {
        const phoneControl = this.facilityForm.get('phone');
       
    }

  
      edit(specialization) {
        document.getElementById('newspecialization').focus();
      }

   rejectAdded() {
        this.approval_status = 'rejected';
      }
  
       approveAdded() {
        this.approval_status = 'approved';
      }
    
}