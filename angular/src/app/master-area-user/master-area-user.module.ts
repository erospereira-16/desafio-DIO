import { NgModule } from '@angular/core';
import { MasterAreaUserComponent } from './master-area-user.component';
import { SharedModule } from '../shared.module';
import { MasterAreaUserRoutingModule} from './master-area-user-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MasterAreaUserRoutingModule,
        NgbModule,
        NgxMaskDirective, NgxMaskPipe
      ],
    declarations: [
       MasterAreaUserComponent
    ],
    providers: [provideNgxMask()],
    exports: [ MasterAreaUserComponent,
     ]
})
export class MasterAreaUserModule { }
