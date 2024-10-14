import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './generic-http-service';
import { Construction } from '../_model/construction-model';

@Injectable({ providedIn: 'root' })

export class ConstructionService extends GenericHttpService<Construction> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('Construction/filter', filter);
    }
   save(entity: any) {
    return this.post('Construction/save', entity);
}
getById(id: any) {
  return this.http.get<Construction>(`${this.getUrlApi()}Construction/${id}`);
}

  deleteById(entity: any) {
          return this.post('Construction/delete', entity);
    }
}
