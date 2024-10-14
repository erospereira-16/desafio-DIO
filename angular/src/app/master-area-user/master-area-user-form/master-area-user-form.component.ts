import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_model/user-model';
import { RolesService } from 'src/app/services/roles.service';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Establishment } from 'src/app/_model/establishment-model';

@Component({
  selector: 'app-master-area-user-form',
  templateUrl: './master-area-user-form.component.html'
})

export class MasterAreaUserFormComponent implements OnInit {
  public currentUser: any;
  form: any;
  public files: any = [];
  public fileToUpload: any;
  roles: any[] = [];
  establishments: Establishment[] = [];
  logo: any;
  public submitted = false;
  public user: User = new User();

  constructor(private toastr: ToastrService,
    private router: Router,
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private establishmentService: EstablishmentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['isEdit'] == '1') {
        this.user.id = Number(params['id']);
      }
    });

      const userName = new FormControl('', Validators.compose([
        Validators.required,
      ]));
      const email = new FormControl('', Validators.compose([
        Validators.required,
      ]));  
      const phone = new FormControl('');
      const role = new FormControl('', Validators.compose([
        Validators.required,
      ]));
      const establishment = new FormControl('', Validators.compose([
        Validators.required,
      ]));
  
      this.form = new FormGroup({
        userName: userName,
        email: email,
        role: role,
        establishment: establishment,
        phone: phone
      });
      this.roles = this.rolesService.get();
      let filter = new Establishment();
      this.establishmentService.getByFilter(filter).subscribe(result => {
        this.establishments = result;
      });
  }

  loadForm() {
    if (this.user.id) {
      this.authenticationService.getById(this.user.id)
      .subscribe(result => {
        if (result !== undefined) {
          this.user = result;
          this.loadObject(result);
        }
      });
    }
  }


  get f() { return this.form.controls; }

  loadObject(item: User) {
    this.user = item;
    this.form.controls.userName.setValue(item.userName);
    this.form.controls.email.setValue(item.email);
    this.form.controls.role.setValue(item.role);
    this.form.controls.phone.setValue(item.phone);
  }


  onCancel() {
    return this.router.navigate([`/master-area-user`]);
  }

  onSave() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
 
  this.user.userName = this.form.controls.userName.value;
  this.user.email = this.form.controls.email.value;
  this.user.role = this.form.controls.role.value;
  this.user.establishmentId = Number(this.form.controls.establishment.value);
  this.user.phone = (this.form.controls.phone.value);

   this.authenticationService.save(this.user).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      return this.router.navigate(['master-area-user']);
    });
  }
}

