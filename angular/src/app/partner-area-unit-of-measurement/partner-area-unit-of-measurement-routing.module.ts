import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitOfMeasurementComponent } from './partner-area-unit-of-measurement.component';
import { UnitOfMeasurementFormComponent } from './partner-area-unit-of-measurement-form/partner-area-unit-of-measurement-form.component';
import { UnitOfMeasurementFormModule } from './partner-area-unit-of-measurement-form/partner-area-unit-of-measurement-form.module';

const routes: Routes = [
    {
        path: '',
        component: UnitOfMeasurementComponent
    },
    {
        path: ':id/:isEdit',
        component: UnitOfMeasurementFormComponent,
        children: [
            { path: 'partner-area-unit-of-measurement-form', loadChildren: () => UnitOfMeasurementFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnitOfMeasurementRoutingModule { }
