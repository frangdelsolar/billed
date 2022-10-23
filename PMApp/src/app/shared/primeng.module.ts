import { NgModule } from "@angular/core";
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';


const myModules = [
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    ChipModule,
    ChipsModule,
    ColorPickerModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    MultiSelectModule,
    OverlayPanelModule,
    SelectButtonModule,
    TabViewModule,
    ToastModule,
    TooltipModule
];

@NgModule({
    imports: [...myModules],
    exports: [...myModules],
})
export class PrimeNGModule{}