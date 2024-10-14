import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './generic-http-service';
import { Input } from '../_model/input-model';

@Injectable({ providedIn: 'root' })

export class InputService extends GenericHttpService<Input> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('Input/filter', filter);
    }
   save(entity: any) {
    return this.post('Input/save', entity);
}
getById(id: any) {
  return this.http.get<Input>(`${this.getUrlApi()}Input/${id}`);
}

  deleteById(entity: any) {
          return this.post('Input/delete', entity);
    }
}
