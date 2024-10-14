import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Subscription } from 'src/app/_model/subscription-model';
import { MaskedDate } from 'src/app/helpers/masked-date';
import { forkJoin } from 'rxjs';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Establishment } from 'src/app/_model/establishment-model';
import { PlanService } from 'src/app/services/plan.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { CouponService } from 'src/app/services/coupon.service';
import { Coupon } from 'src/app/_model/coupon-model';
import { Plan } from 'src/app/_model/plan-model';
import { PaymentMethod } from 'src/app/_model/payment-method-model';

@Component({
  selector: 'app-master-area-subscription-form',
  templateUrl: './master-area-subscription-form.component.html'
})

export class MasterAreaSubscriptionFormComponent implements OnInit {

  form: any;
  plans: Plan[] = [];
  establishments: Establishment[] = [];
  coupons: Coupon[] = [];
  paymentMethods: PaymentMethod[] = [];
  dateMask = MaskedDate;
  public submitted = false;
  public subscription: Subscription = new Subscription();
  constructor(private toastr: ToastrService,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private paymentMethodService: PaymentMethodService,
    private couponService: CouponService,
    private establishmentService: EstablishmentService,
    private planService: PlanService,
    private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['isEdit'] == '1') {
        this.subscription.id = Number(params['id']);
      } else {
        this.subscription.id = Number(0);
      }
    });
    const subscriptionDate = new FormControl('', Validators.compose([
      Validators.required,
    ]));

    const value = new FormControl('');

    const establishment = new FormControl('', Validators.compose([
      Validators.required,
    ]));

    const tolerance = new FormControl('');

    const plan = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const paymentMethod = new FormControl('');
    const coupon = new FormControl('');

    this.form = new FormGroup({
      plan: plan,
      establishment: establishment,
      paymentMethod: paymentMethod,
      coupon: coupon!,
      subscriptionDate: subscriptionDate,
      value: value,
      tolerance: tolerance
    });
    let filter = new Establishment();
    let filterCoupon = new Coupon();
    forkJoin(
      this.establishmentService.getByFilter(filter),
      this.planService.getAllPlan(),
      this.couponService.getByFilter(filterCoupon),
      this.paymentMethodService.getAllPaymentMethod()
    ).subscribe(result => {
      this.establishments = result[0];
      this.plans = result[1];
      this.coupons = result[2];
      this.paymentMethods = result[3];
    });
  }

  get f() { return this.form.controls; }

  onCancel() {
    this.router.navigate([`/master-area-subscription`]);
  }

  onSave() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.subscription.establishmentId = Number(this.form.controls.establishment.value);
    if (this.form.controls.coupon.value) {
      this.subscription.couponId = Number(this.form.controls.coupon.value);
    }  else {
      this.subscription.couponId = undefined;
    }
    this.subscription.planId = Number(this.form.controls.plan.value);
    if (this.form.controls.paymentMethod.value) {
      this.subscription.paymentMethodId = Number(this.form.controls.paymentMethod.value);
    } else {
      this.subscription.paymentMethodId = undefined;
    }
    
    this.subscription.subscriptionDate = new Date(this.form.controls.subscriptionDate.value.year,
      this.form.controls.subscriptionDate.value.month - 1,
      this.form.controls.subscriptionDate.value.day, 0, 0, 0, 0);
      if (this.form.controls.value.value) {
        this.subscription.value = this.form.controls.value.value;
      } else {
        this.subscription.value = undefined;
      }

      if (this.form.controls.tolerance.value) {
        this.subscription.tolerance = Number(this.form.controls.tolerance.value);
      } else {
        this.subscription.tolerance = undefined;
      }
      
      
      this.subscriptionService.save(this.subscription).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        return this.router.navigate(['master-area-subscription']);
      })
  }

  // onChange() {
  //   const filter: Module = new Module();
  //   if (this.form.controls.establishment.value) {
  //     let establishment = this.establishments.find(x => x.id === Number(this.form.controls.establishment.value));
  //     if (establishment) {
  //       filter.id = establishment.moduleId;
  //     }
      
  //   }
  //   this.planService.getPLanByModule(filter).subscribe(result => {
  //     this.form.controls.plan.enable();
  //     this.plans = result;
  //   });
  // }

  // onChangePlan(plan: Plan) {
  //   if (this.form.controls.plan.value) {
  //     this.form.controls.value.setvalue(this.form.controls.plan.value.value);
  //   }
  // }

  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

}

