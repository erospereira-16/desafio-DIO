import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CompositionService } from '../services/composition.service';
import { Composition } from '../_model/composition-model';

@Component({
  selector: 'app-partner-area-composition',
  templateUrl: './partner-area-composition.component.html'
})

export class CompositionComponent implements OnInit {
  form: any;
  loading = false;
  submitted = false;
  public lst: any[] = [];
  composition: any;
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
    private compositionService: CompositionService,
    private router: Router) {
  }

  ngOnInit() {
    const description = new FormControl('');

    this.form = new FormGroup({
      description: description,
    });
    // this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: Composition = new Composition();
    filter.description = this.form.controls.description.value;
    this.compositionService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-composition/0/0`]);
  }

  edit(obj: Composition) {
    this.router.navigate([`/partner-area-composition/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: Composition) {
    this.composition = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.composition.deleteById(this.composition).subscribe(() => {
      const index: number = this.lst.indexOf(this.composition);
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
