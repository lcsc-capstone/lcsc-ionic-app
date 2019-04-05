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
		this.http.get('http://isoptera.lcsc.edu/~seniorprojectweb/combined.json', {}, {}).then(data => {
			this.ClassList = JSON.parse(data.data)["classes"];
			this.TutorList = JSON.parse(data.data)["tutors"];
			this.Times = JSON.parse(data.data)["times"];
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
	}
	Tutoring: String
	constructor(public navCtrl: NavController, public http: HTTP) {
		this.extractData();
		this.Tutoring = "Classes";
	}
}
