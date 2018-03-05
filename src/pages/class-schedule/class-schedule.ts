import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
declare var cordova: any;

@Component({
  selector: 'page-class-schedule',
  templateUrl: 'class-schedule.html'
})
export class ClassSchedulePage {

  scheduleItems: any;
  scheduleData: any;

  readonly buttonClickSource : string = "function getInputByValue(value){var inputs = document.getElementsByTagName('input');for(var i = 0; i < inputs.length; i++){if(inputs[i].value == value){return inputs[i];}}return null;}getInputByValue('Sign In').click();";
  readonly loadScheduleDataSource : string = "var scripts = document.getElementsByTagName('script');scripts[scripts.length - 1].innerHTML;";

  courseDataURL: any;

  username : string = "user_default";
  password : string = "pass_default";

  readonly LOGIN : string = "login";
  readonly LOAD_SCHEDULE : string = "LOAD_SCHEDULE";

  stage : string = "login";

  readonly NONE : string = "no_page";
  readonly LOGIN_PAGE : string = "login_page";
  readonly SCHED_PAGE : string = "sched_page";
  page_stage : string = this.NONE;

  constructor(public navCtrl: NavController, private inAppBrowser: InAppBrowser, private secureStorage: SecureStorage, private zone: NgZone) {
    this.courseDataURL = "https://warriorwebss.lcsc.edu/Student/Planning/DegreePlans/PrintSchedule?termId=2018SP";
    this.scheduleItems = [];

    this.secureStorage.create('credentials').then((storage : SecureStorageObject) => {
      storage.get("loginUsername").then(data => this.username = data, err => alert(err));
      storage.get("loginPassword").then(data => this.password = data, err => alert(err));

      const browser = this.inAppBrowser.create(this.courseDataURL, '_self', 'clearcache=yes,hidden=yes');
      browser.on('loadstop').subscribe((ev : InAppBrowserEvent) => {

          if(this.page_stage == this.NONE) this.page_stage = this.LOGIN_PAGE;
          else if(this.page_stage == this.LOGIN_PAGE) this.page_stage = this.SCHED_PAGE;

          if(this.stage == this.LOGIN && this.page_stage == this.LOGIN_PAGE)
          {
            this.loginToWarriorWeb(browser).then(data => this.stage = this.LOAD_SCHEDULE);
          }
          else if(this.stage == this.LOAD_SCHEDULE && this.page_stage == this.SCHED_PAGE)
          {
            this.loadScheduleJsonData(browser).then(data => {
              // Don't leave credentials floating around in memory
              this.username = "";
              this.password = "";

              let json = JSON.parse(data[0].replace("var result =", "").replace("};", "}"));
              let termCode : string = "2018SP"; // TODO this is easy to calculate, get to later

              let currentTerm = null;

              for(var term of json.Terms)
              {
                if(term.Code == termCode)
                {
                  currentTerm = term;
                  break;
                }
              }

              for(var course of currentTerm.PlannedCourses)
              {
                let item = course.CourseTitleDisplay + "--" + course.CourseName;
                this.zone.run(() => this.scheduleItems.push(item));
              }
            });
          }
          // We may want to add a handler for this where we'd simply wait for the next page loadstop
          // before loading the schedule data
          else if(this.stage == this.LOAD_SCHEDULE && this.page_stage != this.SCHED_PAGE) {
            alert('Bug: Attempting to load schedule before page ready. Please report');
          }
      });
    });
  }

  async loginToWarriorWeb(browser) : Promise<any> {
    return await browser.executeScript({ code: "document.getElementById('UserName').value = '" + this.username + "';" }).then(
      browser.executeScript({ code: "document.getElementById('Password').value = '" + this.password + "';" })).then(
        browser.executeScript({ code: this.buttonClickSource }));
  }

  async loadScheduleJsonData(browser) : Promise<any> {
    return browser.executeScript({ code: this.loadScheduleDataSource });
  }
}
