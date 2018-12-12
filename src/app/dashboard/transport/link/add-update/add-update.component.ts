import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";

@Component({
    selector:'app-link-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../transport.css']
})


export class AddUpdateLinkComponent implements OnInit {

    link_id;
    linkForm:FormGroup;
    formName;
    city;
    link;
    page_count;
    companies;
    seating_type=["AC","NON-AC"];
    city_id;
    approved_stops;
    types=["Bus","Cab"];
    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.route.params.subscribe((params:Params)=>
    {
        this.link_id=params['id'];

    });

        this.initForm();
        this.getCity();
        this.linkForm.value.city = this.city;
        this.linkForm.value.city_id=this.city_id;

            this.linkForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            source:['',[Validators.required]],
            destination:['',[Validators.required]],
            distance:['',[Validators.required]],
            description:['',Validators.required],
        });

        this.formName=transport.get_approved_stops;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.approved_stops= data;             
                this.page_count = (<any>data).page_count;
                this.approved_stops=this.approved_stops.data;
                if(this.link_id)
                {
        
                let formName=transport.get_link_by_id;
         
                this.dataTransfer.get(formName+this.link_id)
          .subscribe(
              (data: any[]) => {
                  this.link= data, console.log(this.link);              
                  this.page_count = (<any>data).page_count;
                  this.link=this.link.data;
                  this.linkForm.controls['name'].setValue(this.link.name);
                  this.linkForm.controls['source'].setValue(this.link.source);
                  this.linkForm.controls['destination'].setValue(this.link.destination);
                  this.linkForm.controls['distance'].setValue(this.link.distance);   
                  this.linkForm.controls['description'].setValue(this.link.description);        
                }); 
        
                }

            });

        this.onChanges();

    }


        getCity() 
        {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void
     {
             this.linkForm= new FormGroup({
            name: new FormControl('', Validators.required),
            source:new FormControl('',Validators.required),
            destination:new FormControl('',Validators.required),
            distance:new FormControl('',Validators.required),
            description:new FormControl('',Validators.required)
        })
      }

    Reset()
    {
        this.linkForm.reset();
     
    }

    onSubmit() 
    {
        this.formName=transport.addLink;
        console.log(this.linkForm.value);
        if(this.link_id)
        this.linkForm.value.id=this.link_id;
          this.dataTransfer.push(this.formName, this.linkForm.value)
          .subscribe();
     
    }


    onChanges(): void 
    {
        const phoneControl = this.linkForm.get('phone'); 
    }
}