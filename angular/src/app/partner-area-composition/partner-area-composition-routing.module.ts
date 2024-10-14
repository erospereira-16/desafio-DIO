import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompositionComponent } from './partner-area-composition.component';
import { CompositionFormComponent } from './partner-area-composition-form/partner-area-composition-form.component';
import { CompositionFormModule } from './partner-area-composition-form/partner-area-composition-form.module';

const routes: Routes = [
    {
        path: '',
        component: CompositionComponent
    },
    {
        path: ':id/:isEdit',
        component: CompositionFormComponent,
        children: [
            { path: 'partner-area-composition-form', loadChildren: () => CompositionFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompositionRoutingModule { }
