import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './generic-http-service';
import { PaymentMethod } from '../_model/payment-method-model';

@Injectable({ providedIn: 'root' })

export class PaymentMethodService extends GenericHttpService<PaymentMethod> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getAllPaymentMethod() {
        return this.http.get<PaymentMethod[]>(`${this.getUrlApi()}PaymentMethod/getAll`);
    }
    }
