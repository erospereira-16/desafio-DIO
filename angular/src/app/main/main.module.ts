import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule} from './main-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MainRoutingModule,
        NgbModule,
      ],
    declarations: [
        MainComponent
    ],
    exports: [ MainComponent ]
})
export class MainModule { }
