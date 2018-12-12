import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { doctors, extra } from "../../healthcare.apis";
import { Response } from "@angular/http";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
    selector: 'app-common-view',
    templateUrl: './add-update.component.html',
    styleUrls:['../../healthcare.css']
})

export class AddUpdateSpecializationComponent{
    formName = extra.addOrUpdatespecialization;
    
   
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    specialization;
    specialization_types:FormControl;
    formName1=extra.getspecialization;
    form=this;
    addFormSpecialization:FormGroup;

    result: object;
    name;
    city_id;
    description:'';
    approval_status;
    page_count;
   types;
   specialization_id;

    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {
        console.log("my naem");
        this.initForm();
        this.getCity();
    
        this.route.params.subscribe(
            (params:ParamMap)=>
            {
                this.specialization_id=params['id'];
            }
        )
        this.addFormSpecialization.value.city= this.city;
        this.addFormSpecialization.value.city_id=this.city_id;
        

        this.addFormSpecialization = this.fb.group({
            description:[''],
            specialization:['',[Validators.required]],
            
        });
        this.onChangesSpecialization();
        if(this.specialization_id)
        {
            let specialization;
            let formName=extra.getspecializationbyid;
            this.dataTransfer.get(formName+this.specialization_id)
            .subscribe(
                (data:any[])=>
                {
                    specialization=data;
                    this.addFormSpecialization.controls['description'].setValue(specialization.description);
                    this.addFormSpecialization.controls['specialization'].setValue(specialization.name);
                }
            )
        }
    }


        getCity() 
        {
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void {
        
        
        let specialization:string;
        let description:string;
        
        let name:any;
        this.addFormSpecialization= new FormGroup({
            description: new FormControl('',Validators.required),
            specialization:new FormControl('',Validators.required),

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

    ResetSpecialization() {
        this.addFormSpecialization.reset();
     
    }

   
       

    onSubmitSpecialization() {
        console.log(this.addFormSpecialization.value);
        this.dataTransfer.push(this.formName, this.addFormSpecialization.value)
            .subscribe();
        
    }



    onChangesSpecialization(): void {
        const phoneControl = this.addFormSpecialization.get('phone');
        console.log("khan");

       
    }

  
      editSpecialization(specialization) {
        document.getElementById('newspecialization').focus();

      }
  
  
  
    


}