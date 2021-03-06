import { Component, NgZone } from '@angular/core';
import 'rxjs/Rx';
import { ScheduleServiceProvider } from '../../providers/schedule-service/schedule-service';

@Component({
	selector: 'page-class-schedule',
	templateUrl: 'class-schedule.html'
})
export class ClassSchedulePage {

	scheduleItems = [];

	constructor(scheduleServiceProvider: ScheduleServiceProvider, private zone: NgZone) {
		scheduleServiceProvider.getClassScheduleData((data) => {
			this.zone.run(() => {
				this.scheduleItems = data;
			});
		});
	}

	meetingHasTime(meeting) {
		return meeting.startTime != "";
	}
}
