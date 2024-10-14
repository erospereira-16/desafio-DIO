import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './generic-http-service';
import { Plan } from '../_model/plan-model';

@Injectable({ providedIn: 'root' })

export class PlanService extends GenericHttpService<Plan> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getAllPlan() {
        return this.http.get<Plan[]>(`${this.getUrlApi()}Plan/getAll`);
    }
}
