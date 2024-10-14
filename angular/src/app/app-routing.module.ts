import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main/main.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { MasterAreaEstablishmentModule } from './master-area-establishment/master-area-establishment.module';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { MasterAreaModule } from './master-area/master-area.module';
import { MasterAreaLoginModule } from './master-area-login/master-area-login.module';
import { MasterAreaUserModule } from './master-area-user/master-area-user.module';
import { MasterAreaCouponModule } from './master-area-coupon/master-area-coupon.module';
import { MasterAreaSubscriptionModule } from './master-area-subscription/master-area-subscription.module';
import { PartnerAreaLoginModule } from './partner-area-login/partner-area-login.module';
import { PartnerLayoutComponent } from './layouts/partner-layout/partner-layout.component';
import { PartnerAreaModule } from './partner-area/partner-area.module';
import { UnitOfMeasurementModule } from './partner-area-unit-of-measurement/partner-area-unit-of-measurement.module';
import { InputModule } from './partner-area-input/partner-area-input.module';
import { CompositionModule } from './partner-area-composition/partner-area-composition.module';
import { ConstructionModule } from './partner-area-construction/partner-area-construction.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: 'index', loadChildren: () => MainModule },
      { path: 'master-area-login', loadChildren: () => MasterAreaLoginModule },
      { path: 'partner-area-login', loadChildren: () => PartnerAreaLoginModule },
    ]
  }, 

  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      { path: 'master-area', loadChildren: () => MasterAreaModule },
      { path: 'master-area-establishment', loadChildren: () => MasterAreaEstablishmentModule },
      { path: 'master-area-coupon', loadChildren: () => MasterAreaCouponModule },
      { path: 'master-area-user', loadChildren: () => MasterAreaUserModule },
      { path: 'master-area-subscription', loadChildren: () => MasterAreaSubscriptionModule },
     ],
     canActivate: [AuthGuard],
     data: { expectedRole: ['Master'] }
  },
  {
    path: '',
    component: PartnerLayoutComponent,
    children: [
      { path: 'partner-area', loadChildren: () => PartnerAreaModule },
      { path: 'partner-area-unit-of-measurement', loadChildren: () => UnitOfMeasurementModule },
      { path: 'partner-area-input', loadChildren: () => InputModule },
      { path: 'partner-area-composition', loadChildren: () => CompositionModule },
      { path: 'partner-area-construction', loadChildren: () => ConstructionModule },
     ],
     canActivate: [AuthGuard],
     data: { expectedRole: ['Administrador','Orçamentista'] }
  },
  // {
  //   path: '',
  //   component: PartnerLayoutComponent,
  //   children: [
  //     { path: 'partner-area', loadChildren: () => PartnerAreaModule },
  //    ],
  //    canActivate: [AuthGuard],
  //    data: { expectedRole: ['Administrador','Orçamentista'] }
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
