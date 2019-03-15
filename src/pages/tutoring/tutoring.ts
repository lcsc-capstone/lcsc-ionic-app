import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';//use native http
import { NgForm } from '@angular/forms';
@Component({
	selector: 'page-tutoring',
	templateUrl: 'tutoring.html'
})

export class TutoringPage {
	
	public classKey = ""
	public tutorKey = ""
	public selection = "Class"
	public Time = ["Sample Time", "Sample Time"];
	public Times = { "key": ["time", "time"] }
	public ListName = ""
	public isSubmitted = false
	public isOnline = false
	public ClassList = [
		{
			name: 'Could not Load Data'
		}
	];
	public TutorList = [
		{
			name: 'Could not Load Data'
		}
	];
	public nullJson = [
		{
			name: ""
		}
	]
	extractData() {
		//let parsedData

		this.http.get('http://isoptera.lcsc.edu/~seniorprojectweb/combined.json', {}, {})/*.map(res => { res.json()})*/.then(data => {
			//this.debug2 = JSON.parse(data['_body']).items[0].name;
			this.ClassList = JSON.parse(data.data)["classes"];
			this.TutorList = JSON.parse(data.data)["tutors"];
			this.Times = JSON.parse(data.data)["times"];
			var comma = /,/gi;
			for(var i in this.Times){
				console.log(i);
				console.log(this.Times[i]);
				for(var j = 0; this.Times[i].length; j++){
					console.log(this.Times[i][j]);
					this.Times[i][j] = this.Times[i][j].replace(comma, "<br>");

				}
			}
		});

	}
	Submit(form: NgForm) {
		if (this.selection == "Class") {
			this.ListName = this.classKey
		} else if (this.selection == "Tutor") {
			this.ListName = this.tutorKey
		}
		this.classKey = ""
		this.tutorKey = ""
		this.Time = this.Times[this.ListName]
		this.isSubmitted = true;

		//  form.value.class;

	}
	 Tutoring: String
	constructor(public navCtrl: NavController, public http: HTTP) {
		this.extractData();
		this.Tutoring = "Classes";
	}
	


}
