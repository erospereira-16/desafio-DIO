import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InputService } from '../services/input.service';
import { Input } from '../_model/input-model';

@Component({
  selector: 'app-partner-area-input',
  templateUrl: './partner-area-input.component.html'
})

export class InputComponent implements OnInit {
  form: any;
  loading = false;
  submitted = false;
  public lst: any[] = [];
  input: any;
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
    private inputService: InputService,
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
    const filter: Input = new Input();
    filter.description = this.form.controls.description.value;
    this.inputService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-input/0/0`]);
  }

  edit(obj: Input) {
    this.router.navigate([`/partner-area-input/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: Input) {
    this.input = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.input.deleteById(this.input).subscribe(() => {
      const index: number = this.lst.indexOf(this.input);
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
