import { CouponService } from '../services/coupon.service';
import { Coupon } from '../_model/coupon-model';
import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-master-area-coupon',
  templateUrl: './master-area-coupon.component.html'
})

export class MasterAreaCouponComponent implements OnInit {
  public modalRef: BsModalRef = new BsModalRef();
  public modalDelete: BsModalRef = new BsModalRef();
  form: any;
  loading = false;
  submitted = false;
  public lst: any[] = [];
  coupon: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 10;

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private couponService: CouponService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const code = new FormControl('');

    this.form = new FormGroup({
      code: code,
    });
    this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: Coupon = new Coupon();
    filter.code = this.form.controls.code.value;
    this.couponService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/master-area-coupon/0/0`]);
  }

  deleteById(template: TemplateRef<any>, item: Coupon) {
    this.coupon = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.couponService.deleteById(this.coupon).subscribe(() => {
      const index: number = this.lst.indexOf(this.coupon);
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
    this.couponService.active(item).subscribe(result => {
      this.onSubmit();
    });
  }
}
