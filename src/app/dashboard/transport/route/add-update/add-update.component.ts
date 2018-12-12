import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";

@Component({
    selector:'app-route-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../transport.css']
})


export class AddUpdateRouteComponent implements OnInit {

    index=1;
    route_id;
    routeForm:FormGroup;
    formName;
    city;
    route;
    sources=[];
    destinations=[];
    links = [];
    page_count;
    control;
    selectedItems;
    more_links_check=0;
    actual;
    companies;
    complete_links=[];
    another_temp_links;
    previous_value;
    counter=0;
    seating_type=["AC","NON-AC"];
    city_id;
    temp_length=0;
    types=["Bus","Cab"];
    map1=new Object();
    global_length;
    temp_links=[];
    map = new Object();
    constructor(private Route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.Route.params.subscribe((params:Params)=>
    {
        this.route_id=params['id'];

    });


    this.formName=transport.get_approved_links;
    this.dataTransfer.get(this.formName)
    .subscribe(
        (data: any[]) => {
            this.route= data;            
            this.page_count = (<any>data).page_count;
            this.route=this.route.data;
            console.log(this.route);
            for(let key of this.route)
            {
                this.map[key[0].name]=key[0].id;
                this.map1[key[0].name]=key[0].destination;
           
            }
          
          }); 
  



        this.initForm();
        this.getCity();
        this.routeForm.value.city = this.city;
        this.routeForm.value.city_id=this.city_id;

        this.routeForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            links:['',[Validators.required]],
            description:['',[Validators.required]],
            latest_links:this.fb.array([],),

        });

        this.onChanges();
        if(this.route_id)
        {
           
        let formName=transport.get_route_by_id;
        let newroute;
 
        this.dataTransfer.get(formName+this.route_id)
  .subscribe(
      (data: any[]) => {
          newroute= data, console.log(this.route);              
          this.page_count = (<any>data).page_count;
        
            newroute=newroute.data;
            this.routeForm.controls['name'].setValue(newroute.name);
            this.routeForm.controls['links'].setValue(newroute.links[0].name);
            this.routeForm.controls['description'].setValue(newroute.description);

            let temp_links=newroute.links;
            this.global_length=temp_links.length;
            
            let final_links=[];
            let j=0;
            let newcontrol=<FormArray>this.routeForm.controls['latest_links'];
            this.complete_links=[];
            let temp_prev_value;

            this.temp_links=[];
            this.another_temp_links=temp_links;


            //     this.controlChange(j-1);
            this.recurse(temp_links[0].name);

                  
          
           // (<FormArray>this.routeForm.controls['latest_links']).at(0).patchValue('agra-kanpur');
            console.log(this.routeForm.controls);
    
        //     let controlarray=new Array(j-1);
        //     temp_links.pop();
        //     j=0;
        //     for(let key of temp_links)
        //     {
        //         controlarray[j]=this.routeForm.value.latest_links[j];
        //         j++;
        //     }
        //     j=0;

        //    (<FormArray>this.routeForm.controls['latest_links']).setValue(controlarray);
             
            
        //     console.log("contro");
        //     console.log(controlarray);
    
          
            // for(let key of temp_links)
            // {
            //     if(j>0)
            //     {
            //      
            //     }
            //     j++;

            // }

          //  this.temp_links=final_links;
            // this.complete_links=[];
            // for(let key of final_links)
            // {
            //     this.complete_links.push([{"name":key}]);
            // }
            // console.log("asfd");
            // console.log(this.complete_links);
        //    this.routeForm.controls['latest_links'].setValue(final_links);
            

        
        }); 

        }
    }
