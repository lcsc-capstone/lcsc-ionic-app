import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { Http } from '@angular/http';
@Component({
  selector: 'page-tutoring',
  templateUrl: 'tutoring.html'
})

export class TutoringPage {
	public ClassList =[
		 {
		   name: 'Could not Load Data'
		 }
	];
	public TutorList =[
		 {
		   name: 'Could not Load Data'
		 }
	];
extractData() {
	//let parsedData

  this.http.get('http://isoptera.lcsc.edu/~jamcdonald/classes.json')/*.map(res => { res.json()})*/.subscribe(data => {
    //this.debug2 = JSON.parse(data['_body']).items[0].name;
    this.ClassList = JSON.parse(data['_body']).items;
  });
  this.http.get('http://isoptera.lcsc.edu/~jamcdonald/tutors.json')/*.map(res => { res.json()})*/.subscribe(data => {
    //this.debug2 = JSON.parse(data['_body']).items[0].name;
    this.TutorList = JSON.parse(data['_body']).items;
  });
  //alert(this.TutorList.toString());
  //this.TutorList=parsedData;
	//for(let i=0;i<parsedData.;i++){
  //this.TutorList.push({
  //    name:parsedData[0][name]
  //});
  //}


	}

	constructor(public navCtrl: NavController, public http: Http){
    this.extractData();
	}



}
