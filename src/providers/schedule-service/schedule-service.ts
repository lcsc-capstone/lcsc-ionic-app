import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { Injectable } from '@angular/core';
import { CredentialsProvider} from '../credentials/credentials';
import { UserStateProvider, UserState } from '../user-state/user-state';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the ScheduleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScheduleServiceProvider {

	readonly getInputByValueScript: string = "function getInputByValue(value){var inputs = document.getElementsByTagName('input');for(var i = 0; i < inputs.length; i++){if(inputs[i].value == value){return inputs[i];}}return null;}";
	readonly buttonClickSource: string = this.getInputByValueScript + "getInputByValue('Sign In').click();";
	readonly loadScheduleDataSource: string = "var scripts = document.getElementsByTagName('script');scripts[scripts.length - 1].innerHTML;";
	readonly getUrlScript: string = "window.location.href;";
	readonly isLoginPageScript: string = "window.location.href.indexOf('Account') != -1;";
	readonly isSchedulePageScript: string = "window.location.href.indexOf('PrintSchedule?') != -1;"

	courses = [];
	hasCacheData = false;

	courseDataDayLookup = {};

	constructor(private credentialsProvider: CredentialsProvider,
		private inAppBrowser: InAppBrowser,
		private loadingController: LoadingController,
		private userStateProvider: UserStateProvider) {
	}

	async getClassScheduleDataOnLoader(handler: (data: any) => any): Promise<any> {
		if (this.hasCacheData) {
			return await this.getClassScheduleData(handler);
		}
		else {

			let loader = this.loadingController.create({
				content: "Loading student info..."
			});

			loader.present().then(async () => {
				let result = await this.getClassScheduleData(handler);
				loader.dismiss();
				return result;
			});
		}
	}

	async getClassScheduleData(handler: (data: any) => any): Promise<any> {

		if (this.hasCacheData) {
			handler(this.courses);
			return;
		}

		if (this.userStateProvider.getUserState() == UserState.Guest) {
			handler([]);
			return;
		}

		let courseDataURL = "https://warriorwebss.lcsc.edu/Student/Planning/DegreePlans/PrintSchedule?termId=" + this.getCurrentTermId();
		let username = await this.credentialsProvider.getWarriorWebUsername();
		let password = await this.credentialsProvider.getWarriorWebPassword();

		let load_counter = 0;

		let browser = this.inAppBrowser.create(courseDataURL, '_blank', 'clearcache=yes,hidden=yes');

		browser.on('loadstop').subscribe(async (ev: InAppBrowserEvent) => {
			if (load_counter == 0) {
				//this.loginToWarriorWeb(browser, username, password); //This was broken so the same method from credentialsProvider is used
				await browser.executeScript({ code: this.credentialsProvider.getLoginUsernameFillInScript(username) });
				await browser.executeScript({ code: this.credentialsProvider.getLoginPasswordFillInScript(password) });
				await browser.executeScript({ code: 'document.getElementById(\'login-button\').click();' });
				console.log("logged in");
			}
			else{
				console.log("inside else if");
				let data = await this.loadScheduleData(browser);
				console.log("got past data");
				let json = JSON.parse(data[0].replace("var result =", "").replace("};", "}"));
				console.log("printing json");
				console.log(json);
				let termId = this.getCurrentTermId();
				let currentTerm = this.selectCurrentTerm(json, termId);

				if (currentTerm != null) {
					this.courses = this.selectCourses(currentTerm);
					handler(this.courses);
					browser.close();
					this.hasCacheData = true;
				}
			}
			load_counter++;
		});
	}

	async getTodaysClassScheduleData(handler: (data: any) => any): Promise<any> {
		return this.getClassScheduleDataOnLoader((data) => {

			let day = new Date().getDay();

			let meetings = this.courseDataDayLookup[day];

			meetings = (meetings == null) ? [] : meetings;

			handler(meetings);
		});
	}

	async loadScheduleData(browser: InAppBrowserObject): Promise<any> {
		return browser.executeScript({ code: this.loadScheduleDataSource });
	}

	getCurrentTermId(): string {
		let date = new Date();
		let yearStr = date.getFullYear().toString();
		let semesterStr = this.getSemesterString();
		
		return yearStr + semesterStr;
	}

	getSemesterString(): string {
		let date = new Date();
		let month = date.getMonth()+1;
		if(month >= 8 && month <= 12) {
			return "FA";
		}
		else if(month <= 5) {
			return "SP";
		}
		else {
			return "SU";
		}
	}

	selectCurrentTerm(json, termId: string) {
		let currentTerm = null;

		for (var term of json.Terms) {
			if (term.Code == termId) {
				currentTerm = term;
				break;
			}
		}

		return currentTerm;
	}

	selectCourses(term: any): any[] {
		let result = [];

		for (var course of term.PlannedCourses) {
			if (!course.HasRegisteredSection) continue;

			let meetings = [];

			for (var meeting of course.Section.PlannedMeetings) {

				if (meeting.StartTime == null || meeting.StartTime == "") {
					continue;
				}

				let startTime = meeting.StartTime == null ? "N/A" : meeting.StartTime;
				let endTime = meeting.EndTime == null ? "N/A" : meeting.EndTime;

				let building = meeting.Building == null ? "N/A" : meeting.Building;
				let room = meeting.Room == null ? "N/A" : meeting.Room;
				let days = meeting.Days;

				let daySecond = (meeting.StartTimeHour * 60 * 60) + (meeting.StartTimeMinute * 60);

				let meeting_obj = {
					startTime: startTime,
					endTime: endTime,
					building: building,
					room: room,
					days: days,
					title: course.Title,
					name: course.Name,
					daySecond: daySecond,
					daysStr: this._computeDaysStr(days),
				};

				meetings.push(meeting_obj);

				for (var day of days) {
					this.appendToCourseDailyData(day, meeting_obj);
				}
			}

			let item = {
				title: course.Title,
				name: course.CourseName,
				meetings: meetings,
				faculty: course.Section.Faculty,
				description: course.Description,
			};

			result.push(item);
		}

		return result;
	}

	_computeDaysStr(days) {
		let result = "";
		for (var day of days) {
			if (day == 0) {
				result += "Sunday, ";
			}
			else if (day == 1) {
				result += "Monday, ";
			}
			else if (day == 2) {
				result += "Tuesday, ";
			}
			else if (day == 3) {
				result += "Wednesday, ";
			}
			else if (day == 4) {
				result += "Thursday, ";
			}
			else if (day == 5) {
				result += "Friday, ";
			}
			else if (day == 6) {
				result += "Saturday, ";
			}
		}

		result = (result.endsWith(", ")) ? result.substring(0, result.length - 2) : result;
		return result;
	}

	appendToCourseDailyData(day: number, data: any) {

		if (this.courseDataDayLookup[day] == null) {
			this.courseDataDayLookup[day] = [];
		}

		this.courseDataDayLookup[day].push(data);
	}

	clearCache() {
		this.hasCacheData = false;
		this.courseDataDayLookup = {};
		this.courses = [];
	}
}
