import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericHttpService } from './generic-http-service';
import { User } from '../_model/user-model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends GenericHttpService<any>{
    protected baseUrl = `${environment.urlApi}`;
    protected baseSite = `${environment.urlApi}`;

    constructor(private http: HttpClient) {
        super(http);
    }

    logout() {
        localStorage.removeItem('building_user');
    }

    addCurrenUser(user: any) {
        localStorage.setItem('building_user', JSON.stringify(user));
    }

    clearUser() {
        localStorage.removeItem('building_user');
    }

    getCurrentUser() {
        return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('building_user') || '{}')).getValue();
    }

    loginByCodeMaster(user: any) {
        return this.postAll('user/loginByCodeMaster', user);
    }

    loginByCodePartner(user: any) {
        return this.postAll('user/loginByCodePartner', user);
    }

    createCode(user: any) {
        return this.post('user/createCode', user);
    }

    save(user: any) {
        return this.post('user/save', user);
    }

    getModules() {
        return this.http.get<any>(`${this.getUrlApi()}account/getModules`);
    }

    deleteById(entity: any) {
        return this.post('user/delete', entity);
    }

    active(entity: any) {
        return this.post('user/active', entity);
     }

     getById(id: any) {
        return this.http.get<User>(`${this.getUrlApi()}user/${id}`);
    }

    getByFilter(filter: any) {
        return this.postAll('user/filter', filter);
      }
    
}
