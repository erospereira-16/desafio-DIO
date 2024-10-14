import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './partner-area-input.component';
import { InputFormComponent } from './partner-area-input-form/partner-area-input-form.component';
import { InputFormModule } from './partner-area-input-form/partner-area-input-form.module';

const routes: Routes = [
    {
        path: '',
        component: InputComponent
    },
    {
        path: ':id/:isEdit',
        component: InputFormComponent,
        children: [
            { path: 'partner-area-input-form', loadChildren: () => InputFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InputRoutingModule { }
