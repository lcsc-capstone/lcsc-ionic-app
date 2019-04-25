import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { stringify } from '@angular/compiler/src/util';
import { Events } from 'ionic-angular';

@Injectable()
export class CalendarSorter{
  public Academics;
  public Entertainment;
  public Athletics;
  public StudentActivities;
  public ResidentLife;
  public CampusRec;
  public merged;
  public academicArray;
  public nonacademicArray;
  public Days = [];
  public LoadedDays = [];
  public Events = {};
  public academicEvents = {};
  public nonAcademicEvents = {};

  constructor( 
    private storage: Storage,
    private http: HTTP) {
      this.academicArray = [];
      this.nonacademicArray = [];
      this.Days = [];
      this.LoadedDays = [];
      this.Events = {};
      this.academicEvents = {};
      this.nonAcademicEvents = {};
      this.merged=[];
  }

  getMergedEvents(){ 
    return new Promise(resolve =>{
    resolve(this.Events);
  })
  }
  getLoadedDays(){
    return this.LoadedDays;
  }
  getDays(){
    return this.Days;
  }
  getAcademicEvents(){
    return new Promise(resolve =>{
      resolve(this.academicArray);
    })
  }
  getNonacademicEvents(){
    return new Promise(resolve =>{
      resolve(this.nonacademicArray);
    })
  }
  /* #######################################################################
				Academics 					- 0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com
				Entertainment 				- m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com
				Athletics 					- d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com
				StudentActivities 		- l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com
				ResidentLife 				- gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com
				CampusRec 					- h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com
				####################################################################### */
  setEvents() {

    
    let curDay = (new Date().getDate());
    let curMonth = (new Date().getMonth() + 1); //Months are from 0-11 NOT 1-12
    let curYear = (new Date().getFullYear());

    let academicsUrl = `https://www.googleapis.com/calendar/v3/calendars/0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`;
    let entertainmentUrl = `https://www.googleapis.com/calendar/v3/calendars/m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`;
    let athleticsUrl = `https://www.googleapis.com/calendar/v3/calendars/d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`
    let studentActivitiesUrl = `https://www.googleapis.com/calendar/v3/calendars/l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`
    let residenceLifeUrl = `https://www.googleapis.com/calendar/v3/calendars/gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`
    let campusRecUrl = `https://www.googleapis.com/calendar/v3/calendars/h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`;
   
    //parses and sets the calendar data into arrays in storage
    this.http.get(academicsUrl, {}, {}).then(val1=> {
      this.Academics = JSON.parse(val1.data);
      this.storage.set('Academics', this.Academics);
      this.http.get(entertainmentUrl, {}, {}).then(val2 => {
        this.Entertainment = JSON.parse(val2.data);
        this.storage.set('Entertainment', this.Entertainment);
        this.http.get(athleticsUrl, {}, {}).then(val3 => {
          this.Athletics = JSON.parse(val3.data);
          this.storage.set('Athletics', this.Athletics);
          this.http.get(studentActivitiesUrl, {}, {}).then(val4 => {
            this.StudentActivities = JSON.parse(val4.data);
            this.storage.set('StudentActivities', this.StudentActivities);
            this.http.get(residenceLifeUrl, {}, {}).then(val5 => {
              this.ResidentLife = JSON.parse(val5 .data);
              this.storage.set('ResidentLife', this.ResidentLife);
              this.http.get(campusRecUrl, {}, {}).then(val6 => {
                this.CampusRec = JSON.parse(val6.data);
                this.storage.set('CampusRec', this.CampusRec);
                this.merged = [];
                  this.academicArray = [];
                  this.nonacademicArray = [];
                  let offset = 0;
                  //gets the array and pushes them academic events into academicArray and non academic to nonacademicarray both pushed to the merged array 
                  if(this.Academics.items.length > 0){
  									for (let i = 0; i < this.Academics.items.length; i++) {
                      let localdate = new Date(new Date((this.Academics.items[i].start.dateTime || this.Academics.items[i].start.date + 'T00:00:00-07:00')));
                      let ls = new Date(new Date((this.Academics.items[i].start.dateTime || this.Academics.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  										let le = new Date(new Date((this.Academics.items[i].end.dateTime || this.Academics.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      let localtime = (ls + " - " + le);
  										this.merged.push({ StartDate: new Date((this.Academics.items[i].start.dateTime || this.Academics.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Academics.items[i].end.dateTime || this.Academics.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Academics.items[i].summary, Description: this.Academics.items[i].description, Calendar: this.Academics.summary, Location: this.Academics.items[i].location, Link: this.Academics.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                      }
                  }
									for (let i = 0; i < this.Entertainment.items.length; i++) {
										let localdate = new Date(new Date((this.Entertainment.items[i].start.dateTime || this.Entertainment.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((this.Entertainment.items[i].start.dateTime || this.Entertainment.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((this.Entertainment.items[i].end.dateTime || this.Entertainment.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((this.Entertainment.items[i].start.dateTime || this.Entertainment.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Entertainment.items[i].end.dateTime || this.Entertainment.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Entertainment.items[i].summary, Description: this.Entertainment.items[i].description, Calendar: this.Entertainment.summary, Location: this.Entertainment.items[i].location, Link: this.Entertainment.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    }
									for (let i = 0; i < this.Athletics.items.length; i++) {
										let localdate = new Date(new Date((this.Athletics.items[i].start.dateTime || this.Athletics.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((this.Athletics.items[i].start.dateTime || this.Athletics.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((this.Athletics.items[i].end.dateTime || this.Athletics.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((this.Athletics.items[i].start.dateTime || this.Athletics.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Athletics.items[i].end.dateTime || this.Athletics.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Athletics.items[i].summary, Description: this.Athletics.items[i].description, Calendar: this.Athletics.summary, Location: this.Athletics.items[i].location, Link: this.Athletics.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    }
									for (let i = 0; i < this.StudentActivities.items.length; i++) {
										let localdate = new Date(new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((this.StudentActivities.items[i].end.dateTime || this.StudentActivities.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.StudentActivities.items[i].end.dateTime || this.StudentActivities.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.StudentActivities.items[i].summary, Description: this.StudentActivities.items[i].description, Calendar: this.StudentActivities.summary, Location: this.StudentActivities.items[i].location, Link: this.StudentActivities.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    }
									for (let i = 0; i < this.ResidentLife.items.length; i++) {
										let localdate = new Date(new Date((this.ResidentLife.items[i].start.dateTime || this.ResidentLife.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((this.ResidentLife.items[i].start.dateTime || this.ResidentLife.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((this.ResidentLife.items[i].end.dateTime || this.ResidentLife.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((this.ResidentLife.items[i].start.dateTime || this.ResidentLife.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.ResidentLife.items[i].end.dateTime || this.ResidentLife.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.ResidentLife.items[i].summary, Description: this.ResidentLife.items[i].description, Calendar: this.ResidentLife.summary, Location: this.ResidentLife.items[i].location, Link: this.ResidentLife.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    }
									for (let i = 0; i < this.CampusRec.items.length; i++) {
										let localdate = new Date(new Date((this.CampusRec.items[i].start.dateTime || this.CampusRec.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((this.CampusRec.items[i].start.dateTime || this.CampusRec.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((this.CampusRec.items[i].end.dateTime || this.CampusRec.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((this.CampusRec.items[i].start.dateTime || this.CampusRec.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.CampusRec.items[i].end.dateTime || this.CampusRec.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.CampusRec.items[i].summary, Description: this.CampusRec.items[i].description, Calendar: this.CampusRec.summary, Location: this.CampusRec.items[i].location, Link: this.CampusRec.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                   }
                  //sorts all events inside the  arrays and checks how long the event lasts
									this.merged.sort(function(a, b) { return a.StartDate - b.StartDate }).forEach(event => {
                    if ((event.EndDate - event.StartDate) > (86400000)) { // Event lasts longer than 24 hours.
                      let len = Math.floor(((event.EndDate - event.StartDate)) / (86400000)); 
                      for (let i = 0; i < len+1; i++) {//this multiday event start at 0 for first day and len +1 to reach last day
                        if (!this.Events[Math.floor(((event.LocalDate.getTime() + (i * 86400000)) / 86400000))] ) {
                          this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))] = { times: [] };
                          this.Days.push([Math.floor(((event.LocalDate.getTime() + 57600000+ (i * 86400000)) / 86400000))])
                        }
                      
                        this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))][event.Summary] = event;
                        this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]['times'].push(event.Summary);
                      }
                    } 
                    else {
                      if(((event.LocalDate.getTime()/86400000) % 1) == 0.2916666666678793){//check for single all day event
											  if (!this.Events[Math.floor((event.LocalDate.getTime()/ 86400000)+0.708333333333)]) {//give the compliment to make it not display a day early
											  	this.Events[Math.floor((event.LocalDate.getTime()/ 86400000)+0.708333333333)] = { times: [] };
											  	this.Days.push([Math.floor((event.LocalDate.getTime()/ 86400000)+0.708333333333)]);
											  }
											  this.Events[Math.floor((event.LocalDate.getTime()/ 86400000)+0.708333333333)][event.Summary] = event;
											  this.Events[Math.floor((event.LocalDate.getTime()/ 86400000)+0.708333333333)]['times'].push(event.Summary);
                      }
                      else{//single day event with given times
                        if (!this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]) {
                          this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))] = { times: [] };
                          this.Days.push([Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]);
                        }
                        this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))][event.Summary] = event;
                        this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]['times'].push(event.Summary);
                      }
                      }
                  })

                  let keys = Object.keys(this.Events);
                  let academicHome = 0;
                  let nonAcademicHome = 0;
                  let namesInAcademic = [];
                  let namesInNonacademic = [];
                  for ( let k in keys){
                    let deepKeys = Object.keys(this.Events[keys[k]])
                    for (let d in deepKeys){
                      let calendarName = this.Events[keys[k]][deepKeys[d]].Calendar;
                      if(calendarName == "Academics" && academicHome < 3 && (namesInAcademic.indexOf(this.Events[keys[k]][deepKeys[d]].Summary) < 0)){
                          namesInAcademic.push(this.Events[keys[k]][deepKeys[d]].Summary);
                          this.academicArray.push(this.Events[keys[k]][deepKeys[d]]);
                          academicHome += 1;
                      }
                      else if (calendarName != "Academics" && calendarName != undefined && nonAcademicHome < 3 && ((namesInNonacademic.indexOf(this.Events[keys[k]][deepKeys[d]].Summary) < 0))){
                        namesInNonacademic.push(this.Events[keys[k]][deepKeys[d]].Summary);
                        this.nonacademicArray.push(this.Events[keys[k]][deepKeys[d]]);
                        nonAcademicHome += 1;
                      }
                    }
                  }
                
									for (let i = 0; i < 8; i++) {
										this.LoadedDays.push(this.Days[i]);
                  }
              });
            });
          });
        });
      });
    });
      
  }
}

