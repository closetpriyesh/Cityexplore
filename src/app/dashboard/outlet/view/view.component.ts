import { Component, OnInit, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
import { DataTransferService } from '../../../services/data-transfer.service';
import { CityService } from '../../../services/city-data.service';
import { outletlist } from '../outlet.apis';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Approve } from '../../../shared/action.model';

@Component({
    selector: 'app-view-outlet',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})

export class ViewOutletComponent implements OnInit {

    cityId;
    outlets = [];
    page_count: number;
    current_page = 1;
    formName = outletlist.getOutletListByCityId;
    data;

    constructor(private dataTransfer: DataTransferService, private city: CityService, private route: Router) {
        console.log('Constructor');
    }

    ngOnInit() {
        console.log('OnInit');
        this.city.currentNumber.subscribe(message => this.cityId = message);
        console.log(this.formName);
        this.dataTransfer.get(this.formName + this.cityId.toString())
            .subscribe(
                (data: any[]) => {
                    console.log(data);
                    this.outlets = data;
                    this.page_count = (<any>data).page_count;
                    console.log(this.page_count);
                }
            );
    }

    getOutletByCityId( page: number) {
        this.current_page = page;
        this.dataTransfer.get(this.formName + this.cityId.toString() + '&page=' + page )
            .subscribe(
                (data: any[]) => {
                    this.outlets = data;
                    this.page_count = (<any>data).page_count;
                }
            );
    }

    edit(num: number) {

    }

    /*delete(num: number) {
        this.dataTransfer.del(fire.deleteFireStation, num)
            .subscribe();

        this.ngOnInit();
    }

    app(num: number) {
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(fire.moderateFireStation, this.data)
            .subscribe();

        this.ngOnInit();
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(fire.moderateFireStation, this.data)
            .subscribe();

        this.ngOnInit();
    }*/

}
