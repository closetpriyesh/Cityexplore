import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";
import { switchMap } from 'rxjs/operators';

@Component({
    selector:'app-vehicle-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../transport.css']
})


export class AddUpdateVehicleComponent implements OnInit {

    vehicle_id;
    vehicleForm:FormGroup;
    formName;
    city;
    vehicle;
    page_count;
    companies;
    seating_type=["AC","NON-AC"];
    city_id;
    types=["Bus","Cab"];
    actual;
    days= [
        {id:'1',key: 'sun', text: 'Sunday'},
        {id:'2',key: 'mon', text: 'Monday'},
        {id:'3',key: 'tue', text: 'Tuesday'},
        {id:'4',key: 'wed', text: 'Wednesday'},
        {id:'5',key: 'thu', text: 'Thursday'},
        {id:'6',key: 'fri', text: 'Friday'},
        {id:'7',key: 'sat', text: 'Saturday'},

      ];
      flag=0;

    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.route.params.subscribe((params:Params)=>
    {
        this.vehicle_id=params['id'];

    });

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


        this.vehicleForm= new FormGroup({
            number: new FormControl('', Validators.required),
            company:new FormControl('',Validators.required),
            capacity:new FormControl('',Validators.required),
            type:new FormControl('',Validators.required),
            seating:new FormControl('',Validators.required),
            days:checkboxGroup,
            selectedItems: hiddenControl,
            
           
            
        })
        this.getCity();
        this.vehicleForm.value.city = this.city;
        this.vehicleForm.value.city_id=this.city_id;
 
        this.formName=transport.get_approved_companies;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.companies = data;  
                this.page_count = (<any>data).page_count;
                this.companies=this.companies.data;
                console.log(this.companies);
            }
        );

    

        this.vehicleForm = this.fb.group({
            number: ['', [Validators.required, Validators.minLength(3)]],
            company:['',[Validators.required]],
            capacity:['',[Validators.required]],
            type:['',[Validators.required]],
            seating:['',Validators.required],
            days:checkboxGroup,
            selectedItems: hiddenControl,
            
           
        });
        
        this.onChanges();
        if(this.vehicle_id)
        {

        let formName=transport.get_vehicle_by_id;

      
 
        this.dataTransfer.get(formName+this.vehicle_id)
  .subscribe(
      (data: any[]) => {
          this.vehicle= data, console.log(this.vehicle);              
          this.page_count = (<any>data).page_count;
          this.vehicle=this.vehicle.data;
          this.vehicleForm.controls['number'].setValue(this.vehicle.number);
          this.vehicleForm.controls['capacity'].setValue(this.vehicle.capacity);
          this.vehicleForm.controls['seating'].setValue(this.vehicle.seating);
          this.vehicleForm.controls['type'].setValue(this.vehicle.type);   
          this.vehicleForm.controls['company'].setValue(this.vehicle.company);   
          let days=this.vehicle.days_operation.split(/[,.]/);        
          console.log(days);  
          let i=0;
          for(let key of days)
          {
             key=key.toString().toLowerCase();
             console.log(key);
                if(key=="mon"){
                 this.vehicleForm.value.days[0].checkbox=true;
                }
                else if(key=="tue")
                this.vehicleForm.value.days[1].checkbox=true;
                else if(key=="wed")
                this.vehicleForm.value.days[2].checkbox=true;
                else if(key=="wed")
                this.vehicleForm.value.days[3].checkbox=true;
                else if(key=="thu")
                this.vehicleForm.value.days[4].checkbox=true;
                else if(key=="fri")
                this.vehicleForm.value.days[5].checkbox=true;
                else if(key=="sat")
                this.vehicleForm.value.days[6].checkbox=true;
             
            
              i++;
          }

          this.vehicleForm.controls['days'].setValue(this.vehicleForm.value.days);  
        }); 

        }
    }


        getCity() 
        {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

   
          
   
    Reset()
    {
        this.vehicleForm.reset();
     
    }

    onSubmit() 
    {


    
          

        this.formName=transport.addVehicle;
         this.actual={};
    
        let days;
        days=this.vehicleForm.value.selectedItems;
        let final_days="";
        let len=days.length;
        let i=0;
        for(let key of days)
        {
        if(i<len-1)
        final_days+=key+',';
        else 
        final_days+=key;
      
            i++;
        }

        this.actual.number=this.vehicleForm.value.number;
        this.actual.company=this.vehicleForm.value.company;
        this.actual.capacity=this.vehicleForm.value.capacity;
        this.actual.type=this.vehicleForm.value.type;
        this.actual.seating=this.vehicleForm.value.seating;
        this.actual.days_operation=final_days;
        console.log(this.actual);
        if(this.vehicle_id)
        this.actual.id=this.vehicle_id;
          this.dataTransfer.push(this.formName,this.actual)
          .subscribe();
     
    }
    mapItems(items) {
        let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);

        return selectedItems.length ? selectedItems : null;
      }


    onChanges(): void 
    {
        const phoneControl = this.vehicleForm.get('phone'); 
    }
}