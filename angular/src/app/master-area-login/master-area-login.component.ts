import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoginUser } from '../_model/login-user-model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-master-area-login',
    templateUrl: './master-area-login.component.html',
})

export class MasterAreaLoginComponent implements OnInit {
    form: any;
    formCode: any;
    public submitted = false;
    public submittedEmail = false;
    public loginUser: LoginUser = new LoginUser();
    public currentUser: any;
    hascode = false;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService,
        private renderer: Renderer2) {
    }

    ngOnInit() {
        this.currentUser = this.authenticationService.getCurrentUser();
        if (this.currentUser) {
            if (this.currentUser.role == "Master") {
                this.router.navigate(['master-area']);
            }
        } 

        const number1 = new FormControl('', Validators.compose([
          Validators.required,
        ]));
        const number2 = new FormControl('', Validators.compose([
          Validators.required,
        ]));
        const number3 = new FormControl('', Validators.compose([
          Validators.required,
        ]));
        const number4 = new FormControl('', Validators.compose([
          Validators.required,
        ]));

              
          const email = new FormControl('', Validators.compose([
            Validators.required,
          ]));
      
          this.form = new FormGroup({
            email: email,
          });
          this.formCode = new FormGroup({
            number1: number1,
            number2: number2,
            number3: number3,
            number4: number4,
          });
    }

    get f() { return this.form.controls; }
    get fc() { return this.formCode.controls; }


    onReceiveCode(){
      this.submitted = true;
      if (this.form.invalid) {
          return;
      }
      this.loginUser.email = this.form.controls.email.value;
      this.authenticationService.createCode(this.loginUser)
      .subscribe((result) => {
          this.authenticationService.clearUser();
          this.authenticationService.addCurrenUser(this.loginUser);
          this.toastr.success(result)
          this.hascode = true;
      });

    }   
    goCode() {
      this.hascode = true;
  } 

  loginByCode() {
    let loginUserCode = new LoginUser();
    loginUserCode.email = this.authenticationService.getCurrentUser().email;
    loginUserCode.code = this.formCode.controls.number1.value + 
    this.formCode.controls.number2.value +
    this.formCode.controls.number3.value +
    this.formCode.controls.number4.value
    this.authenticationService.loginByCodeMaster(loginUserCode)
    .subscribe(result => {
        this.authenticationService.clearUser();
        this.authenticationService.addCurrenUser(result);
        this.toastr.success('Login efetuado com sucesso!');
        return this.router.navigate(['/master-area']);
    });
}

onKeyUp(x: any) {
  if (x.key === "0" ||
  x.key === "1" ||
  x.key === "2" ||
  x.key === "3" ||
  x.key === "4" ||
  x.key === "5" ||
  x.key === "6" ||
  x.key === "7" ||
  x.key === "8" ||
  x.key === "9") {
    switch (x.currentTarget.id) {
      case "number1":
          this.renderer.selectRootElement('#number2').focus();
        break;
      case "number2":
          this.renderer.selectRootElement('#number3').focus();
        break;
      case "number3":
          this.renderer.selectRootElement('#number4').focus();
        break;
      case "number4":
        this.loginByCode();
        break;
    }
  }

}

}

