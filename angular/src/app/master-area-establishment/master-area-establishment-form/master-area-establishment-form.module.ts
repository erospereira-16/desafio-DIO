import { NgModule } from '@angular/core';
import { MasterAreaEstablishmentFormComponent } from './master-area-establishment-form.component';
import { SharedModule } from 'src/app/shared.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';




@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxMaskDirective, NgxMaskPipe
      ],
    declarations: [
      MasterAreaEstablishmentFormComponent
    ],
    providers: [provideNgxMask()],
    exports: [ MasterAreaEstablishmentFormComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class MasterAreaEstablishmentFormModule { }
