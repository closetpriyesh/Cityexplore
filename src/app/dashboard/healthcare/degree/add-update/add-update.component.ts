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

export class AddUpdateDegreeComponent{
   
    
   
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
  
    form=this;
    addFormDegree:FormGroup;
    result: object;
    name;
    city_id;
    description:'';
    approval_status;
    page_count;
    formName;
   types;
   degree_id;
   specialization;


    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {
        this.initForm();
        this.getCity();

        
        this.route.params.subscribe(
            (params:ParamMap)=>
            {
                this.degree_id=params['id'];
            }
        )
        this.formName=extra.getApprovedSpecialization;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data:any[])=>
            {
                this.specialization=data;
                this.specialization=this.specialization.specialization_list;
            }
        )
    
        

        this.addFormDegree.value.city= this.city;
        this.addFormDegree.value.city_id=this.city_id;
        this.addFormDegree = this.fb.group({
            name:['',[Validators.required]],
            description:[''],
            specialization:['',[Validators.required]],
        });

        this.onChangesDegree();
        if(this.degree_id)
        {
            let degree;
            let formName=extra.getDegreeById;
            this.dataTransfer.get(formName+this.degree_id)
            .subscribe(
                (data:any[])=>
                {
                    degree=data;
                    this.addFormDegree.controls['description'].setValue(degree.description);
                    this.addFormDegree.controls['name'].setValue(degree.name);
                    this.addFormDegree.controls['specialization'].setValue(degree.specialization);
                    
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
        
        
        let degree:string;
        let description:string;
        
        let name:any;


        this.addFormDegree= new FormGroup({
            description: new FormControl('',Validators.required),
            name:new FormControl('',Validators.required),
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

    ResetDegree() {
        this.addFormDegree.reset();
     
    }


    onSubmitDegree() {
      
      this.formName=extra.addOrUpdatedegree;
        console.log(this.addFormDegree.value);
        this.dataTransfer.push(this.formName, this.addFormDegree.value)
            .subscribe();
    }



    onChangesDegree(): void {
        const phoneControl = this.addFormDegree.get('phone');
        console.log("khan1");
    }


  
     editDegree(degree) {
        document.getElementById('degree').focus();
      }

}