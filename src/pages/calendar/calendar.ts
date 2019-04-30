import { NgModule, Component } from '@angular/core';
import { NavController, PopoverController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CalendarDropdownPageModule } from './calendar-dropdown.module';
import { CalendarDropdownPage } from './calendar-dropdown';
import { Calendar } from '@ionic-native/calendar';
import { AlertController } from 'ionic-angular';
import { CalendarSorter } from '../../providers/event-calendar/calendarSort';

@Component({
	selector: 'page-calendar',
	templateUrl: 'calendar.html'
})
@NgModule({
	imports: [
		CalendarDropdownPageModule
	]
})
export class CalendarPage {
	public Academics;
	public Entertainment;
	public Athletics;
	public StudentActivities;
	public ResidentLife;
	public CampusRec;
	public Days = [];
	public LoadedDays = [];
	public Events: {};
	public showAcademic = true;
	public showEntertainment = true;
	public showAthletics = true;
	public showStudentActivities = true;
	public showResidentLife = true;
	public showCampusRec = true;
	public todaysDate;

	constructor(public atrCtrl: AlertController,
		 public navCtrl: NavController,
		 public popoverCtrl: PopoverController,
		 private storage: Storage,
		 public events: Events,
		 private calendar: Calendar,
	 	 private sorted: CalendarSorter) {
		events.subscribe('toggleAcademic', () => {
			this.showAcademic = !this.showAcademic;
		});
		events.subscribe('toggleEntertainment', () => {
			this.showEntertainment = !this.showEntertainment;
		});
		events.subscribe('toggleAthletics', () => {
			this.showAthletics = !this.showAthletics;
		});
		events.subscribe('toggleStudentActivities', () => {
			this.showStudentActivities = !this.showStudentActivities;
		});
		events.subscribe('toggleResidentLife', () => {
			this.showResidentLife = !this.showResidentLife;
		});
		events.subscribe('toggleCampusRec', () => {
			this.showCampusRec = !this.showCampusRec;
		});
	}

	ionViewDidLoad() {
		this.storage.get('showAcademic').then(val => {
			this.showAcademic = val;
			if (val == null) this.showAcademic = true;
			this.storage.get('showAthletics').then(val => {
				this.showAthletics = val;
				if (val == null) this.showAthletics = true;
				this.storage.get('showEntertainment').then(val => {
					this.showEntertainment = val;
					if (val == null) this.showEntertainment = true;
					this.storage.get('showStudentActivities').then(val => {
						this.showStudentActivities = val;
						if (val == null) this.showStudentActivities = true;
						this.storage.get('showCampusRec').then(val => {
							this.showCampusRec = val;
							if (val == null) this.showCampusRec = true;
							this.storage.get('showResidentLife').then(val => {
								this.showResidentLife = val;
								if (val == null) this.showResidentLife = true;
								this.events.publish('toggleCalendars', this.showAcademic, this.showEntertainment, this.showStudentActivities, this.showCampusRec, this.showResidentLife, this.showAthletics);
							});
						});
					});
				});
			});
		});
		this.sorted.getMergedEvents().then(data =>{
			this.Events=data;
		});
		this.Days = this.sorted.getDays();
		for (let i = 0; i < 7; i++) {
			this.LoadedDays.push(this.Days[i]);
		}
		//variable used in html to display events on current date or later due to utc we add 7 hours less than a day 
		this.todaysDate =  Math.floor((new Date().getTime()+61200000)/86400000);
		
	}

	doInfinite(infiniteScroll) {
		if (this.LoadedDays.length >= this.Days.length - 1) infiniteScroll.enable(false);
		setTimeout(() => {
			let starting = this.LoadedDays.length;
			for (let i = starting; i < starting + 3; i++) {
				this.LoadedDays.push(this.Days[i]);
			}
			infiniteScroll.complete();
		}, 1);
	}

	ionViewWillEnter() {
		this.events.subscribe('getCalendars', () => {
			this.events.publish('toggleCalendars', this.showAcademic, this.showEntertainment, this.showStudentActivities, this.showCampusRec, this.showResidentLife, this.showAthletics);
		});
	}

	ionViewWillUnload() {
		this.events.unsubscribe('getCalendars')
	}

	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(CalendarDropdownPage);
		popover.present({
			ev: myEvent
		});
	}

	shownGroup = null;

	toggleGroup(group) {
		if (this.isGroupShown(group)) {
			this.shownGroup = null;
		} else {
			this.shownGroup = group;
		}
	};

	isGroupShown(group) {
		return this.shownGroup === group;
	};


	showConfirmAlert(event) {
		let alertConfirm = this.atrCtrl.create({
			title: 'Add to Calendar',
			message: 'Add event to you calendar?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('No clicked');
					}
				},
				{
					text: 'Add',
					handler: () => {
						this.calendar.createEventWithOptions(event.Summary, event.Location, event.Description, new Date(event.StartDate), new Date(event.EndDate), );

					}
				}
			]
		});
		alertConfirm.present();
	}
}
