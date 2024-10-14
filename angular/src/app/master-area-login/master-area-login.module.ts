import { NgModule } from '@angular/core';
import { MasterAreaLoginComponent } from './master-area-login.component';
import { MasterAreaLoginRoutingModule} from './master-area-login-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        MasterAreaLoginRoutingModule,
        FormsModule, ReactiveFormsModule,
      ],
    declarations: [
        MasterAreaLoginComponent    ],
    exports: [ MasterAreaLoginComponent ]
})
export class MasterAreaLoginModule { }
