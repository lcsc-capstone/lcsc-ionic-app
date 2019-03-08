import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import { Calendar } from '@ionic-native/calendar';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class CalendarSorter{
  private Academics;
  private Entertainment;
  private Athletics;
  private StudentActivities;
  private ResidentLife;
  private CampusRec;
  private merged;
  private academicArray;
  private nonacademicArray;
  private Days = [];
  private LoadedDays = [];
  private Events = {};


  constructor( 
    private storage: Storage,
    // private calendar: Calendar,
    private http: HTTP) {
    
    this.setEvents();
  }
  getMergedEvents(){
    return this.merged;
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
    // let data = new Promise(function(resolve,reject){
    //   if(this.academicArray){
    //     resolve(data);
    //   }else{
    //     reject("academic array not set yet");
    //   }
    // })
    // console.log("reeeeeeeeeee" + this.academicArray);
    // //return this.academicArray;
  }
  getNonacademicEvents(){
    return this.nonacademicArray;
  }
  /* #######################################################################
				Academics 					- 0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com
				Entertainment 				- m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com
				Athletics 					- d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com
				StudentActivities 		- l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com
				ResidentLife 				- gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com
				CampusRec 					- h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com
				####################################################################### */
  private setEvents() {
    let curDay = (new Date().getDate());
    let curMonth = (new Date().getMonth() + 1); //Months are from 0-11 NOT 1-12
    let curYear = (new Date().getFullYear());

    this.http.get(`https://www.googleapis.com/calendar/v3/calendars/0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
      this.Academics = JSON.parse(data.data);
      this.storage.set('Academics', this.Academics);
      this.http.get(`https://www.googleapis.com/calendar/v3/calendars/m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
        this.Entertainment = JSON.parse(data.data);
        this.storage.set('Entertainment', this.Entertainment);
        this.http.get(`https://www.googleapis.com/calendar/v3/calendars/d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
          this.Athletics = JSON.parse(data.data);
          this.storage.set('Athletics', this.Athletics);
          this.http.get(`https://www.googleapis.com/calendar/v3/calendars/l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
            this.StudentActivities = JSON.parse(data.data);
            this.storage.set('StudentActivities', this.StudentActivities);
            this.http.get(`https://www.googleapis.com/calendar/v3/calendars/gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
              this.ResidentLife = JSON.parse(data.data);
              this.storage.set('ResidentLife', this.ResidentLife);
              this.http.get(`https://www.googleapis.com/calendar/v3/calendars/h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
                this.CampusRec = JSON.parse(data.data);
                this.storage.set('CampusRec', this.CampusRec);
   
	//	this.storage.get('last_time').then(midnight => {//set this later in variables so that it checks daily what is midnight
			this.storage.get('Academics').then(val1 => {
				this.Academics = val1;
				this.storage.get('Entertainment').then(val2 => {
					this.Entertainment = val2;
					this.storage.get('Athletics').then(val3 => {
						this.Athletics = val3;
						this.storage.get('StudentActivities').then(val4 => {
							this.StudentActivities = val4;
							this.storage.get('ResidentLife').then(val5 => {
								this.ResidentLife = val5;
								this.storage.get('CampusRec').then(val6 => {
									this.CampusRec = val6;
                  this.merged = [];
                  this.academicArray = [];
                  this.nonacademicArray = [];
                  let offset = 0
                  
                  if(this.Academics.items.length > 0){
  									for (let i = 0; i < this.Academics.items.length; i++) {
  										let localdate = new Date(new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-07:00')));
  										let ls = new Date(new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  										let le = new Date(new Date((val1.items[i].end.dateTime || val1.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  										let localtime = (ls + " - " + le);
  										this.merged.push({ StartDate: new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val1.items[i].end.dateTime || val1.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val1.items[i].summary, Description: val1.items[i].description, Calendar: val1.summary, Location: val1.items[i].location, Link: val1.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                      this.academicArray.push({ StartDate: new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val1.items[i].end.dateTime || val1.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val1.items[i].summary, Description: val1.items[i].description, Calendar: val1.summary, Location: val1.items[i].location, Link: val1.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    }
                  }
									for (let i = 0; i < this.Entertainment.items.length; i++) {
										let localdate = new Date(new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((val2.items[i].end.dateTime || val2.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val2.items[i].end.dateTime || val2.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val2.items[i].summary, Description: val2.items[i].description, Calendar: val2.summary, Location: val2.items[i].location, Link: val2.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    this.nonacademicArray.push({ StartDate: new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val2.items[i].end.dateTime || val2.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val2.items[i].summary, Description: val2.items[i].description, Calendar: val2.summary, Location: val2.items[i].location, Link: val2.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                  }
									for (let i = 0; i < this.Athletics.items.length; i++) {
										let localdate = new Date(new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((val3.items[i].end.dateTime || val3.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val3.items[i].end.dateTime || val3.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val3.items[i].summary, Description: val3.items[i].description, Calendar: val3.summary, Location: val3.items[i].location, Link: val3.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    this.nonacademicArray.push({ StartDate: new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val3.items[i].end.dateTime || val3.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val3.items[i].summary, Description: val3.items[i].description, Calendar: val3.summary, Location: val3.items[i].location, Link: val3.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                  }
									for (let i = 0; i < this.StudentActivities.items.length; i++) {
										let localdate = new Date(new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((val4.items[i].end.dateTime || val4.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val4.items[i].end.dateTime || val4.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val4.items[i].summary, Description: val4.items[i].description, Calendar: val4.summary, Location: val4.items[i].location, Link: val4.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    this.nonacademicArray.push({ StartDate: new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val4.items[i].end.dateTime || val4.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val4.items[i].summary, Description: val4.items[i].description, Calendar: val4.summary, Location: val4.items[i].location, Link: val4.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                  }
									for (let i = 0; i < this.ResidentLife.items.length; i++) {
										let localdate = new Date(new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((val5.items[i].end.dateTime || val5.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val5.items[i].end.dateTime || val5.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val5.items[i].summary, Description: val5.items[i].description, Calendar: val5.summary, Location: val5.items[i].location, Link: val5.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    this.nonacademicArray.push({ StartDate: new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val5.items[i].end.dateTime || val5.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val5.items[i].summary, Description: val5.items[i].description, Calendar: val5.summary, Location: val5.items[i].location, Link: val5.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                  }
									for (let i = 0; i < this.CampusRec.items.length; i++) {
										let localdate = new Date(new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let le = new Date(new Date((val6.items[i].end.dateTime || val6.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
										let localtime = (ls + " - " + le);
										this.merged.push({ StartDate: new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val6.items[i].end.dateTime || val6.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val6.items[i].summary, Description: val6.items[i].description, Calendar: val6.summary, Location: val6.items[i].location, Link: val6.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                    this.nonacademicArray.push({ StartDate: new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((val6.items[i].end.dateTime || val6.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: val6.items[i].summary, Description: val6.items[i].description, Calendar: val6.summary, Location: val6.items[i].location, Link: val6.items[i].htmlLink, LocalTime: localtime, LocalDate: localdate });
                  }
									this.merged.sort(function(a, b) { return a.StartDate - b.StartDate }).forEach(event => {
										if ((event.EndDate - event.StartDate) > (24 * 60 * 60 * 1000)) { // Event lasts longer than 24 hours.
											let len = Math.floor((event.EndDate - event.StartDate) / (24 * 60 * 60 * 1000)); // Number of days the event lasts minus 1.
											for (let i = 0; i < len; i++) {
												if (!this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]) {
													this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))] = { times: [] };
													this.Days.push([Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]);
												}
												this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))][event.Summary] = event;
												this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]['times'].push(event.Summary);
											}
										} else {
											if (!this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]) {
												this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))] = { times: [] };
												this.Days.push([Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]);
											}
											this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))][event.Summary] = event;
											this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]['times'].push(event.Summary);
										}
									});
                  if(this.academicArray.length > 0){
                        this.academicArray.sort(function(a, b) { return a.StartDate - b.StartDate }).forEach(event => {
                          if ((event.EndDate - event.StartDate) > (24 * 60 * 60 * 1000)) { // Event lasts longer than 24 hours.
                            let len = Math.floor((event.EndDate - event.StartDate) / (24 * 60 * 60 * 1000)); // Number of days the event lasts minus 1.
                            for (let i = 0; i < len; i++) {
                              if (!this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]) {
                                this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))] = { times: [] };
                                this.Days.push([Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]);
                              }
                              this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))][event.Summary] = event;
                              this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]['times'].push(event.Summary);
                            }
                          } else {
                            if (!this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]) {
                              this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))] = { times: [] };
                              this.Days.push([Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]);
                            }
                            this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))][event.Summary] = event;
                            this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]['times'].push(event.Summary);
                          }
                        });        
                  }  console.log("length of array is:" + this.academicArray.length);
                  for(let i=0;i<3;i++){
                      this.nonacademicArray.sort(function(a, b) { return a.StartDate - b.StartDate }).forEach(event => {
                        if ((event.EndDate - event.StartDate) > (24 * 60 * 60 * 1000)) { // Event lasts longer than 24 hours.
                          let len = Math.floor((event.EndDate - event.StartDate) / (24 * 60 * 60 * 1000)); // Number of days the event lasts minus 1.
                          for (let i = 0; i < len; i++) {
                            if (!this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]) {
                              this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))] = { times: [] };
                              this.Days.push([Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]);
                            }
                            this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))][event.Summary] = event;
                            this.Events[Math.floor(((event.LocalDate.getTime() + 57600000 + (i * 86400000)) / 86400000))]['times'].push(event.Summary);
                          }
                        } else {
                          if (!this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]) {
                            this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))] = { times: [] };
                            this.Days.push([Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]);
                          }
                          this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))][event.Summary] = event;
                          this.Events[Math.floor(((event.LocalDate.getTime() + 57600000) / 86400000))]['times'].push(event.Summary);
                        }
                      });
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
                });
              });
            });
          });
        });
      });
    };
  }
//}
