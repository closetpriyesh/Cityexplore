import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { Response } from "@angular/http";
import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { doctors, hospitals } from "../../../healthcare.apis";


@Component({
    selector: 'app-doctor-timing',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './timing.html',
    styleUrls:['../../../healthcare.css']
})


export class AddDoctorTiming{

    
    formName;
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    types;
    timingForm:FormGroup;
    splForm:FormGroup;
    result: object;
    city_id;
    description:'';
    page_count;
    doctor;
    approval_status;
    departments;
doctor_id;
timing_id;
    

    constructor(private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder,private route:ActivatedRoute) {}
   
    ngOnInit():void {

        this.initForm();
        this.getCity();
        this.route.params.subscribe((params: Params) => {
            this.doctor_id = params['id'];
            this.timing_id=params['id2'];
                console.log(this.doctor_id);
              });

        this.formName=doctors.getdoctor;
        let  hospital_id;


        this.dataTransfer.get(this.formName+this.doctor_id).subscribe((
            data:any[])=>
            {
                this.doctor=data;
                
                console.log(this.doctor);
                this.formName=hospitals.getApprovedHospitalByCityId;
                this.dataTransfer.get(this.formName+this.doctor.city_id)
                .subscribe(
                    (data: any[]) => {
                        this.types = data, console.log(this.types);    
                        this.page_count = (<any>data).page_count;
                        this.types=this.types.hospital_list;
                    }
                );
        
               
            })
        
         




        
        



       
        
        this.timingForm.value.city= this.city;
        this.timingForm.value.city_id=this.city_id;
        

        this.timingForm = this.fb.group({
            city:['',[Validators.required]],
            hospital:['',[Validators.required]],
            department:['',Validators.required],
            start_time:['',Validators.required],
            end_time:['',Validators.required],
            fee:['',Validators.required],
            
        });     

        this.onChanges();
        if(this.timing_id)
        {
            let timing;
            this.dataTransfer.get("http://uat2-healthcare.cityexploro.com/dashboard/healthcare/doctor/getDoctorTiming?doctor_id="+this.doctor_id+"&id="+this.timing_id)
            .subscribe(
                (data:any[])=>
                {
                    timing=data;
                    this.timingForm.controls['hospital'].setValue(timing.hospital);
                    this.timingForm.controls['department'].setValue(timing.department);
                    this.timingForm.controls['start_time'].setValue(timing.start_time);
                    this.timingForm.controls['end_time'].setValue(timing.end_time);
                    this.timingForm.controls['fee'].setValue(timing.fee);

                }
            )
        }
    
       
    }


        getCity() {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void {
        
        
        
        let specialization;
        let institute;
        let degree;
        let year;
        
        let degName:any;
        this.timingForm= new FormGroup({
            city: new FormControl('',Validators.required),
            hospital:new FormControl('',Validators.required),
            department:new FormControl('',Validators.required),
            start_time:new FormControl('',Validators.required),
            end_time:new FormControl('',Validators.required),
            fee:new FormControl('',Validators.required),

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
        this.timingForm.reset();
    }

   

  

    onSubmit() {
        this.formName=doctors.addOrUpdateTimings;
        console.log('Saved: ' + JSON.stringify(this.timingForm.value));
        console.log(this.timingForm);
        console.log(this.timingForm.value);
        this.result = this.timingForm.value;
        this.result['city_id'] = this.city_id;
        this.result['hospital_id']=2;
        this.result['doctor_id']=this.doctor_id;
        this.result['hospital_department_id']=2;
        this.result['timing']=2;
        console.log(this.result);
        this.dataTransfer.push(this.formName, this.timingForm.value)
            .subscribe();
    }

  
    onChanges(): void {
        const phoneControl = this.timingForm.get('phone');
        

       
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


    

      getAnotherEvent(value:any){
          if(value)
          {
              let hospital_id;
          for(let key of this.types)
          {
              if(key.name==value)
              {
                  hospital_id=key.id;
              }

          }
          console.log(hospital_id);

          let formName=hospitals.getDepartments;
          this.dataTransfer.get(formName+hospital_id).subscribe(
              (data:any[])=>
              {
              this.departments=data;
              this.departments=this.departments.hospital_department_list;
              console.log(this.departments);
              }
            )
        }
        else
        {
            this.departments=null;

        }

      }

      onChange(newValue)
      {
          this.departments=newValue;
      }
    
}