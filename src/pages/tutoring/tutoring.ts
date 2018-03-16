import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import * as papa from 'papaparse';
@Component({
  selector: 'page-tutoring',
  templateUrl: 'tutoring.html'
})

export class TutoringPage {
	public csvItems:any;

	ClassList =[
		 {
		   name: '208'
		 },
		 {
		   name: '111'
		 }
	];
	TutorList =[
		 {
		   name: 'Jack'
		 },
		 {
		   name: 'Jim'
		 }
	];
private extractData() {
	//let parsedData
  this.TutorList= papa.parse("http://isoptera.lcsc.edu/~jamcdonald/tutors.csv",{
		download:true,
		complete:function(results){
			console.log(results)
		}
	});
  //this.TutorList=parsedData;
	//for(let i=0;i<parsedData.;i++){
  //this.TutorList.push({
  //    name:parsedData[0][name]
  //});
  //}

	}
	constructor(public navCtrl: NavController){
		this.extractData();
	}


}
