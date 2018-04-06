import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { Http } from '@angular/http';
import {NgForm} from '@angular/forms';
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
  public nullJson=[
    {
      name:""
    }
  ]
extractData() {
	//let parsedData

  this.http.get('http://isoptera.lcsc.edu/~jamcdonald/classes.json')/*.map(res => { res.json()})*/.subscribe(data => {
    //this.debug2 = JSON.parse(data['_body']).items[0].name;
    this.ClassList= JSON.parse(data['_body']).items;
  });

//  this.ClassList.push({
//    name:"test"
//  });
  this.http.get('http://isoptera.lcsc.edu/~jamcdonald/tutors.json')/*.map(res => { res.json()})*/.subscribe(data => {
    //this.debug2 = JSON.parse(data['_body']).items[0].name;
    this.TutorList=JSON.parse(data['_body']).items;
  });


	}
  Submit( form: NgForm ){
    alert("Full Functionality not yet Implimented");

  //  form.value.class;
  }

	constructor(public navCtrl: NavController, public http: Http){
    this.extractData();
	}



}
