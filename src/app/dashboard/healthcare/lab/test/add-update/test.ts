import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Response } from "@angular/http";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { labs } from "../../../healthcare.apis";
import { ActivatedRoute, ParamMap } from "@angular/router";


@Component({
    selector: 'app-lab-test',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './test.html',
    styleUrls:['./test.css']
})

export class AddLabService{

    formName;
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    types;
    lab_id;
    testForm:FormGroup;
    result: object;
    city_id;
    description:'';
    approval_status;
    service_id;
    page_count;

    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.initForm();
        this.getCity();
        // this.dataTransfer.get(this.formName)
        // .subscribe(
        //     (data: any[]) => {
        //         this.types = data, console.log(this.types);    
        //         this.page_count = (<any>data).page_count;
        //         this.types=this.types.tests;
        //     }
        // );
        this.testForm.value.city= this.city;
        this.testForm.value.city_id=this.city_id;
        this.route.params.subscribe(
            (params:ParamMap)=>
            {
                this.lab_id=params['id'];
                this.service_id=params['id2'];
            }
        )
        

        this.testForm = this.fb.group({
            description:[''],
            name:['',[Validators.required]],
            lab_id:[''],
          //  type:['',Validators.required],
            fee:['',Validators.required],
            
        });
        this.onChanges();

        if(this.service_id)
        {
            let test;
            this.dataTransfer.get("http://uat2-healthcare.cityexploro.com/dashboard/healthcare/lab/getLabServices?lab_id="+this.lab_id+"&id="+this.service_id)
            .subscribe(
                (data:any[])=>
                {
                    test=data;
                    this.testForm.controls['name'].setValue(test.name);
                    this.testForm.controls['description'].setValue(test.description);
                    this.testForm.controls['fee'].setValue(test.fee);
              
                }
            )
        }



       
    }


        getCity() {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void {
        
        
        
        let description:string;
        let type;
        let name;
        let fee;
        
        let degName:any;
        this.testForm= new FormGroup({
            description: new FormControl(''),
            fee:new FormControl('',Validators.required),
            name:new FormControl('',Validators.required),
          //  type:new FormControl('',Validators.required),

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
        this.testForm.reset();
    }

       

  

    onSubmit() {
        this.formName=labs.addOrUpdateLabsServices;
        this.testForm.value.lab_id=this.lab_id;
        console.log(this.testForm.value);
        this.dataTransfer.push(this.formName, this.testForm.value)
            .subscribe();
    }



    onChanges(): void {
        const phoneControl = this.testForm.get('phone');
       
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