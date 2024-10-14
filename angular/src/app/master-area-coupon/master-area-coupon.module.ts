import { NgModule } from '@angular/core';
import { MasterAreaCouponComponent } from './master-area-coupon.component';
import { SharedModule } from '../shared.module';
import { MasterAreaCouponRoutingModule} from './master-area-coupon-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerI18n , NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter, I18n  } from '../adapters/custom-date-adapter';
import { CustomDateParserFormatter } from '../adapters/custom-date-parser-formatter-adapter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MasterAreaCouponRoutingModule,
        NgbModule,
        BsDatepickerModule.forRoot()
      ],
    declarations: [
        MasterAreaCouponComponent
    ],
    exports: [ MasterAreaCouponComponent,
        FormsModule,
        ReactiveFormsModule ],
        providers: [
         [I18n, { provide: NgbDatepickerI18n, useClass: CustomDateAdapter }],
         {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
       ]
})
export class MasterAreaCouponModule { }
