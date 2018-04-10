import { NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { Injectable } from '@angular/core';
import { CredentialsProvider } from '../credentials/credentials';

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

  constructor(private credentialsProvider : CredentialsProvider, private inAppBrowser: InAppBrowser) {
  }

  async getClassScheduleData(handler : (data : any) => any) : Promise<any> {

    let courseDataURL = "https://warriorwebss.lcsc.edu/Student/Planning/DegreePlans/PrintSchedule?termId=" + this.getCurrentTermId();

    let username = await this.credentialsProvider.getWarriorWebUsername();
    let password = await this.credentialsProvider.getWarriorWebPassword();

    let load_counter = 0;

    let browser = this.inAppBrowser.create(courseDataURL, '_blank', 'clearcache=yes,hidden=yes');

    browser.on('loadstop').subscribe(async (ev : InAppBrowserEvent) => {
      let isLoginPage = await this.loginPageIsLoaded(browser);
      let isSchedulePage = await this.schedulePageIsLoaded(browser);

      if(load_counter == 1)
      {
        await this.loginToWarriorWeb(browser, username, password);
      }
      else if(load_counter == 2)
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
        }
      }

      load_counter++;
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

  async loginPageIsLoaded(browser : InAppBrowserObject) : Promise<boolean> {
    //let loaded_url : string = await browser.executeScript({ code : this.getUrlScript });
    return browser.executeScript({ code : this.isLoginPageScript });
  }

  async schedulePageIsLoaded(browser : InAppBrowserObject) : Promise<boolean> {
    //let loaded_url : string = await browser.executeScript({ code : this.getUrlScript });
    return browser.executeScript({ code : this.isSchedulePageScript });
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
    let result = [];

    for(var course of term.PlannedCourses)
    {
      let item = {
        title : course.CourseTitleDisplay,
        name  :course.CourseName,
      };

      result.push(item);
    }

    return result;
  }
}
