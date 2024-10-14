import { NgModule } from '@angular/core';
import { UnitOfMeasurementFormComponent } from './partner-area-unit-of-measurement-form.component';
import { SharedModule } from 'src/app/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        CommonModule,
      ],
    declarations: [
      UnitOfMeasurementFormComponent
    ],
    exports: [ UnitOfMeasurementFormComponent,
     ]
})
export class UnitOfMeasurementFormModule { }
