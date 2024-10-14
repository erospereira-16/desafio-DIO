import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterAreaEstablishmentFormComponent } from './master-area-establishment-form/master-area-establishment-form.component';
import { MasterAreaEstablishmentFormModule } from './master-area-establishment-form/master-area-establishment-form.module';
import { MasterAreaEstablishmentComponent } from './master-area-establishment.component';

const routes: Routes = [
    {
        path: '',
        component: MasterAreaEstablishmentComponent
    },
    {
        path: ':id/:isEdit',
        component: MasterAreaEstablishmentFormComponent,
        children: [
            { path: '', loadChildren: () => MasterAreaEstablishmentFormModule },
          ]
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterAreaEstablishmentRoutingModule { }
