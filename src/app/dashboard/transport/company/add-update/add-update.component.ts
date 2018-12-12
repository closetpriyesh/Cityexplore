import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";
import { Response } from "@angular/http";

@Component({
    selector:'app-company-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../transport.css']
})


export class AddUpdateCompanyComponent implements OnInit {

    
    company_id;
    companyForm:FormGroup;
    formName;
    city;
    img;
    gg;
    img2;
    files;

    services = [
        { "id": 1, "itemName": "Bus" },
        { "id": 2, "itemName": "Cab" },
    ];
    operational_cities = [
        { "id": 1, "itemName": "Noida" },
        { "id": 2, "itemName": "Delhi" },
    ];
flag=0;
    company;
    page_count;
    lat;
    lon;
    file;
    file2;
    selectedItems
    companies;
    seating_type=["AC","NON-AC"];
    city_id;

    types=["Bus","Cab"];


    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        

        this.route.params.subscribe((params:Params)=>
    {
        this.company_id=params['id'];

    });
   
   

    this.companyForm= new FormGroup({
        name: new FormControl('', Validators.required),
        contact:new FormControl('',Validators.required),
        city_name:new FormControl('',Validators.required),
        logo:new FormControl('',Validators.required),
        image_list:new FormControl('',Validators.required),
        operational_cities:new FormControl('',Validators.required),
        headquarters:new FormControl('',Validators.required),
        website:new FormControl('',Validators.required),
        state:new FormControl('',Validators.required),
        address:new FormControl('',Validators.required),
        lat:new FormControl('',Validators.required),
        lon:new FormControl('',Validators.required),
        services:new FormControl('',Validators.required)
    
      

    
    })

        this.getCity();
        this.companyForm.value.city = this.city;
        this.companyForm.value.city_id=this.city_id;

    

        this.companyForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],

            contact:['',[Validators.required]],
            logo:['',[Validators.required]],
            image_list:['',[Validators.required]],
            headquarters: ['', [Validators.required, Validators.minLength(3)]],
        
            website:['',[Validators.required]],
            operational_cities:['',[Validators.required]],
            city_name: [this.city, [Validators.required, Validators.minLength(3)]],
            state:['',[Validators.required]],
            address:['',[Validators.required]],
            lat:['',[Validators.required]],
            lon:['',[Validators.required]],
            services:['',[Validators.required]]
          
        });


        
        this.onChanges();
        if(this.company_id)
        {

        let formName=transport.get_company_by_id;
 
        this.dataTransfer.get(formName+this.company_id)
  .subscribe(
      (data: any[]) => {
          this.company= data, console.log(this.company);              
          this.page_count = (<any>data).page_count;
          this.company=this.company.data;
          this.companyForm.controls['name'].setValue(this.company.name);
          this.companyForm.controls['contact'].setValue(this.company.contact);
          this.companyForm.controls['headquarters'].setValue(this.company.headquarters);
          this.companyForm.controls['website'].setValue(this.company.website);   
         // this.companyForm.controls['operational_cities'].setValue(this.company.operational_cities); 
          this.companyForm.controls['city_name'].setValue(this.company.city_name);
          this.companyForm.controls['state'].setValue(this.company.state);
          this.companyForm.controls['address'].setValue(this.company.address);
          this.companyForm.controls['lat'].setValue(this.company.lat);
          this.companyForm.controls['lon'].setValue(this.company.lon);
            let services=this.company.services.split(',');
            let tempservices=[];
            let j=1
            for(let key of services)
            {
                tempservices.push({"id":j,"itemName":key});
            }

          this.companyForm.controls['services'].setValue(tempservices);
          let operational_cities=this.company.operational_cities.split(',');
          let tempcities=[];
           j=1;
          for(let key of operational_cities)
          {
              tempcities.push({"id":j,"itemName":key});
          }

        this.companyForm.controls['operational_cities'].setValue(tempcities);

        }); 

        }
    }

    Reset()
    {
        this.companyForm.reset();
     
    }

    getCity() {
            
        this.data.currentMessage.subscribe(message => this.city = message);
        this.data.currentNumber.subscribe(message => this.city_id = message);
    }

    getLatLong() {
        const str = this.companyForm.value.address  + this.companyForm.value.city_name;
 
        this.dataTransfer.getlatlng(str)
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.lat = data.lat;
                    this.lon = data.lng;
                }
            );
    }
      
    onSubmit() 
    {
        // this.FinalUpload(this.file);
        // this.FinalUpload1(this.file2);
        let operational_cities;
        operational_cities=this.companyForm.value.operational_cities;
        let final_operational_cities="";
        console.log(operational_cities);
        let len=operational_cities.length;
        let i=0;
        for(let key of operational_cities)
        {
        if(i<len-1)
        final_operational_cities+=key.itemName+',';
        else 
        final_operational_cities+=key.itemName;
      
            i++;
        }
        this.companyForm.value.operational_cities=final_operational_cities;
        this.companyForm.value.city=this.city_id;

        let services=this.companyForm.value.services;
        console.log(services);
        let final_services="";
        i=0;
        len=services.length;
        for(let key of services)
        {
        if(i<len-1)
        final_services+=key.itemName+',';
        else
        final_services+=key.itemName;
        i++;
        }
        this.companyForm.value.logo="abc.jpg";
        this.companyForm.value.image_list="def.jpg";
        this.companyForm.value.services=final_services;    
        this.formName=transport.addCompany;
        if(this.company_id)
        this.companyForm.value.id=this.company_id;
        console.log(this.companyForm.value);
        this.dataTransfer.push(this.formName, this.companyForm.value)
        .subscribe();
      
        
    }

    finalSubmit()
    {
        let operational_cities;
        operational_cities=this.companyForm.value.operational_cities;
        let final_operational_cities="";
        console.log(operational_cities);
        let len=operational_cities.length;
        let i=0;
        for(let key of operational_cities)
        {
        if(i<len-1)
        final_operational_cities+=key.itemName+',';
        else 
        final_operational_cities+=key.itemName;
      
            i++;
        }
        this.companyForm.value.operational_cities=final_operational_cities;
        this.companyForm.value.city=this.city_id;

        let services=this.companyForm.value.services;
        console.log(services);
        let final_services="";
        i=0;
        len=services.length;
        for(let key of services)
        {
        if(i<len-1)
        final_services+=key.itemName+',';
        else
        final_services+=key.itemName;
        i++;
        }
        this.companyForm.value.logo=this.img;
        this.companyForm.value.image_list=this.img2;
        this.companyForm.value.services=final_services;    
        this.formName=transport.addCompany;
        console.log(this.companyForm.value);
        this.dataTransfer.push(this.formName, this.companyForm.value)
        .subscribe();
     
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

    mapItems(items) {
        let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);

        return selectedItems.length ? selectedItems : null;
      }
    


    fileEvent1(fileInput: any) {
        this.files = (<any>event).target.files;
        const file = this.files[0];
        this.file2 = file;
    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }


    onChanges(): void 
    {
        const phoneControl = this.companyForm.get('phone'); 
    }
}