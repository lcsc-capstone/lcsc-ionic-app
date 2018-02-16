import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-class-schedule',
  templateUrl: 'class-schedule.html'
})
export class ClassSchedulePage {

  scheduleItems: any;

  scheduleData: any; 

  constructor(public navCtrl: NavController, private http: Http) { 
    
    this.scheduleItems = [
        "CITPT-111-60 Web Development Basics - Ford, N", 
        "COMM-205-60 Logic/Argumentation - Ferguson, K",
        "CS-480-01 Capstone Design - Peterson, N - Monday,Wednesday : 10:30AM - 11:45AM Meriwether Lewis Hall, 240; Friday Sam Glenn Complex, Friday : 11:00AM - 12:00PM Sam Glenn Complex 124",
        "MATH-275-01 Calculus III - Moon, H - Monday,Tuesday,Wednesday,Thursday : 7:30AM - 8:30AM Activity Center West 133"
    ]; 
  } 
  
    getData() {
        return this.http.get("data.json").map(res => res.json());
    }

    getTerm() {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();

        if(month <= 5) {
            return "SP";
        }
        else if(month > 5 && month < 8){
            return "SU";
        }
        else {
            return "FA";
        }
        return "ERR";
    }

    getMatchingTerm(sourceJson, term) {
        for(var term of sourceJson["Terms"]) {
            if(term["Code"] == term) {
                return term;
            }
        }
        return "ERR";
    }

    parseScheduleDate(jsonData) {

        data = [];
        
        for(var days of jsonData["Section"]["Meetings"]) {
            for(var day of days) {
                data.push(day, days["Room"], days["StartTime"], days["EndTime"]);
            }
        }

        return data;
    }

    stringifySchedule(name, id, title, start, end, schedule) {
        var data = [name, id, title, start, end, schedule.join(";")];
        return data.join("-");
    }

    parseJSONObject(jsonData) {
        var term = this.getTerm();

        termObject = this.getMatchingTerm(jsonData, term);

        for(var course of termObject["PlannedCourses"]) {
            var courseName = course["CourseTitleDisplay"];
            var courseId = course["CourseName"];
            var courseTitle = course["Title"];
            var startDate = course["Section"]["StartDate"];
            var endDate = course["Section"]["StartDate"];
            var scheduleData = this.parseScheduleData(course);

            self.scheduleItems.push(this.stringify(courseName, courseId, courseTitle, startDate, endDate, scheduleData));
        } 
    } 
}
