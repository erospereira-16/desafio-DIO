import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterAreaSubscriptionComponent } from './master-area-subscription.component';
import { MasterAreaSubscriptionFormComponent } from './master-area-subscription-form/master-area-subscription-form.component';
import { MasterAreaSubscriptionFormModule } from './master-area-subscription-form/master-area-subscription-form.module';

const routes: Routes = [
    {
        path: '',
        component: MasterAreaSubscriptionComponent
    },
    {
        path: ':id/:isEdit',
        component: MasterAreaSubscriptionFormComponent,
        children: [
            { path: 'masterAreaSubscriptionForm', loadChildren: () => MasterAreaSubscriptionFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterAreaSubscriptionRoutingModule { }
