
import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

import { Response } from "@angular/http";

import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { hospitals, extra } from "../../../healthcare.apis";


@Component({
    selector: 'app-hospital-department',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './department.html',
    styleUrls:['./department.css']
})

export class AddHospitalDepartment {
    services;
    departments;
    formName;
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    types;
    departmentForm:FormGroup;
    imageForm:FormGroup;
    image_list;
    result: object;
    city_id;
    description:'';
    page_count;
    hospital_id;
    approval_status;
    hospital_deptid;
    actual;

    

    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.initForm();
        this.getCity();
        this.route.params.subscribe((params: Params) => {
            this.hospital_id = params['id'];
            this.hospital_deptid=params['id2'];
                console.log(this.hospital_deptid);
                
              });
        
        this.departmentForm.value.city= this.city;
        this.departmentForm.value.city_id=this.city_id;

        this.formName=extra.getApprovedSpecialization;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.types = data, console.log(this.types);    
                this.page_count = (<any>data).page_count;
                this.types=this.types.specialization_list;
            }
        );

        if(this.hospital_deptid)
        {
            this.formName=hospitals.getDepartmentByDepartmentId;
            let department;
            this.dataTransfer.get("http://uat2-healthcare.cityexploro.com/dashboard/healthcare/hospital/getHospitalDepartment?hospital_id="+this.hospital_id+"&id="+this.hospital_deptid)
            .subscribe(
                (data: any[]) => {
                    department = data, console.log(department);    
                    
            this.departmentForm.controls['name'].setValue(department.name);
            this.departmentForm.controls['description'].setValue(department.description);
            this.departmentForm.controls['services_offered'].setValue(department.services_offered);
          
            this.departmentForm.controls['specialization'].setValue(department.specialization);
                });
        


        }


        this.formName=hospitals.getDepartments;

        this.dataTransfer.get(this.formName+this.hospital_id)
        .subscribe(
            (data: any[]) => {
                this.departments = data, console.log(this.departments);    
                this.page_count = (<any>data).page_count;
                this.departments=this.departments.departments;
            }
        );

        this.departmentForm = this.fb.group({
            specialization:['',[Validators.required]],
            name:['',[Validators.required]],
            services_offered:['',[Validators.required]],
            image_url:['',[Validators.required]],
            description:[''],

            
        });     


        this.onChanges();
     
        
       
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
        this.departmentForm= new FormGroup({
            specialization: new FormControl('',Validators.required),
            name: new FormControl('',Validators.required),
            services_offered: new FormControl('',Validators.required),
            image_url: new FormControl('',Validators.required),
            description:new FormControl(''),
           

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
                    this.image_list=[{}];
                    this.dataTransfer.upload(file, this.gg.data, this.gg.url)
                        .then(
                            (data) => {console.log(data), console.log(this.image_url); 
                            this.image_list.image_url=this.gg.url},
                            (error) => console.log(error)
                        );
                });
    }

    Reset() {
        this.departmentForm.reset();
    }

 

   

  

    onSubmit() {
        this.formName=hospitals.addOrUpdateDepartment;
       this.departmentForm.value.hospital_id=this.hospital_id;
      
        this.dataTransfer.push(this.formName, this.departmentForm.value)
            .subscribe();
    }

   

  
    onChanges(): void {
        const phoneControl = this.departmentForm.get('phone');
       
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