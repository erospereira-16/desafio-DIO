import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterAreaUserFormComponent } from './master-area-user-form/master-area-user-form.component';
import { MasterAreaUserFormModule } from './master-area-user-form/master-area-user-form.module';
import { MasterAreaUserComponent } from './master-area-user.component';

const routes: Routes = [
    {
        path: '',
        component: MasterAreaUserComponent
    },
    {
        path: ':id/:isEdit',
        component: MasterAreaUserFormComponent,
        children: [
            { path: '', loadChildren: () => MasterAreaUserFormModule },
          ]
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterAreaUserRoutingModule { }
