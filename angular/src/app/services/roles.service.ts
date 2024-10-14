import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RolesService {
private roles: any[] = [];
    constructor() {
        this.load();
    }

    load() {
        this.roles.push({name: 'Administrador'});
        this.roles.push({name: 'Orçamentista'});
      }

      get() {
          return this.roles;
      }

}
