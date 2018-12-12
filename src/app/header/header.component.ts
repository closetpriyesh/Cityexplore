import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CityService } from '../services/city-data.service';
import { City } from '../shared/city.model';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls : ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    cities: City[] = [
        new City('Noida', 2),
        new City('Anoopshehr', 1),
        new City('Lucknow', 4)
    ];

    c: any;

    toggle = '';

    city = ['Noida', 'Anoopshehr', 'Lucknow'];

    default = 'Select a City';

    constructor(private data: CityService, private trans: DataTransferService) {}

    ngOnInit() {
        this.trans.get('http://prod-search.cityexploro.com/search/location/get_all_cities')
            .subscribe(
                (data: any) => {this.c = data.cities;
                    console.log(this.c); }
            );
    }

    citySelected(city) {
        console.log(city);
        console.log(city.name);
        console.log(city.id);
        this.default = city.name;
        this.data.changeMessage(city);
    }

    onToggle() {
        this.toggle = 'menuDisplayed';
        console.log(this.toggle);
    }

}
