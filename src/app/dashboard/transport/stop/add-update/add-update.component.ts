import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";
import { Response } from "@angular/http";

@Component({
    selector:'app-stop-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../transport.css']
})


export class AddUpdateStopComponent implements OnInit {

    stop_id;
    stopForm:FormGroup;
    formName;
    city;
    img;
    gg;
    img2;
    files;

    stop;
    page_count;
    lat;
    lon;
    file;
    file2;
    companies;
    seating_type=["AC","NON-AC"];
    city_id;
    types=["Bus","Cab"];
    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.route.params.subscribe((params:Params)=>
    {
        this.stop_id=params['id'];

    });

        this.initForm();
        this.getCity();
        this.stopForm.value.city = this.city;
        this.stopForm.value.city_id=this.city_id;

    

        this.stopForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
         
          
          
        });


        
        this.onChanges();
        if(this.stop_id)
        {

        let formName=transport.get_stop_by_id;
 
        this.dataTransfer.get(formName+this.stop_id)
  .subscribe(
      (data: any[]) => {
          this.stop= data, console.log(this.stop);              
          this.page_count = (<any>data).page_count;
          this.stop=this.stop.data;
          this.stopForm.controls['name'].setValue(this.stop.name);
              
        }); 

        }
    }


        getCity() 
        {
            
            this.data.currentMessage.subscribe(message => this.city = message);
           
          
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void
     {
             this.stopForm= new FormGroup({
            name: new FormControl('', Validators.required),

          

        
        })
      }

    Reset()
    {
        this.stopForm.reset();
     
    }


      
    onSubmit() 
    {
        this.formName=transport.addStop;
        this.stopForm.value.city_id=this.city_id;
        console.log(this.stopForm.value);
        if(this.stop_id)
        this.stopForm.value.id=this.stop_id;

          this.dataTransfer.push(this.formName, this.stopForm.value)
          .subscribe();
     
    }



    onChanges(): void 
    {
        const phoneControl = this.stopForm.get('phone'); 
    }
}