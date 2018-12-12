import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { DataTransferService } from "../../../../services/data-transfer.service";
import { CityService } from "../../../../services/city-data.service";
import { transport } from "../../transport.apis";
import { Response } from "@angular/http";

@Component({
    selector:'app-homeimage-add-update',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../transport.css']
})


export class AddUpdateHomeImageComponent implements OnInit {

    homeimage_id;
    homeimageForm:FormGroup;
    formName;
    city;
    img;
    gg;
    img2;
    files;

    homeimage;
    page_count;
    lat;
    lon;
    file;
    file2;
    companies;
  
    city_id;
    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.route.params.subscribe((params:Params)=>
    {
        this.homeimage_id=params['id'];

    });

        this.initForm();
        this.getCity();
        this.homeimageForm.value.city = this.city;
        this.homeimageForm.value.city_id=this.city_id;

    

        this.homeimageForm = this.fb.group({
            image_url: ['', [Validators.required, Validators.minLength(3)]],   
          
        });


        
        this.onChanges();
//         if(this.homeimage_id)
//         {

//         let formName=transport.get_home_images;
 
//         this.dataTransfer.get(formName+this.city_id)
//   .subscribe(
//       (data: any[]) => {
//           this.homeimage= data, console.log(this.homeimage);              
//           this.page_count = (<any>data).page_count;
//           this.homeimage=this.homeimage.data;
//           this.homeimageForm.controls['name'].setValue(this.homeimage.name);
              
//         }); 

//         }
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


        getCity() 
        {
            
            this.data.currentMessage.subscribe(message => this.city = message);      
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void
     {
             this.homeimageForm= new FormGroup({
             image_url: new FormControl('', Validators.required),

          

        
        })
      }

    Reset()
    {
        this.homeimageForm.reset();
     
    }


      
    onSubmit() 
    {
        //this.homeimageForm.value.image_url=this.img;
        this.homeimageForm.value.image_url="abc.jpg";
        this.formName=transport.add_home_images;
        this.homeimageForm.value.city_id=this.city_id;
        console.log(this.homeimageForm.value);
        if(this.homeimage_id)
        this.homeimageForm.value.id=this.homeimage_id;

          this.dataTransfer.push(this.formName, this.homeimageForm.value)
          .subscribe();
     
    }



    onChanges(): void 
    {
        const phoneControl = this.homeimageForm.get('phone'); 
    }
}