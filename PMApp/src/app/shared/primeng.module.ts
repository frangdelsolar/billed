import { NgModule } from "@angular/core";
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TooltipModule} from 'primeng/tooltip';


const myModules = [
    ButtonModule,
    CalendarModule,
    CardModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    SelectButtonModule,
    TooltipModule
];

@NgModule({
    imports: [...myModules],
    exports: [...myModules],
})
export class PrimeNGModule{}