import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormArray, FormControl, FormBuilder } from "@angular/forms";
import { Chemist } from "../../../models/chemist";
import { chemists } from "../../healthcare.apis";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { Response } from "@angular/http";
import { CityService } from "../../../../services/city-data.service";
import { ActivatedRoute, Params } from "@angular/router";


@Component({
    selector:'app-chemist-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../healthcare.css']
})


export class AddUpdateChemistsComponent implements OnInit {

    formName = chemists.addOrUpdateChemists;
   
    profile_image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    img;
    img2;
    chemistForm:FormGroup;
    result: object;
    city_id;
    description:'';
    flag=0;
    latitude;
    homeopathy=false;
    ayurvedic=false;
    allopathy=false;
    longitude;
     flag1=0;
     file2;
     i=0;
    days= [
        {id:'1',key: 'day1', text: 'Sunday'},
        {id:'2',key: 'day2', text: 'Monday'},
        {id:'3',key: 'day3', text: 'Tuesday'},
        {id:'4',key: 'day4', text: 'Wednesday'},
        {id:'5',key: 'day5', text: 'Thursday'},
        {id:'6',key: 'day6', text: 'Friday'},
        {id:'7',key: 'day7', text: 'Saturday'},

      ];
      types= [
        {id:'1',key: 'type1', text: 'Allopathy'},
        {id:'2',key: 'type2', text: 'Homeopathy'},
        {id:'3',key: 'type3', text: 'Ayurvedic'},
      ];
     chemist;
     page_count;
     chemist_id;
   

    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {
        this.route.params.subscribe((params:Params)=>
        {
            this.chemist_id=params['id'];
        });
        this.flag=0;
        this.flag1=0;
        this.days= [
            {id:'1',key: 'sunday', text: 'Sunday'},
            {id:'2',key: 'monday', text: 'Monday'},
            {id:'3',key: 'tuesday', text: 'Tuesday'},
            {id:'4',key: 'wednesday', text: 'Wednesday'},
            {id:'5',key: 'thursday', text: 'Thursday'},
            {id:'6',key: 'friday', text: 'Friday'},
            {id:'7',key: 'saturday', text: 'Saturday'},
    
          ];
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

          let checkboxGroup1 = new FormArray(this.types.map(item => new FormGroup({
            id: new FormControl(item.key),
            text: new FormControl(item.text),
            checkbox1: new FormControl(false)
          })));


          let hiddenControl1 = new FormControl(this.mapItems1(checkboxGroup1.value), Validators.required);
        
          checkboxGroup1.valueChanges.subscribe((v) => {
            this.flag1=1;
            hiddenControl1.setValue(this.mapItems1(v));
            
          });
            
        let name: string;
        let profile_image_url:string;
    

        let phone:number;
        let email:string;
        let opening_time:string;
        let closing_time:string;
        let city:string;
        let days_open:any;
        let description:string;
      
        this.chemistForm= new FormGroup({
            name: new FormControl(name, Validators.required),
            profile_image_url:new FormControl(profile_image_url,Validators.required),
            cover_image_url:new FormControl('',Validators.required),
            phone:new FormControl(phone,Validators.required),
            email:new FormControl(email,[Validators.required,Validators.email]),
            opening_time:new FormControl(opening_time,Validators.required),
            closing_time:new FormControl(closing_time,Validators.required),
            city:new FormControl(city,Validators.required),
            description: new FormControl(description),
            days:checkboxGroup,
            selectedItems: hiddenControl,
            types:checkboxGroup1,
            selectedItems1: hiddenControl1,
            state:new FormControl('',Validators.required),
            country:new FormControl('',Validators.required),
            address:new FormControl('',Validators.required),
            latitude:new FormControl('',Validators.required),
            longitude:new FormControl('',Validators.required),
            landmark:new FormControl(''),
            pincode:new FormControl('',Validators.required),
       
  
        })

         
        this.getCity();
        this.chemistForm.value.city = this.city;
        this.chemistForm.value.city_id=this.city_id;

        
        this.chemistForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            profile_image_url:['',[Validators.required]],
            cover_image_url:['',[Validators.required]],
            phone:[,[Validators.required]],
            email:['',[Validators.required,Validators.email]],
            opening_time:['',[Validators.required]],
            closing_time:['',[Validators.required]],
            city:[this.chemistForm.value.city,[Validators.required]],
            description:[this.chemistForm.value.description],
            days:checkboxGroup,
            selectedItems: hiddenControl,
            types:checkboxGroup1,
            selectedItems1: hiddenControl1,
            state:[,[Validators.required,Validators.minLength(3)]],
            country:['',[Validators.required]],
            address:['',[Validators.required]],
            latitude:['',[Validators.required]],
            longitude:['',[Validators.required]],
            landmark:[''],
            pincode:['',[Validators.required]],
  


            
        });
        this.onChanges();

        let formName=chemists.getChemistById;


        if(this.chemist_id){
        this.dataTransfer.get(formName+this.chemist_id)
  .subscribe(
      (data: any[]) => {
          this.chemist= data, console.log(this.chemist);              
          this.page_count = (<any>data).page_count;
       
          this.chemistForm.controls['name'].setValue(this.chemist.name);
          this.chemistForm.controls['phone'].setValue(this.chemist.phone);
          this.chemistForm.controls['email'].setValue(this.chemist.email);
          this.chemistForm.controls['opening_time'].setValue(this.chemist.opening_time);
          this.chemistForm.controls['closing_time'].setValue(this.chemist.closing_time);
          this.chemistForm.controls['description'].setValue(this.chemist.description);
          this.chemistForm.controls['city'].setValue(this.chemist.city);
          this.chemistForm.controls['state'].setValue(this.chemist.state);
          this.chemistForm.controls['address'].setValue(this.chemist.address);
          this.chemistForm.controls['country'].setValue(this.chemist.country);
          this.chemistForm.controls['address'].setValue(this.chemist.address);
          this.chemistForm.controls['landmark'].setValue(this.chemist.landmark);
          this.chemistForm.controls['pincode'].setValue(this.chemist.pincode);
          this.chemistForm.controls['latitude'].setValue(this.chemist.latitude);
          this.chemistForm.controls['longitude'].setValue(this.chemist.longitude);
          this.chemistForm.controls['description'].setValue(this.chemist.description);
            let i=0;
            for(let key of this.chemist.days_open)
            {
   
               if(key=="1"){
                   this.chemistForm.value.days[i].checkbox=true;
               }
                i++;
            }


            if(this.chemist.aleopathy==true)
            this.chemistForm.value.types[0].checkbox1=true;

            if(this.chemist.homeopathy==true)
            this.chemistForm.value.types[1].checkbox1=true;

            if(this.chemist.ayurvedic==true)
            this.chemistForm.value.types[2].checkbox1=true;
    
        

            this.chemistForm.controls['days'].setValue(this.chemistForm.value.days);
            
            this.chemistForm.controls['types'].setValue(this.chemistForm.value.types);
   
 
          // this.chemistForm.setValue(this.chemist);
        
      }
  ); 
        }}


        getCity() {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm(chemist?: Chemist):void {
      
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
        this.ngOnInit();
     
    }
    
   

   finalSubmit()
   {
    console.log('Saved: ' + JSON.stringify(this.chemistForm.value));
    let fdays=  this.chemistForm.value.days;
    let sdays="";

    console.log(fdays);

    for(let key in fdays){
        if(fdays[key].checkbox==true)
        sdays+='1';
        else 
        sdays+='0';

    }
    this.chemistForm.value.days_open=sdays;

    let ftypes=this.chemistForm.value.selectedItems1;

    for(let key of ftypes)
    {
        console.log(key);
        if(key=="type1")
        this.allopathy=true;
        else if(key=="type2")
        this.homeopathy=true;
        else  if(key=="type3")
        this.ayurvedic=true;
    }

    console.log(ftypes);

    this.chemistForm.value.types=this.chemistForm.value.selectedItems1;
    this.chemistForm.value.profile_image_url=this.img;
    this.chemistForm.value.cover_image_url=this.img2;

    this.chemistForm.value.city_id=this.city_id;
    if(this.chemist_id)
    this.chemistForm.value.id=this.chemist_id;
    this.chemistForm.value.homeopathy=this.homeopathy;
    this.chemistForm.value.ayurvedic=this.ayurvedic;
    this.chemistForm.value.aleopathy=this.allopathy;

    console.log(this.chemistForm.value);
    this.dataTransfer.push(this.formName, this.chemistForm.value)
        .subscribe();

   }

    onSubmit() {
        this.FinalUpload(this.file);
        this.FinalUpload1(this.file2);
       
    }


    onChanges(): void {
        const phoneControl = this.chemistForm.get('phone');
       
    }
    mapItems(items) {
        let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);

        return selectedItems.length ? selectedItems : null;
      }

      mapItems1(items) {
        let selectedItems1 = items.filter((item) => item.checkbox1).map((item) => item.id);

        return selectedItems1.length ? selectedItems1 : null;
      }
       
    getLatLong() {
        const str = this.chemistForm.value.addres + + this.chemistForm.value.city;
 
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