import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './generic-http-service';
import { Composition } from '../_model/composition-model';

@Injectable({ providedIn: 'root' })

export class CompositionService extends GenericHttpService<Composition> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('Composition/filter', filter);
    }
   save(entity: any) {
    return this.post('Composition/save', entity);
}
getById(id: any) {
  return this.http.get<Composition>(`${this.getUrlApi()}Composition/${id}`);
}

  deleteById(entity: any) {
          return this.post('Composition/delete', entity);
    }
}
