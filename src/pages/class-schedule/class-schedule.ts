import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
declare var cordova: any;

@Component({
  selector: 'page-class-schedule',
  templateUrl: 'class-schedule.html'
})
export class ClassSchedulePage {

  scheduleItems: any;
  scheduleData: any;

  buttonClickSource: any;
  loadScheduleDataSource: any;

  courseDataURL: any;
  rawScheduleData: any;

  constructor(public navCtrl: NavController, private inAppBrowser: InAppBrowser) {
    this.rawScheduleData = "";
    this.courseDataURL = "https://warriorwebss.lcsc.edu/Student/Planning/DegreePlans/PrintSchedule?termId=2018SP";
    this.scheduleItems = [];
    this.buttonClickSource = "function getInputByValue(value){var inputs = document.getElementsByTagName('input');for(var i = 0; i < inputs.length; i++){if(inputs[i].value == value){return inputs[i];}}return null;}getInputByValue('Sign In').click();";
    this.loadScheduleDataSource = "var scripts = document.getElementsByTagName('script'); scripts[scripts.length - 1].innerHTML;";

    const browser = this.inAppBrowser.create(this.courseDataURL, '_self', 'clearcache=yes,hidden=yes');
    browser.on('loadstop').subscribe((ev : InAppBrowserEvent) => {
        if(localStorage.getItem("schedLoad") == "false")
        {
            browser.executeScript({ code: "document.getElementById('UserName').value = 'fake';" });
            browser.executeScript({ code: "document.getElementById('Password').value = 'fake';" });   
            browser.executeScript({ code: this.buttonClickSource });
            browser.executeScript({ code: this.loadScheduleDataSource }).then(
            function(data) {
                localStorage.setItem("schedData", data[0]);
            });
            localStorage.setItem("schedLoad", "false");
        }
        else
        {
            localStorage.setItem("schedLoad", "true");
        }
    });

    this.rawScheduleData = localStorage.getItem("schedData").replace("var result =", "").replace("};","}");

    let json = JSON.parse(this.rawScheduleData);

    let termCode = "2018SP";

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
        this.scheduleItems.push(item);
    }
  }
}