3

        recurse(prev_value:string)
        {
            let temp_dict;
            
            if(this.index==this.global_length) return;
            
          
            
                    let formName=transport.get_approved_links_by_source;;
                    this.dataTransfer.get(formName+this.map1[prev_value]).
                    subscribe((data:any[])=>
                    {
                        temp_dict=data;
                        temp_dict=temp_dict.data;
                        this.complete_links.push(temp_dict);
                     
                        this.temp_links.push("kr");
                        this.counter=1;     
                        this.control= <FormArray>this.routeForm.controls['latest_links'];
                        this.control.push(new FormControl());
                   
                        (<FormArray>this.routeForm.controls['latest_links']).at(this.index-1).patchValue(this.another_temp_links[this.index].name);
                        this.index++;
                        
                        console.log("ramramakya");
                        this.recurse(this.another_temp_links[this.index-1].name);
                    })
                    
             }


        getCity() 
        {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void
     {
             this.routeForm= new FormGroup({
            name: new FormControl('', Validators.required),
            links:new FormControl('',Validators.required),
            description:new FormControl('',Validators.required),
            latest_links:new FormControl('',Validators.required),
         
        })
      }
    add()
    {
        let len=this.temp_links.length;
        let temp_dict;
        let j=1;
        
        if(len==0)
        {
            
            let formName=transport.get_approved_links_by_source;;
            this.dataTransfer.get(formName+this.map1[this.routeForm.value.links]).
            subscribe((data:any[])=>
            {
                temp_dict=data;
                temp_dict=temp_dict.data;
              //  console.log(temp_dict);
              
                if(temp_dict.length>0)
                {
                this.complete_links.push(temp_dict);
                this.temp_links.push("kr");
                this.counter=1;     
                this.control = <FormArray>this.routeForm.controls['latest_links'];
                this.control.push(new FormControl());
                this.more_links_check=0;
                }
                else
                {
                    this.more_links_check=1;
                }
               
            })
            this.previous_value="";

        }
        else
        {  let formName=transport.get_approved_links_by_source;
            let len=this.temp_links.length;
            let newcontrol=<FormArray>this.routeForm.controls['latest_links'];
         
            this.dataTransfer.get(formName+this.map1[newcontrol.at(len-1).value]).
            subscribe((data:any[])=>
            {
                temp_dict=data;
                temp_dict=temp_dict.data;
              //  console.log(temp_dict);
                
            console.log(this.complete_links);
            if(temp_dict.length>0)
            {
                this.complete_links.push(temp_dict);
            this.temp_links.push("kr");
            this.counter=1;     
            this.control = <FormArray>this.routeForm.controls['latest_links'];
            this.control.push(new FormControl());
            this.more_links_check=0;
            }
            else
            this.more_links_check=1;
          
            })



        }
       
    
    }

    previous_valueCheck()
    {
        this.control = <FormArray>this.routeForm.controls['latest_links'];
        this.temp_length=this.temp_links.length;
        if(this.temp_length>0)
        this.previous_value=this.control.at(this.temp_links.length-1).value;
        console.log(this.previous_value);

        if(this.temp_length>0&&!this.previous_value)
        return 0;
        else
        return 1;

    }

    remove()
    {
        this.temp_links.pop();
        this.complete_links.pop();
        if(this.temp_links.length==0)
        this.counter=0;
        this.control = <FormArray>this.routeForm.controls['latest_links'];
        let len=this.temp_links.length;
        this.more_links_check=0;
      //  console.log(this.control.at(len).value);
        if(len>=0)
        this.control.removeAt(len);
         
        if(len==0)
        this.previous_value="";
    }

    Reset()
    {
        this.routeForm.setControl('latest_links', this.fb.array([]));
        this.temp_links=[];
        this.previous_value="";
        this.complete_links=[];
        this.routeForm.reset();
     
    }

    onSubmit() 
    {

      

        this.actual={};
        let links=""; 
        let len=this.temp_links.length;
        
        links+=this.map[this.routeForm.value.links];
        if(len>0)
        links+=',';

        let newcontrol=<FormArray>this.routeForm.controls['latest_links'];
        let i=0;
        for(let key of this.temp_links)
        {
            if(i<len-1)
            links+=this.map[newcontrol.at(i).value]+',';
            else
            links+=this.map[newcontrol.at(i).value];

        i++;
        }
        console.log(links);

        this.actual.name=this.routeForm.value.name;
        this.actual.links=links;
        this.actual.description=this.routeForm.value.description;
        if(this.route_id)
        this.actual.id=this.route_id;

        this.formName=transport.add_route;
        console.log(this.actual);
          this.dataTransfer.push(this.formName,this.actual)
          .subscribe();
        
    }

    check(value:string)
    {
        
      this.complete_links=[];
        this.routeForm.setControl('latest_links', this.fb.array([]));
        this.temp_links=[];
        this.counter=0;
        this.more_links_check=0;

        
    }

    controlChange(i:number)
    {
        
        i++;
        let len=this.temp_links.length;

        if(len>i)
        {
        let controlarray=new Array(len-i);

        for(let key of controlarray)
        {
            this.temp_links.pop();
            this.complete_links.pop();
        }
        len=this.temp_links.length;
        controlarray=new Array(len);
        console.log(this.routeForm.value.latest_links);
        let j=0;
        for(let key of this.temp_links)
        {
            controlarray[j]=this.routeForm.value.latest_links[j];
            j++;
        }
        
        console.log(controlarray);

        this.routeForm.setControl('latest_links', this.fb.array(controlarray));
        }
    
        
    }

    onChanges(): void 
    {
        const phoneControl = this.routeForm.get('phone'); 
    }

    onItemSelect(item: any) {
        console.log(item);
      //  console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        // console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }

}