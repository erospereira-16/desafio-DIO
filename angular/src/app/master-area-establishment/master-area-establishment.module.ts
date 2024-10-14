import { NgModule } from '@angular/core';
import { MasterAreaEstablishmentComponent } from './master-area-establishment.component';
import { SharedModule } from '../shared.module';
import { MasterAreaEstablishmentRoutingModule} from './master-area-establishment-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MasterAreaEstablishmentRoutingModule,
        NgbModule,
        NgxMaskDirective, NgxMaskPipe
      ],
    declarations: [
       MasterAreaEstablishmentComponent
    ],
    providers: [provideNgxMask()],
    exports: [ MasterAreaEstablishmentComponent,
     ]
})
export class MasterAreaEstablishmentModule { }
