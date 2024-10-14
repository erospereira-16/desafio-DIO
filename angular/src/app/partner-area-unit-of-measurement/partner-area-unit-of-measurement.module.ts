import { NgModule } from '@angular/core';
import { UnitOfMeasurementComponent } from './partner-area-unit-of-measurement.component';
import { SharedModule } from '../shared.module';
import { UnitOfMeasurementRoutingModule} from './partner-area-unit-of-measurement-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    imports: [
        SharedModule,
        UnitOfMeasurementRoutingModule,
        CommonModule,
        NgbModule,
        NgxMaskDirective, NgxMaskPipe,
        CurrencyMaskModule
      ],
    declarations: [
      UnitOfMeasurementComponent
    ],
    providers: [provideNgxMask()],
    exports: [ UnitOfMeasurementComponent
     ]
})
export class UnitOfMeasurementModule { }
