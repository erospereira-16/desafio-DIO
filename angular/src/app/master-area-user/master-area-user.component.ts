import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EstablishmentService } from '../services/establishment.service';
import { ToastrService } from 'ngx-toastr';
import { Establishment } from '../_model/establishment-model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../_model/user-model';

@Component({
  selector: 'app-master-area-user',
  templateUrl: './master-area-user.component.html'
})

export class MasterAreaUserComponent implements OnInit {
  loading = false;
  submitted = false;
  public user: any;
  public modalRef: BsModalRef = new BsModalRef();
  public modalDelete: BsModalRef = new BsModalRef();
  public lst : User[] = [];
  @Output() action = new EventEmitter();
  page = 1;
  form: any;
  pageSize = 5;
  public currentUser: any;
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private establishmentService: EstablishmentService
  ) {
  }

  ngOnInit() {
    if (this.authenticationService.getCurrentUser()) {
      this.authenticationService.getCurrentUser().role === 'Master' ? this.currentUser = this.authenticationService.getCurrentUser() : null;
  }

  const search = new FormControl('', Validators.compose([
    Validators.required,
  ]));

  this.form = new FormGroup({
    search: search,
  });

  this.onSubmit();
  }

  onSubmit() {
    const filter: User = new User();
    if (this.form.controls.search.value) {
      filter.email = this.form.controls.search.value;
    }
    
    this.authenticationService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }


onNew() {
  this.router.navigate([`/master-area-user/0/0`]);
}
onReset() {
  this.form.controls.search.reset();
}

edit(obj: Establishment) {
  this.router.navigate([`/master-area-user/${obj.id}/1`]);
}

deleteById(template: TemplateRef<any>, item: User) {
  this.user = item;
  this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
}

confirmDelete() {
  this.authenticationService.deleteById(this.user).subscribe(() => {
    const index: number = this.lst.indexOf(this.user);
    if (index !== -1) {
      this.lst.splice(index, 1);
    }
    this.closeDelete();
    this.toastr.success('Excluído com sucesso!', '');
  });
}

closeDelete() {
this.modalDelete.hide();
}

 onActive(item: any) {
  this.authenticationService.active(item).subscribe(result => {
    this.onSubmit();
  });
}
 
}
