import { Component, ViewChild, OnInit } from "@angular/core";
import {  hospitals, labs } from "../../healthcare.apis";
import { NgForm, Validators, FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { Response } from "@angular/http";
import {Lab } from "../../../models/lab";
import { range } from "rxjs/observable/range";
import { CityService } from "../../../../services/city-data.service";
import { ActivatedRoute, Params } from "@angular/router";


@Component({
    selector:'app-lab-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../healthcare.css']
})


export class AddUpdateLabsComponent implements OnInit {
    lab;
    lab_id;
    latitude;
    longitude;

    formName = labs.addOrUpdateLab;
    labForm:FormGroup;
    profile_image_url:''

    gg: any;
    city;
    img2;
    city_id: number;
    img;
    files = [];
    i=0;
    day0=0;
    page_count;
    online_reports="2";
    home_sample_pickup="2";
    file;
    file2;

   sample = [1, 2];
  model = { options:'2' };
    
    result:object;
    description:'';

    flag=0;


    constructor( private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {
    
        this.route.params.subscribe((params:Params)=>
    {
        this.lab_id=params['id'];
    })

     
          let name: string;
          
          let accreditation:string;
          let mobile:number;
          let email:string;
     
          let city:string;
          let profile_image_url:string;
        
          let description:'';
          let online_reports;
          let home_sample_pickup;
          this.labForm= new FormGroup({
              name: new FormControl(name, Validators.required),
              profile_image_url:new FormControl('',Validators.required),
              cover_image_url:new FormControl('',Validators.required),
              accreditation:new FormControl(accreditation,Validators.required),
              mobile:new FormControl(mobile,Validators.required),
              email:new FormControl(email,[Validators.required,Validators.email]),
            
              description:new FormControl(description),
            
              online_reports:new FormControl(online_reports),
              approval_status:new FormControl(''),
              home_sample_pickup:new FormControl(home_sample_pickup),
              city: new FormControl('',Validators.required),
              state:new FormControl('',Validators.required),
              country:new FormControl('',Validators.required),
              address:new FormControl('',Validators.required),
              latitude:new FormControl('',Validators.required),
              longitude:new FormControl('',Validators.required),
              landmark:new FormControl(''),
              pincode:new FormControl('',Validators.required),
          })
      


        this.getCity();
        this.labForm.value.city = this.city;
        this.labForm.value.city_id=this.city_id;
        this.labForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            profile_image_url:['',[Validators.required]],
            cover_image_url:['',[Validators.required]],
            accreditation:['',[Validators.required]],
            mobile:['',[Validators.required]],
            email:['',[Validators.email,Validators.required]],
            city:['',[Validators.required]],
            description:[''],
            online_reports:[this.online_reports],
            home_sample_pickup:[this.home_sample_pickup],
            city_id:[''],
           
            state:[,[Validators.required,Validators.minLength(3)]],
            country:['',[Validators.required]],
            address:['',[Validators.required]],
            latitude:['',[Validators.required]],
            longitude:['',[Validators.required]],
            landmark:[''],
            pincode:['',[Validators.required]],
        
        });

       this.onChanges();

       if(this.lab_id){
       let formName=labs.getLabById;


       this.dataTransfer.get(formName+this.lab_id)
 .subscribe(
     (data: any[]) => {
         this.lab= data, console.log(this.lab);              
         this.page_count = (<any>data).page_count;
    
         this.labForm.controls['profile_image_url'].setValue('');
         this.labForm.controls['cover_image_url'].setValue('');
         this.labForm.controls['name'].setValue(this.lab.name);
         this.labForm.controls['mobile'].setValue(this.lab.mobile);
         this.labForm.controls['email'].setValue(this.lab.email);
         this.labForm.controls['accreditation'].setValue(this.lab.accreditation);
         let val;
         if(this.lab.home_sample_pickup==true)
         val="1";
         else
         val="2";
        this.labForm.controls['home_sample_pickup'].setValue(val);

         if(this.lab.online_reports==true)
         val="1";
         else
         val="2";

         this.labForm.controls['online_reports'].setValue(val);
     
       
      
         this.labForm.controls['city'].setValue(this.lab.city);
         this.labForm.controls['state'].setValue(this.lab.state);
         this.labForm.controls['address'].setValue(this.lab.address);
         this.labForm.controls['country'].setValue(this.lab.country);
         this.labForm.controls['address'].setValue(this.lab.address);
         this.labForm.controls['landmark'].setValue(this.lab.landmark);
         this.labForm.controls['pincode'].setValue(this.lab.pincode);
         this.labForm.controls['latitude'].setValue(this.lab.latitude);
         this.labForm.controls['longitude'].setValue(this.lab.longitude);
         this.labForm.controls['description'].setValue(this.lab.description);

  
       
     }
 ); 
}}
      getCity() {
            
        this.data.currentMessage.subscribe(message => this.city = message);
        this.data.currentNumber.subscribe(message => this.city_id = message);
    }
    fileEvent(fileInput: any) {
       
        this.files = (<any>event).target.files;
        const file = this.files[0];
        this.file = file;
       
     
    }

    FinalUpload(file:any) {
    
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
    FinalUpload1(file:any) {
    
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
    

    finalSubmit()
    {
        this.result = this.labForm.value;
        this.result['city_id'] = this.city_id;
        this.result['city'] = this.city;
    
        this.labForm.value.profile_image_url=this.img;
        this.labForm.value.cover_image_url=this.img2;
        if(this.labForm.value.online_reports=='2')
        this.labForm.value.online_reports='No';
        else 
        this.labForm.value.online_reports='Yes';
        if(this.labForm.value.home_sample_pickup=='2')
        this.labForm.value.home_sample_pickup='No';
        else
        this.labForm.value.home_sample_pickup='Yes';
       
        if(this.lab_id)
        this.labForm.value.id=this.lab_id;
        console.log(this.labForm.value);
        this.dataTransfer.push(this.formName, this.labForm.value)
            .subscribe();
    }


    fileEvent1(fileInput: any) {
        this.files = (<any>event).target.files;
        const file = this.files[0];
        this.file2 = file;
    }

    
   
    Reset()
    {
        this.ngOnInit();
    }

  
      

    
    onSubmit() {

        this.FinalUpload(this.file);
        this.FinalUpload1(this.file2);
        console.log('Saved: ' + JSON.stringify(this.labForm.value));
        console.log(this.labForm);
        console.log(this.labForm.value);
      
    }

    mapItems(items) {
        let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);

        return selectedItems.length ? selectedItems : null;
      }

   

    onChanges(): void {
        const phoneControl = this.labForm.get('phone');
       
    }
    getLatLong() {
        const str = this.labForm.value.addres + + this.labForm.value.city;
 
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