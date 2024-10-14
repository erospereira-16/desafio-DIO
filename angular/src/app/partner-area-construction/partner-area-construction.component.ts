import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConstructionService } from '../services/contruction.service';
import { Construction } from '../_model/construction-model';

@Component({
  selector: 'app-partner-area-construction',
  templateUrl: './partner-area-construction.component.html'
})

export class ConstructionComponent implements OnInit {
  form: any;
  loading = false;
  submitted = false;
  public lst: any[] = [];
  construction: any;
  public modalRef: BsModalRef = new BsModalRef();
  public modalDelete: BsModalRef = new BsModalRef();
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private authenticationService: AuthenticationService,
    private constructionService: ConstructionService,
    private router: Router) {
  }

  ngOnInit() {
    const description = new FormControl('');

    this.form = new FormGroup({
      description: description,
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: Construction = new Construction();
    filter.description = this.form.controls.description.value;
    this.constructionService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-construction/0/0`]);
  }

  edit(obj: Construction) {
    this.router.navigate([`/partner-area-construction/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: Construction) {
    this.construction = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.constructionService.deleteById(this.construction).subscribe(() => {
      const index: number = this.lst.indexOf(this.construction);
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
}
