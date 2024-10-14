import { NgModule } from '@angular/core';
import { CompositionComponent } from './partner-area-composition.component';
import { SharedModule } from '../shared.module';
import { CompositionRoutingModule} from './partner-area-composition-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    imports: [
        SharedModule,
        CompositionRoutingModule,
        CommonModule,
        NgbModule,
        NgxMaskDirective, NgxMaskPipe,
        CurrencyMaskModule
      ],
    declarations: [
      CompositionComponent
    ],
    providers: [provideNgxMask()],
    exports: [ CompositionComponent
     ]
})
export class CompositionModule { }
