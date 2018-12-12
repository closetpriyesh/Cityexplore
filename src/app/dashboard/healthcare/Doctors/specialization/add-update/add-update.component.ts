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
    templateUrl: './add-update.component.html',
   styleUrls:['../../../healthcare.css']
})

export class AddDoctorSpecialization{

    formName;
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    types;
    splForm:FormGroup;
   
    result: object;
    city_id;
    description:'';
    approval_status;
    page_count;
    services_offered;
    specialization;
    degrees;
    doctor_id;
    specialization_id;
  
    range=[];

    constructor(private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder,private route:ActivatedRoute) {}
   
    ngOnInit():void {

        this.initForm();
        this.getCity();
       
      

        this.route.params.subscribe((params: Params) => {
            this.doctor_id = params['id'];
            this.specialization_id=params['id2'];
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


        
        this.splForm.value.city= this.city;
        this.splForm.value.city_id=this.city_id;
        

        this.splForm = this.fb.group({
            specialization:[this.types,[Validators.required]],
          services_offered:['',[Validators.required]],
            description:['',Validators.required],
            
            
        });

      

      
       
     

        this.onChanges();
        if(this.specialization_id)
        {
            let specialization;
            this.dataTransfer.get("http://uat2-healthcare.cityexploro.com/dashboard/healthcare/doctor/getDoctorSpecialization?doctor_id="+this.doctor_id+"&id="+this.specialization_id)
            .subscribe(
                (data:any[])=>
                {
                    specialization=data;
                    this.splForm.controls['specialization'].setValue(specialization.specialization);
                    this.splForm.controls['services_offered'].setValue(specialization.services_offered);
                    this.splForm.controls['description'].setValue(specialization.description);

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
        this.splForm= new FormGroup({
           specialization: new FormControl('',Validators.required),
            services_offered:new FormControl('',Validators.required),
            description:new FormControl('',Validators.required),
           

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
        this.splForm.reset();
    }



  

    onSubmit() {
        this.formName=doctors.addOrUpdateSpecialization;
        this.splForm.value.doctor_id=this.doctor_id;
        let result;
        let degrees=[{}];
        degrees=this.degrees;
        let actual;
        actual=this.splForm.value;
        for(let key in this.degrees){
            if(this.degrees[key].name==this.splForm.value.degree) {
                result=this.degrees[key].id;
                actual.degree_id=result;
            }
        }
    
    

       console.log(actual);
        this.dataTransfer.push(this.formName, actual)
            .subscribe();
    }

 

    onChanges(): void {
        const phoneControl = this.splForm.get('phone');
       
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