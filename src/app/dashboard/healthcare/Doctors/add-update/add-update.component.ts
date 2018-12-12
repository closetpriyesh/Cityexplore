import { Component, OnInit } from "@angular/core";
import { doctors, extra } from "../../healthcare.apis";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { Doctor } from "../../../models/doctor";
import { Response } from "@angular/http";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { DoctorService, DOCTOR } from "../../../../services/doctor.service";
import { switchMap } from "rxjs/operators";
import {Observable} from 'rxjs';



@Component({
    selector:'app-doctor-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../healthcare.css']
})


export class AddUpdateDoctorsComponent implements OnInit {

    formName ='';   
    profile_image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    doctorForm:FormGroup;
    latitude;
    longitude;
    img2;

img;
file2;
i=0;
   
  
    result: object;
    city_id=2;
    description:'';
    total_exp;
    exp_details;
    type:string;
     awards;
     types;
    page_count;
    doctor;
    doctor_id;
    doctor$:Observable<DOCTOR>
    
    constructor(private service:DoctorService,private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.route.params.subscribe((params:Params)=>
    {
        this.doctor_id=params['id'];

    });

        this.initForm();
        this.getCity();
        this.doctorForm.value.city = this.city;
        this.doctorForm.value.city_id=this.city_id;
 
        this.formName=extra.getspecialization;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.types = data, console.log(this.types);    
                this.page_count = (<any>data).page_count;
                this.types=this.types.specialization_list;
            }
        );

    

        this.doctorForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            profile_image_url:['',[Validators.required]],
            cover_image_url:['',[Validators.required]],
            phone:['',[Validators.required]],
            email:['',[Validators.required,Validators.email]],
            description:[''],
            total_exp:['',[Validators.required]],
            exp_details:['',[Validators.required]],
            type:['',[Validators.required]],
            awards:[''],
            city:['',[Validators.required]],
         
            state:[,[Validators.required,Validators.minLength(3)]],
            country:['',[Validators.required]],
            address:['',[Validators.required]],
            latitude:['',[Validators.required]],
            longitude:['',[Validators.required]],
            landmark:[''],
            pincode:['',[Validators.required]],
            
        });
        this.onChanges();

        if(this.doctor_id)
        {

        let formName=doctors.getdoctor;


        this.dataTransfer.get(formName+this.doctor_id)
  .subscribe(
      (data: any[]) => {
          this.doctor= data, console.log(this.doctor);              
          this.page_count = (<any>data).page_count;
          this.doctorForm.controls['profile_image_url'].setValue('');
          this.doctorForm.controls['cover_image_url'].setValue('');
          this.doctorForm.controls['name'].setValue(this.doctor.name);
          this.doctorForm.controls['phone'].setValue(this.doctor.phone);
          this.doctorForm.controls['email'].setValue(this.doctor.email);
          this.doctorForm.controls['total_exp'].setValue(this.doctor.total_exp);
          this.doctorForm.controls['exp_details'].setValue(this.doctor.exp_details);
          this.doctorForm.controls['type'].setValue(this.doctor.type);
          this.doctorForm.controls['awards'].setValue(this.doctor.awards);
          this.doctorForm.controls['city'].setValue(this.doctor.city);
          this.doctorForm.controls['state'].setValue(this.doctor.state);
          this.doctorForm.controls['address'].setValue(this.doctor.address);
          this.doctorForm.controls['country'].setValue(this.doctor.country);
          this.doctorForm.controls['address'].setValue(this.doctor.address);
          this.doctorForm.controls['landmark'].setValue(this.doctor.landmark);
          this.doctorForm.controls['pincode'].setValue(this.doctor.pincode);
          this.doctorForm.controls['latitude'].setValue(this.doctor.latitude);
          this.doctorForm.controls['longitude'].setValue(this.doctor.longitude);
          this.doctorForm.controls['description'].setValue(this.doctor.description);
        }
  ); 

        }}


        getCity() {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm(doctor?:Doctor):void {
        
        let name: string;
        let profile_image_url:string;

        let phone:number;
        let email:string;
        let total_exp:string;
        let exp_details:string;
        let description:string;
        let type:string;
        let awards:string;
        let doctors: FormArray = new FormArray([]);
        this.doctorForm= new FormGroup({
            name: new FormControl(name, Validators.required),
            profile_image_url:new FormControl(profile_image_url,Validators.required),
            cover_image_url:new FormControl('',Validators.required),
            
            phone:new FormControl(phone,Validators.required),
            email:new FormControl(email,[Validators.required,Validators.email]),
            description: new FormControl(description),
            total_exp: new FormControl('',Validators.required),
            exp_details:new FormControl(exp_details,Validators.required),
            type:new FormControl(type,Validators.required),
            awards:new FormControl(awards),
            city: new FormControl('',Validators.required),
            state:new FormControl('',Validators.required),
            country:new FormControl('',Validators.required),
            address:new FormControl('',Validators.required),
            latitude:new FormControl('',Validators.required),
            longitude:new FormControl('',Validators.required),
            landmark:new FormControl(''),
            pincode:new FormControl('',Validators.required),
       

        })
      }


      fileEvent(fileInput: any) {
       
        this.files = (<any>event).target.files;
        const file = this.files[0];
        this.file = file;
       
     
    }

    FinalUpload(file:any)
    {
        this.dataTransfer.uploadFile(file.name, file.type)
        .subscribe(
            (response: Response) => {console.log(response.json()),
                this.gg = response.json(),
                console.log(this.gg.data),
                console.log(this.gg.url);
                
                this.img = this.gg.url;
                this.dataTransfer.upload(file, this.gg.data, this.gg.url)
                    .then(
                        (data) => {console.log(data);
                        },
                  
                        (error) => console.log(error)
                    );
            });
    }

    FinalUpload1(file:any)
    {
        this.dataTransfer.uploadFile(file.name, file.type)
        .subscribe(
            (response: Response) => {console.log(response.json()),
                this.gg = response.json(),
                console.log(this.gg.data),
                console.log(this.gg.url);
                
                this.img2 = this.gg.url;
                this.dataTransfer.upload(file, this.gg.data, this.gg.url)
                    .then(
                        (data) => {console.log(data);
                            this.finalSubmit();
                        },
                  
                        (error) => console.log(error)
                    );
            });
    }
    


    fileEvent1(fileInput: any) {
        this.files = (<any>event).target.files;
        const file = this.files[0];
        this.file2 = file;
    }

    


    Reset() {
        this.doctorForm.reset();
     
    }
    
   

   

    finalSubmit()
    {
        this.formName=doctors.addOrUpdateDoctors;       
        this.doctorForm.value.profile_image_url=this.img;
        this.doctorForm.value.cover_image_url=this.img2;
        this.doctorForm.value.city=this.city;
        this.doctorForm.value.city_id=this.city_id;
        if(this.doctor_id)
        this.doctorForm.value.id=this.doctor_id;
        console.log(this.doctorForm.value);
        this.dataTransfer.push(this.formName, this.doctorForm.value)
            .subscribe();
    }
      onSubmit() {
          this.FinalUpload(this.file);
          this.FinalUpload1(this.file2);
         
     
    }


    onChanges(): void {
        const phoneControl = this.doctorForm.get('phone'); 
    }
    
    getLatLong() {
        const str = this.doctorForm.value.addres + + this.doctorForm.value.city;
 
        this.dataTransfer.getlatlng(str)
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.latitude = data.lat;
                    this.longitude = data.lng;
                }
            );
    }
}