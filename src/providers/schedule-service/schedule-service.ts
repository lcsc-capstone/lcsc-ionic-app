import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { Injectable } from '@angular/core';
import { CredentialsProvider } from '../credentials/credentials';
import { UserStateProvider, UserState } from '../user-state/user-state';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the ScheduleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScheduleServiceProvider {

  readonly getInputByValueScript : string = "function getInputByValue(value){var inputs = document.getElementsByTagName('input');for(var i = 0; i < inputs.length; i++){if(inputs[i].value == value){return inputs[i];}}return null;}";
  readonly buttonClickSource : string = this.getInputByValueScript + "getInputByValue('Sign In').click();";
  readonly loadScheduleDataSource : string = "var scripts = document.getElementsByTagName('script');scripts[scripts.length - 1].innerHTML;";
  readonly getUrlScript : string = "window.location.href;";
  readonly isLoginPageScript : string = "window.location.href.indexOf('Account') != -1;";
  readonly isSchedulePageScript : string = "window.location.href.indexOf('PrintSchedule?') != -1;"

  courses = [];
  hasCacheData = false;

  courseDataDayLookup = {};

  constructor(private credentialsProvider : CredentialsProvider,
              private inAppBrowser: InAppBrowser,
              private loadingController : LoadingController,
              private userStateProvider : UserStateProvider) {
  }

  async getClassScheduleDataOnLoader(handler : (data : any) => any) : Promise<any> {
    if(this.hasCacheData) {
      return await this.getClassScheduleData(handler);
    }
    else {

      let loader = this.loadingController.create({
        content : "Loading student info..."
      });

      loader.present().then(async () => {
        let result = await this.getClassScheduleData(handler);
        loader.dismiss();
        return result;
      });
    }
  }

  async getClassScheduleData(handler : (data : any) => any) : Promise<any> {

    if(this.hasCacheData) {
      handler(this.courses);
      return;
    }

    if(this.userStateProvider.getUserState() == UserState.Guest) {
      handler([]);
      return;
    }

    let courseDataURL = "https://warriorwebss.lcsc.edu/Student/Planning/DegreePlans/PrintSchedule?termId=" + this.getCurrentTermId();

    let username = await this.credentialsProvider.getWarriorWebUsername();
    let password = await this.credentialsProvider.getWarriorWebPassword();

    let load_counter = 0;

    let browser = this.inAppBrowser.create(courseDataURL, '_blank', 'clearcache=yes,hidden=yes');

    browser.on('loadstop').subscribe(async (ev : InAppBrowserEvent) => {
      if(load_counter == 0)
      {
        this.loginToWarriorWeb(browser, username, password);
      }
      else if(load_counter == 1)
      {
        let data = await this.loadScheduleData(browser);
        let json = JSON.parse(data[0].replace("var result =", "").replace("};", "}"));
        let termId = this.getCurrentTermId();
        let currentTerm = this.selectCurrentTerm(json, termId);

        if(currentTerm != null)
        {
          this.courses = this.selectCourses(currentTerm);
          handler(this.courses);
          browser.close();
          this.hasCacheData = true;
        }
      }

      load_counter++;
    });
  }

  async getTodaysClassScheduleData(handler : (data : any) => any) : Promise<any> {
    return this.getClassScheduleDataOnLoader((data) => {

      let day = new Date().getDay();

      let meetings = this.courseDataDayLookup[day];

      handler(meetings); // TODO filter out courses not happening on the day
    });
  }

  async loginToWarriorWeb(browser, username, password) : Promise<any> {
    return await
      browser.executeScript({ code: "document.getElementById('UserName').value = '" + username + "';" }).then(
        browser.executeScript({ code: "document.getElementById('Password').value = '" + password + "';" })).then(
          browser.executeScript({ code: this.buttonClickSource }));
  }

  async loadScheduleData(browser : InAppBrowserObject) : Promise<any> {
    return browser.executeScript({code : this.loadScheduleDataSource});
  }

  getCurrentTermId() : string {
    let date = new Date();
    let yearStr = date.getFullYear().toString();
    let semesterStr = (date.getMonth() >= 8 && date.getMonth() <= 12) ? "FA" : "SP";
    return yearStr + semesterStr;
  }

  selectCurrentTerm(json, termId : string) {
    let currentTerm = null;

    for(var term of json.Terms)
    {
      if(term.Code == termId)
      {
        currentTerm = term;
        break;
      }
    }

    return currentTerm;
  }

  selectCourses(term : any) : any[] {
    //alert('Selecting courses');
    let result = [];

    for(var course of term.PlannedCourses)
    {
      if(!course.HasRegisteredSection) continue;

      let meetings = [];

      for(var meeting of course.Section.PlannedMeetings) {

        if(meeting.StartTime == null || meeting.StartTime == "") {
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
          building : building,
          room : room,
          days : days,
          title : course.Title,
          name : course.Name,
          daySecond : daySecond
        };

        meetings.push(meeting_obj);

        for(var day of days) {
          this.appendToCourseDailyData(day, meeting_obj);
        }
      }

      let item = {
        title : course.Title,
        name  :course.CourseName,
        meetings : meetings,
      };

      result.push(item);
    }

    return result;
  }

  appendToCourseDailyData(day : number, data : any) {

    if(this.courseDataDayLookup[day] == null) {
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
