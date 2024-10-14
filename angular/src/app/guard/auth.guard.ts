import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
// import jwt_decode from "jwt-decode";
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getCurrentUser();
        const expectedRole = route.data['expectedRole'];
        let found = false;

        if (!currentUser) {
           return this.accessDenied();
        }
        if (state.url === '/' || state.url === '/access-denied') {
            return true;
        }

        if (expectedRole.length === 0) {
            return this.accessDenied();
        }
        // const decoded = jwt_decode(currentUser.token);
        // if (decoded) {
        //     let value2: any = decoded;
        //     currentUser.role = value2.role;
        // }
        if (currentUser.role instanceof Array) {
            expectedRole.forEach((e: string) => {
                if (currentUser.role.find((r: string) => r === e) != null) {
                    found = true;
                    return;
                }
            });
        } else {
            if (expectedRole.find((r: any) => r === currentUser.role) != null) {
                found = true;
            }
        }


        if (!found) {
            return this.accessDenied();
        }

        return found;
    }

    accessDenied() {
        this.authenticationService.clearUser();
        this.router.navigate(['index']);
        this.toastr.error('Acesso negado!');
        return false;
    }
}
