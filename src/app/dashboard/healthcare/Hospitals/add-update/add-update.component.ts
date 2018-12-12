import { Component, ViewChild, OnInit } from "@angular/core";
import { hospitals } from "../../healthcare.apis";
import { NgForm, FormGroup, Validators, FormArray, FormControl, FormBuilder } from "@angular/forms";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { Response } from "@angular/http";
import { Hospital } from "../../../models/hospital";
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { HOSPITAL, HospitalService } from "../../../../services/hospital.service";
import {Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Component({
    selector:'app-hospitals-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../healthcare.css']
})


export class AddUpdateHospitalsComponent implements OnInit {

    hospital_group;
    formName = hospitals.addOrUpdateHospitals;
    hospitalForm:FormGroup;
    profile_image_url:''
    cover_image_url:'';
    latitude;
    longitude;
    file: any;
     f=0;
     page_count;
    img1;
    img2;
    file2;
    i=0;
    f1=0;
    f2=0;
    gg: any;
    city = '';
    city_id=2;
    form:FormGroup;
    files = [];
    ftypes=[];
    filesnew=[];
    day0=0;
    actual;
    phone_nums;
    days_open=['0','0','0','0','0','0','0'];
    result:object;
    description:'';
    hospital_id;
    hospital;
    hospital$:Observable<HOSPITAL>
   
    days= [
        {id:'1',key: 'sunday', text: 'Sunday'},
        {id:'2',key: 'monday', text: 'Monday'},
        {id:'3',key: 'tuesday', text: 'Tuesday'},
        {id:'4',key: 'wednesday', text: 'Wednesday'},
        {id:'5',key: 'thursday', text: 'Thursday'},
        {id:'6',key: 'friday', text: 'Friday'},
        {id:'7',key: 'saturday', text: 'Saturday'},

      ];
flag=0;    
    
 
   

