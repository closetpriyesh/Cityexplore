import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { City } from '../shared/city.model';

@Injectable()
export class CityService {

    private messageSource = new BehaviorSubject<string>('Noida');
    private messageNumber = new BehaviorSubject<number>(2);
    currentMessage = this.messageSource.asObservable();
    currentNumber = this.messageNumber.asObservable();

    constructor() {}

    changeMessage(message: City) {
        this.messageSource.next(message.name);
        this.messageNumber.next(message.id);
    }
}
