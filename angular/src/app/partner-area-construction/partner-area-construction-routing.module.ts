import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructionComponent } from './partner-area-construction.component';
import { ConstructionFormComponent } from './partner-area-construction-form/partner-area-construction-form.component';
import { ConstructionFormModule } from './partner-area-construction-form/partner-area-construction-form.module';

const routes: Routes = [
    {
        path: '',
        component: ConstructionComponent
    },
    {
        path: ':id/:isEdit',
        component: ConstructionFormComponent,
        children: [
            { path: 'partner-area-construction-form', loadChildren: () => ConstructionFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConstructionRoutingModule { }
