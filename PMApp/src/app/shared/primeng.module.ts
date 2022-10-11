import { NgModule } from "@angular/core";
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';

const myModules = [
    ButtonModule,
    CalendarModule,
    CardModule
];

@NgModule({
    imports: [...myModules],
    exports: [...myModules],
})
export class PrimeNGModule{}