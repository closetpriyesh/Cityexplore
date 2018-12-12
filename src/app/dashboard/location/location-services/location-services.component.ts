import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../../services/data-transfer.service';
import { CityService } from '../../../services/city-data.service';

@Component({
    selector: 'app-location-service',
    templateUrl: './location-services.component.html',
    styleUrls: ['./location-services.component.css']
})

export class LocationServiceComponent implements OnInit {

    cityId: number;

    constructor(private dataTransfer: DataTransferService, private city: CityService ) {}

    ngOnInit() {
        this.city.currentNumber.subscribe(message => this.cityId = message);
    }


}
