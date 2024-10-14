import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UnitOfMeasurementService } from '../services/unit-of-measurement.service';
import { UnitOfMeasurement } from '../_model/unit-of-measurement-model';

@Component({
  selector: 'app-partner-area-unit-of-measurement',
  templateUrl: './partner-area-unit-of-measurement.component.html'
})

export class UnitOfMeasurementComponent implements OnInit {
  form: any;
  loading = false;
  submitted = false;
  public lst: any[] = [];
  unitOfMeasurement: any;
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
    private unitOfMeasurementService: UnitOfMeasurementService,
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
    const filter: UnitOfMeasurement = new UnitOfMeasurement();
    filter.description = this.form.controls.description.value;
    this.unitOfMeasurementService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-unit-of-measurement/0/0`]);
  }

  edit(obj: UnitOfMeasurement) {
    this.router.navigate([`/partner-area-unit-of-measurement/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: UnitOfMeasurement) {
    this.unitOfMeasurement = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.unitOfMeasurementService.deleteById(this.unitOfMeasurement).subscribe(() => {
      const index: number = this.lst.indexOf(this.unitOfMeasurement);
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
