import { NgModule } from '@angular/core';
import { InputComponent } from './partner-area-input.component';
import { SharedModule } from '../shared.module';
import { InputRoutingModule} from './partner-area-input-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    imports: [
        SharedModule,
        InputRoutingModule,
        CommonModule,
        NgbModule,
        NgxMaskDirective, NgxMaskPipe,
        CurrencyMaskModule
      ],
    declarations: [
      InputComponent
    ],
    providers: [provideNgxMask()],
    exports: [ InputComponent
     ]
})
export class InputModule { }
