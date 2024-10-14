import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterAreaCouponComponent } from './master-area-coupon.component';
import { MasterAreaCouponFormComponent } from './master-area-coupon-form/master-area-coupon-form.component';
import { MasterAreaCouponFormModule } from './master-area-coupon-form/master-area-coupon-form.module';

const routes: Routes = [
    {
        path: '',
        component: MasterAreaCouponComponent
    },
    {
        path: ':id/:isEdit',
        component: MasterAreaCouponFormComponent,
        children: [
            { path: 'master-area-coupon-form', loadChildren: () => MasterAreaCouponFormComponent },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterAreaCouponRoutingModule { }
