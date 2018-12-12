import { Component, OnInit, OnChanges, SimpleChanges, Input } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { switchMap } from 'rxjs/operators';
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";
import { transport } from "../../../transport.apis";

@Component({
    selector:'on-changes',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../../transport.css']
})


export class AddUpdateVehicleConfigurationComponent implements OnInit {

  
    vehicle_id;
    vehicleConfigurationForm:FormGroup;
    formName;
    city;
    vehicleConfiguration;
    page_count;
    city_id;
    routes;
    actual;
    power: string;
    wait_nodes;
    source_destination;
    just_for_need_arr_2;
    flag=0;
     counter=0;
    formcontrol=0;
    map=new Object();
    permit=1;
    map1=new Object();
    number_links=0;
    days=["asdf","asdfsdaf","asdf","asfd"];
    map2=new Object();
    another_new_config;

  

    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder,private router:Router) {}
   
    ngOnInit():void {

        this.route.params.subscribe((params:Params)=>
    {
        this.vehicle_id=params['id'];

    });


        this.vehicleConfigurationForm= new FormGroup({
            routes: new FormControl('', Validators.required),
            times:new FormControl('',Validators.required),
            start_time:new FormControl('',Validators.required),
            wait_time:new FormControl('',Validators.required),
         
           
           
            
        })
        this.getCity();
        this.vehicleConfigurationForm.value.city = this.city;
        this.vehicleConfigurationForm.value.city_id=this.city_id;
 
        this.formName=transport.get_approved_routes;
        this.dataTransfer.get(this.formName)
        .subscribe(
            (data: any[]) => {
                this.routes = data;  
                this.page_count = (<any>data).page_count;
                this.routes=this.routes.data;
                console.log(this.routes);
                for(let key of this.routes)
                {
                    this.map[key.name]=key.links.length;
                    this.map1[key.name]=key.id;
                    this.map2[key.name]=key.links;
                    console.log(key.links[0].name);

                }
                if(this.vehicle_id)
                this.checkDirect();
                
            
            }
        );

    
        
        this.vehicleConfigurationForm = this.fb.group({
            routes: ['', [Validators.required, Validators.minLength(3)]],
            times: this.fb.array([]),
            start_time:['',[Validators.required]],
            wait_time:this.fb.array([]), 
        });
        
        
        this.onChanges();
      


        
    }

    checkDirect()
    {
        
        let formName=transport.get_config_by_id;
        let newVehicleConfiguration;
 
        this.dataTransfer.get(formName+this.vehicle_id)
  .subscribe(
      (data: any[]) => {
          newVehicleConfiguration= data, console.log(newVehicleConfiguration);              
          this.page_count = (<any>data).page_count;
          newVehicleConfiguration=newVehicleConfiguration.data;
          this.another_new_config=newVehicleConfiguration;
           this.vehicleConfigurationForm.controls['routes'].setValue(newVehicleConfiguration.route_name);
          this.vehicleConfigurationForm.controls['start_time'].setValue(newVehicleConfiguration.start_time);
          this.calc(newVehicleConfiguration.route_name);
        //   this.vehicleConfigurationForm.controls['seating'].setValue(newVehicleConfiguration.name);
        //   this.vehicleConfigurationForm.controls['type'].setValue(newVehicleConfiguration.phone);   
        //   this.vehicleConfigurationForm.controls['company'].setValue(newVehicleConfiguration.phone);        
       }); 

    }

        getCity() 
        {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }


       
        


    Reset()
    {
        this.vehicleConfigurationForm.reset();
     
    }

    onSubmit() 
    {
        this.actual={};
        let start_time=this.vehicleConfigurationForm.value.start_time;
        start_time=start_time.split(',');
        let new_length=start_time.length;
        console.log(start_time);
        let final_start_time="";
        let i=0;
        for(let key of start_time)
        {
            
            if(i<new_length-1)
            final_start_time+=key+',';
            else 
            final_start_time+=key;

            i++;
        } 

        this.actual.start_time=final_start_time;
        
        let times;
        times=this.vehicleConfigurationForm.value.times;
        let final_times="";
        let len=times.length;
         i=0;
        for(let key of times)
        {
        if(i<len-1)
        final_times+=key+',';
        else 
        final_times+=key;
      
            i++;
        }
        this.actual.times=final_times;
        i=0;
        let wait_times=this.vehicleConfigurationForm.value.wait_time;
        let final_wait_times="";
        len=wait_times.length;
        for(let key of wait_times)
        {
        if(i<len-1)
        final_wait_times+=key+',';
        else 
        final_wait_times+=key;
      
            i++;
        }

        this.actual.wait_time=final_wait_times;
        this.actual.registered_route=this.map1[this.vehicleConfigurationForm.value.routes];
        this.actual.vehicle_id=this.vehicle_id;

        this.formName=transport.configVehicle;
        if(this.vehicle_id)
        this.actual.id=this.vehicle_id;
        console.log(this.actual);
          this.dataTransfer.push(this.formName,this.actual)
          .subscribe();
     
    }

    
    onChanges():
    
    void 
    {
        const phoneControl = this.vehicleConfigurationForm.get('phone'); 
        let links=this.vehicleConfigurationForm.value.routes; 
        console.log(links); 
        this.number_links=links.length;
        console.log(this.routes);
        console.log(this.number_links);
    }

    setTimeControl()
    {

       
        let index=0;
        let times=this.another_new_config.times.split(',');
        for(let key of times)
        {
        (<FormArray>this.vehicleConfigurationForm.controls['times']).at(index).patchValue(key);
        index++;
        }
        let wait_time=this.another_new_config.wait_time.split(',');
        index=0;
        console.log("Ramarama");
        console.log(wait_time);
        index=0;
        
        for(let key of wait_time)
        (<FormArray>this.vehicleConfigurationForm.controls['wait_time']).at(index++).patchValue(key);
          
      
    }

     calc(routes:string)
    {
        if(routes)
        {
        const arrayControl = <FormArray>this.vehicleConfigurationForm.controls['times'];
        this.number_links=this.map[routes];
        if(this.number_links<0)
        this.number_links=0;
        if(this.number_links>=1)
        this.wait_nodes=this.number_links-1;
        else
        this.wait_nodes=0;
        console.log(this.number_links);
        this.source_destination = this.map2[routes];
        this.just_for_need_arr_2=[];
        for(let key of this.source_destination)
        this.just_for_need_arr_2.push(key.destination);
        this.just_for_need_arr_2.pop();


       
        this.vehicleConfigurationForm.setControl('times', this.fb.array([]));
        const control = <FormArray>this.vehicleConfigurationForm.controls['times'];
        for(var i=0;i<this.number_links;i++)
        control.push(new FormControl());
        
        const arrayControl1 = <FormArray>this.vehicleConfigurationForm.controls['wait_time'];
        this.vehicleConfigurationForm.setControl('wait_time', this.fb.array([]));
        const control1 = <FormArray>this.vehicleConfigurationForm.controls['wait_time'];
        for(var i=0;i<this.wait_nodes;i++)
        control1.push(new FormControl());
        if(this.vehicle_id)
        this.setTimeControl();
        return 1;
        }
        else
        {
            this.number_links=0;
            this.wait_nodes=0;
            this.source_destination = new Array<number>(this.number_links);
            this.just_for_need_arr_2=new Array<number>(this.wait_nodes); 
           
            this.vehicleConfigurationForm.setControl('times', this.fb.array([]));
            const control = <FormArray>this.vehicleConfigurationForm.controls['times'];
            for(var i=0;i<this.number_links;i++)
            control.push(new FormControl());
            
            this.vehicleConfigurationForm.setControl('wait_time', this.fb.array([]));
            const control1 = <FormArray>this.vehicleConfigurationForm.controls['wait_time'];
            for(var i=0;i<this.wait_nodes;i++)
            control1.push(new FormControl());

        }
      
        
    }
}







