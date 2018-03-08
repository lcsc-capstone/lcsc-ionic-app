import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarDropdownPage } from './calendar-dropdown';

@NgModule({
  declarations: [
    CalendarDropdownPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarDropdownPage),
  ],
})
export class CalendarDropdownPageModule {}
