import { NgModule } from "@angular/core";
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';


const myModules = [
    ButtonModule,
    CalendarModule,
    CardModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule
];

@NgModule({
    imports: [...myModules],
    exports: [...myModules],
})
export class PrimeNGModule{}