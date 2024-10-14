import { NgModule } from '@angular/core';
import { MasterAreaSubscriptionComponent } from './master-area-subscription.component';
import { SharedModule } from '../shared.module';
import { MasterAreaSubscriptionRoutingModule} from './master-area-subscription-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerI18n , NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter, I18n  } from '../adapters/custom-date-adapter';
import { CustomDateParserFormatter } from '../adapters/custom-date-parser-formatter-adapter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MasterAreaSubscriptionRoutingModule,
        NgbModule,
        BsDatepickerModule.forRoot()
      ],
    declarations: [
      MasterAreaSubscriptionComponent
    ],
    exports: [ MasterAreaSubscriptionComponent,
        FormsModule,
        ReactiveFormsModule ],
        providers: [
         [I18n, { provide: NgbDatepickerI18n, useClass: CustomDateAdapter }],
         {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
       ]
})
export class MasterAreaSubscriptionModule { }
