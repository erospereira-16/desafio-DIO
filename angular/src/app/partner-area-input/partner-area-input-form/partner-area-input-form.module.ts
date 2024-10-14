import { NgModule } from '@angular/core';
import { InputFormComponent } from './partner-area-input-form.component';
import { SharedModule } from 'src/app/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        CommonModule,
        CurrencyMaskModule,
      ],
    declarations: [
      InputFormComponent
    ],
    exports: [ InputFormComponent,
     ]
})
export class InputFormModule { }
