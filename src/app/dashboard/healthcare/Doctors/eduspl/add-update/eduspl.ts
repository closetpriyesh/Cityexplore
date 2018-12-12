import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl, Form } from "@angular/forms";
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { doctors, extra } from "../../../healthcare.apis";

@Component({
    selector: 'app-doctor-eduspl',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './eduspl.html',
    styleUrls:['../../../healthcare.css']
})

export class AddDoctorEducation{

    formName;
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    types;
    eduForm:FormGroup;
   
    result: object;
    city_id;
    description:'';
    approval_status;
    page_count;
    services_offered;
    specialization;
    degrees;
    doctor_id;
    years;
    range=[];
    education_id;

    constructor(private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder,private route:ActivatedRoute) {}
   
    ngOnInit():void {

        this.initForm();
        this.getCity();
        var y=new Date().getFullYear();

        for (var i = 1981; i <= y; i++) {
            this.range.push(i);
        }
      

        this.route.params.subscribe((params: Params) => {
            this.doctor_id = params['id'];
            this.education_id=params['id2'];
                console.log(this.doctor_id);
              });


        


        this.formName=extra.getApprovedSpecialization;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.types = data, console.log(this.types);    
                this.page_count = (<any>data).page_count;
                this.types=this.types.specialization_list;
            }
        );

        this.formName=extra.getApprovedDegrees;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.degrees= data, console.log(this.degrees);    
                this.page_count = (<any>data).page_count;
               this.degrees=this.degrees.degree_list;
              
            }
        );

        
        this.eduForm.value.city= this.city;
        this.eduForm.value.city_id=this.city_id;
        

        this.eduForm = this.fb.group({
            specialization:[this.types,[Validators.required]],
            institute:['',[Validators.required]],
            degree:[this.degrees,Validators.required],
            year:['',Validators.required],
            
        });

        this.onChanges();


        if(this.education_id)
        {
            let education;
         this.dataTransfer.get("http://uat2-healthcare.cityexploro.com/dashboard/healthcare/doctor/getDoctorEducation?doctor_id="+this.doctor_id+"&id="+this.education_id)
         .subscribe(
             (data:any[])=>
             {
                education=data;
                console.log(education);
                this.eduForm.controls['institute'].setValue(education.institute);
                this.eduForm.controls['year'].setValue(education.year);
                this.eduForm.controls['degree'].setValue(education.degree);
                this.eduForm.controls['specialization'].setValue(education.specialization);
             });
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
        this.eduForm= new FormGroup({
           specialization: new FormControl('',Validators.required),
            institute:new FormControl('',Validators.required),
            degree:new FormControl('',Validators.required),
            year:new FormControl('',Validators.required),

        })
    
    }


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
        this.eduForm.reset();
    }



  

    onSubmit() {
        this.formName=doctors.addOrUpdateEducation;
        this.eduForm.value.doctor_id=this.doctor_id;
        let result;
        let degrees=[{}];
        degrees=this.degrees;
        let actual;
        actual=this.eduForm.value;
        for(let key in this.degrees){
            if(this.degrees[key].name==this.eduForm.value.degree) {
                result=this.degrees[key].id;
                actual.degree_id=result;
            }
        }
    
    

       console.log(actual);
        this.dataTransfer.push(this.formName, actual)
            .subscribe();
    }

 

    onChanges(): void {
        const phoneControl = this.eduForm.get('phone');
       
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