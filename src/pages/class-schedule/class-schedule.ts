import { Component, NgZone } from '@angular/core';
import 'rxjs/Rx';
import { ScheduleServiceProvider } from '../../providers/schedule-service/schedule-service';

@Component({
  selector: 'page-class-schedule',
  templateUrl: 'class-schedule.html'
})
export class ClassSchedulePage {

  scheduleItems = [];

  constructor(private scheduleServiceProvider : ScheduleServiceProvider, private zone: NgZone) {
    scheduleServiceProvider.getClassScheduleData((data) => {
      this.zone.run(() => {
        for(var course of data) {
          let item = course.title + "--" + course.name;
          this.scheduleItems.push(item);
        }
      });
    });
  }
}
