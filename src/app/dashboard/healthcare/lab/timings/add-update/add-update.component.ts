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
    templateUrl: './add-update.component.html',
    styleUrls:['../../../healthcare.css']
})

export class AddLabTiming{

    formName;
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    types;
    lab_id;
    timingForm:FormGroup;
    result: object;
    city_id;
    description:'';
    timing_id;
    approval_status;
    page_count;
    day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

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
        this.timingForm.value.city= this.city;
        this.timingForm.value.city_id=this.city_id;
        this.route.params.subscribe(
            (params:ParamMap)=>
            {
                this.lab_id=params['id'];
                this.timing_id=params['id2'];
            }
        )
     

        this.timingForm = this.fb.group({
           
            close_time:['',[Validators.required]],
            open_time:['',[Validators.required]],
            lab_id:[''],
            day:['',Validators.required],
           
            
        });

      
       
     

        this.onChanges();
        if(this.timing_id)
        {
            let timing;
            this.dataTransfer.get("http://uat2-healthcare.cityexploro.com/dashboard/healthcare/lab/getLabTimings?lab_id="+this.lab_id+"&id="+this.timing_id)
            .subscribe(
                (data:any[])=>
                {
                    timing=data;
                    this.timingForm.controls['day'].setValue(timing.day);
                    this.timingForm.controls['open_time'].setValue(timing.open_time);
                    this.timingForm.controls['close_time'].setValue(timing.close_time);
              
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
        this.timingForm= new FormGroup({
            
            close_time:new FormControl('',Validators.required),
            open_time:new FormControl('',Validators.required),
            day:new FormControl('',Validators.required),

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
        this.timingForm.reset();
    }

       

  

    onSubmit() {
        this.formName=labs.addOrUpdateLabTimings;
        this.timingForm.value.lab_id=this.lab_id;
        console.log(this.timingForm.value);
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
    

}