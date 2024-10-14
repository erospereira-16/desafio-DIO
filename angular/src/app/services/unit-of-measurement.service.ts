import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './generic-http-service';
import { UnitOfMeasurement } from '../_model/unit-of-measurement-model';

@Injectable({ providedIn: 'root' })

export class UnitOfMeasurementService extends GenericHttpService<UnitOfMeasurement> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('UnitOfMeasurement/filter', filter);
    }
   save(entity: any) {
    return this.post('UnitOfMeasurement/save', entity);
}
getById(id: any) {
  return this.http.get<UnitOfMeasurement>(`${this.getUrlApi()}UnitOfMeasurement/${id}`);
}

  deleteById(entity: any) {
          return this.post('UnitOfMeasurement/delete', entity);
    }
}
