import { NgModule } from '@angular/core';
import { ConstructionFormComponent } from './partner-area-construction-form.component';
import { SharedModule } from 'src/app/shared.module';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);
@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        CommonModule,
        BsDatepickerModule.forRoot(),
        CurrencyMaskModule,
        NgxMaskDirective, NgxMaskPipe
      ],
    declarations: [
      ConstructionFormComponent
    ],
    providers: [provideNgxMask()],
    exports: [ ConstructionFormComponent,
     ]
})
export class ConstructionFormModule { }
