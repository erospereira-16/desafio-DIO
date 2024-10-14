import { Coupon } from '../_model/coupon-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './generic-http-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class CouponService extends GenericHttpService<Coupon> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('coupon/filter', filter);
      }

      getByCode(filter: any) {
        return this.post('coupon/getByCode', filter);
      }

    getById(id: any) {
        return this.http.get<Coupon>(`${this.getUrlApi()}coupon/${id}`);
    }

    deleteById(entity: any) {
      return this.post('coupon/delete', entity);
  }

  active(entity: any) {
    return this.post('coupon/active', entity);
 }

 save(entity: any) {
    return this.post('coupon/save', entity);
 }

 getActive() {
  return this.http.get<any>(`${this.getUrlApi()}coupon/getActive`);
}

}
