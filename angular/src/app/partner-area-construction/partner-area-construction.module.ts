import { NgModule } from '@angular/core';
import { ConstructionComponent } from './partner-area-construction.component';
import { SharedModule } from '../shared.module';
import { ConstructionRoutingModule} from './partner-area-construction-routing.module';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CustomDateAdapter, I18n } from '../adapters/custom-date-adapter';
import { CustomDateParserFormatter } from '../adapters/custom-date-parser-formatter-adapter';

@NgModule({
    imports: [
        SharedModule,
        ConstructionRoutingModule,
        CommonModule,
        NgbModule,
        BsDatepickerModule.forRoot(),
        NgxMaskDirective, NgxMaskPipe,
        CurrencyMaskModule
      ],
    declarations: [
      ConstructionComponent
    ],
    providers: [provideNgxMask(),
        [I18n, { provide: NgbDatepickerI18n, useClass: CustomDateAdapter }],
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
      ],
    exports: [ ConstructionComponent
     ]
})
export class ConstructionModule { }
