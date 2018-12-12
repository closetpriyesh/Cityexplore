import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTransferService } from '../../../services/data-transfer.service';
import { Response } from '@angular/http';

@Component({
    selector: 'app-add-location',
    templateUrl: './addLocation.component.html',
    styleUrls: ['./addLocation.component.css']
})

export class AddLocationComponent {

    latitude: '';
    longitude: '';
    file;
    image = '';
    @ViewChild('f') locationForm: NgForm;

    constructor(private dataTransfer: DataTransferService) {}

    onSubmit() {
        console.log(this.locationForm);
        console.log(this.locationForm.value);
        this.dataTransfer.uploadFile(this.file.name, this.file.type)
            .subscribe(
                (response: Response) => {
                    console.log(response.json()),
                    this.dataTransfer.upload(this.file, response.json().data, response.json().url)
                        .then(
                            (data) => {console.log(data); },
                            (error) => console.log(error)
                        );
                });
    }

    fileEvent(fileInput: any) {
        console.log(fileInput);
        console.log(event);
        this.file = (<any>event.target).files[0];
        console.log(this.file);
        console.log(this.locationForm.value.image_url);
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.image = event.target.result;
        };

        reader.readAsDataURL((<any>event.target).files[0]);
    }

    getGeoCordinatesFromAddress() {
        const str = this.locationForm.value.city + ' ' + this.locationForm.value.state + ' ' + this.locationForm.value.country;
        console.log(str);
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