    constructor(private service:HospitalService,private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.route.params.subscribe((params:Params)=>
    {
            this.hospital_id=params['id'];
    });


    console.log("Rama");
  let  types=["allopathy","homeopathy","ayurvedic"];
this.ftypes=types;
console.log(types);


        let name: string;
        let profile_image_url:string;
        let cover_image_url:string;
        let phone_nums;
        let email_ids:string;
        let opening_time:string;
        let closing_time:string;
        let city:string;
        let days_open:any;
        let description:'';
        
        let website:string;
        
      
       
      
        let checkboxGroup = new FormArray(this.days.map(item => new FormGroup({
            id: new FormControl(item.key),
            text: new FormControl(item.text),
            checkbox: new FormControl(false)
          })));


          let hiddenControl = new FormControl(this.mapItems(checkboxGroup.value), Validators.required);
        
          checkboxGroup.valueChanges.subscribe((v) => {
            this.flag=1;
            hiddenControl.setValue(this.mapItems(v));

            
          });

      
          let formName=hospitals.getApprovedHospitalGroup;
          this.dataTransfer.get(formName)
          .subscribe(
              (data: any[]) => {
                  this.hospital_group= data, console.log(this.hospital_group);  
                  this.hospital_group=this.hospital_group.hospital_group_list;            
                  this.page_count = (<any>data).page_count;
              })
            
          this.hospitalForm= new FormGroup({
            name: new FormControl(name, Validators.required),
            profile_image_url:new FormControl(profile_image_url,Validators.required),
            cover_image_url:new FormControl(cover_image_url,Validators.required),
            phone_nums:new FormControl(phone_nums,Validators.required),
            email_ids:new FormControl('',[Validators.required,Validators.email]),
            opening_time:new FormControl(opening_time,Validators.required),
            closing_time:new FormControl(closing_time,Validators.required),
            website:new FormControl('',Validators.required),
            city:new FormControl(city,Validators.required),
            description:new FormControl(description),
            type:new FormControl(this.ftypes),
            hospital_group:new FormControl(''),
             days:checkboxGroup,
             selectedItems: hiddenControl,
         
         
        })
        

        this.getCity();
        this.hospitalForm.value.city = this.city;
        this.hospitalForm.value.city_id=this.city_id;
     
        
        console.log("ramasadfkljsdfklj");

        this.hospitalForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            profile_image_url:['',[Validators.required]],
            cover_image_url:['',[Validators.required]],
            phone_nums:['',[Validators.required]],
            email_ids:['',[Validators.required,Validators.email]],
            opening_time:['',[Validators.required]],
            closing_time:['',[Validators.required]],
            city:['',[Validators.required]],
            website:['',[Validators.required]],
            description:[''],
            type:[this.ftypes],
            hospital_group:[''],
          
            days:checkboxGroup,
            selectedItems: hiddenControl,
            state:[,[Validators.required,Validators.minLength(3)]],
            country:['',[Validators.required]],
            address:['',[Validators.required]],
            latitude:['',[Validators.required]],
            longitude:['',[Validators.required]],
            landmark:[''],
            pincode:['',[Validators.required]],
         

        });
       this.onChanges();



       if(this.hospital_id)
       {

       let formName=hospitals.getHospitalById;


       this.dataTransfer.get(formName+this.hospital_id)
 .subscribe(
     (data: any[]) => {
         this.hospital= data, console.log(this.hospital);              
         this.page_count = (<any>data).page_count;
        
         this.hospital.image_url='';
         this.hospitalForm.controls['name'].setValue(this.hospital.name);
         this.hospitalForm.controls['phone_nums'].setValue(this.hospital.phone_nums);
         this.hospitalForm.controls['email_ids'].setValue(this.hospital.email_ids);
         this.hospitalForm.controls['opening_time'].setValue(this.hospital.opening_time);
         this.hospitalForm.controls['closing_time'].setValue(this.hospital.closing_time);
         this.hospitalForm.controls['type'].setValue(this.hospital.type);
         this.hospitalForm.controls['website'].setValue(this.hospital.website);
         this.hospitalForm.controls['description'].setValue(this.hospital.description);
         this.hospitalForm.controls['state'].setValue(this.hospital.state);
         this.hospitalForm.controls['country'].setValue(this.hospital.country);
         this.hospitalForm.controls['address'].setValue(this.hospital.address);
         this.hospitalForm.controls['landmark'].setValue(this.hospital.landmark);
         this.hospitalForm.controls['pincode'].setValue(this.hospital.pincode);
         this.hospitalForm.controls['latitude'].setValue(this.hospital.latitude);
         this.hospitalForm.controls['longitude'].setValue(this.hospital.longitude);
         this.hospitalForm.controls['hospital_group'].setValue(this.hospital.hospital_group);
         let i=0;
         for(let key of this.hospital.days_open)
         {

            if(key=="1"){
                this.hospitalForm.value.days[i].checkbox=true;
            }
             i++;
         }
         this.hospitalForm.controls['days'].setValue(this.hospitalForm.value.days);

       
     
       
     }
 ); 

       }

       

       
                    }

    initForm(hospital?: Hospital):void {
          // let name = 'Lal Path hospital';
          
      
     
      
   
      }

      getCity() {
            
        this.data.currentMessage.subscribe(message => this.city = message);
        this.data.currentNumber.subscribe(message => this.city_id = message);
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
                this.img1= this.gg.url;
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
            
                this.img2=this.gg.url;

               
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
        this.actual={};
        this.phone_nums=[];
        this.phone_nums.push(this.hospitalForm.value.phone_nums);
     
        this.actual.name=this.hospitalForm.value.name;
        this.actual.email_ids=this.hospitalForm.value.email_ids;
        this.actual.opening_time=this.hospitalForm.value.opening_time;
        this.actual.closing_time=this.hospitalForm.value.closing_time;
        let fdays=  this.hospitalForm.value.days;
        let sdays="";

        console.log(fdays);

        for(let key in fdays){
            if(fdays[key].checkbox==true)
            sdays+='1';
            else 
            sdays+='0';

        }
        console.log(sdays);
        console.log(this.hospitalForm.value.selectedItems);
        this.actual.days_open=sdays;
        this.actual.profile_image_url=this.img1;
        this.actual.cover_image_url=this.img2;
        this.actual.city=this.city;
        this.actual.city_id=this.city_id;
        this.actual.website=this.hospitalForm.value.website;
        this.actual.description=this.hospitalForm.value.description;
        this.actual.type=this.hospitalForm.value.type;
        this.actual.phone_nums=this.phone_nums;
        if(this.hospital_id)
        this.actual.id=this.hospital_id;
        let group_id;
        this.actual.state=this.hospitalForm.value.state;
        this.actual.country=this.hospitalForm.value.country;
        this.actual.latitude=this.hospitalForm.value.latitude;;
        this.actual.longitude=this.hospitalForm.value.longitude;
        this.actual.pincode=this.hospitalForm.value.pincode;
        this.actual.landmark=this.hospitalForm.value.landmark;
        this.actual.address=this.hospitalForm.value.address;
     
        for(let key in this.hospital_group){
            if(this.hospital_group[key].name==this.hospitalForm.value.hospital_group) {
                this.actual.group_id=this.hospital_group[key].id;
            }
        }


        console.log(this.actual);


        this.dataTransfer.push(this.formName, this.actual)
            .subscribe();
    }


    fileEvent1(fileInput: any) {
        this.files = (<any>event).target.files;
        const file = this.files[0];
        this.file2 = file;
    }

    

   
   Reset(){
       this.ngOnInit();
   }

    onSubmit() {

        this.FinalUpload(this.file);
        this.FinalUpload1(this.file2);

       
    }

    mapItems(items) {
        let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);

        return selectedItems.length ? selectedItems : null;
      }


   

    onChanges(): void {
        const phoneControl = this.hospitalForm.get('phone');
       
    }
    getLatLong() {
        const str = this.hospitalForm.value.addres + this.hospitalForm.value.city;
 
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