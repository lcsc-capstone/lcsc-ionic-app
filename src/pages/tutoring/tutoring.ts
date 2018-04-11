import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';//use native http
import {NgForm} from '@angular/forms';
@Component({
  selector: 'page-tutoring',
  templateUrl: 'tutoring.html'
})

export class TutoringPage {
  public classKey=""
  public tutorKey=""
  public Time=["Sample Time","Sample Time"];
  public ListName=""
  public isSubmitted=false
  public isOnline=false
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

  this.http.get('http://isoptera.lcsc.edu/~jamcdonald/classes.json', {}, {})/*.map(res => { res.json()})*/.then(data => {
    //this.debug2 = JSON.parse(data['_body']).items[0].name;
    this.ClassList= JSON.parse(data.data).items;
  });

//  this.ClassList.push({
//    name:"test"
//  });
  this.http.get('http://isoptera.lcsc.edu/~jamcdonald/tutors.json', {}, {})/*.map(res => { res.json()})*/.then(data => {
    //this.debug2 = JSON.parse(data['_body']).items[0].name;
    this.TutorList=JSON.parse(data.data).items;
  });


	}
  Submit( form: NgForm ){
    if(this.classKey!=""){
      this.ListName=this.classKey
    }else if(this.tutorKey!=""){
      this.ListName=this.tutorKey

    }
    this.classKey=""
    this.tutorKey=""
    this.isSubmitted=true;
  //  form.value.class;
}
	constructor(public navCtrl: NavController, public http: HTTP){
    this.extractData();
	}



}
