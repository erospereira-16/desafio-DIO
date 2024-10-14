import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-master-header',
  templateUrl: './master-header.component.html'
})
export class MasterHeaderComponent implements OnInit {
  public currentUser: any;
  public loja: any;
  logo: any;
  constructor(  private authenticationService: AuthenticationService,
                private router: Router,
                private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    if (!this.currentUser) {
      this.logout();
    }

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['index']);
  }

  changePassword() {
    this.router.navigate(['/master-area-change-password']);
  }  
}
