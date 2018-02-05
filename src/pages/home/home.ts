import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClassSchedulePage } from '../class-schedule/class-schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  goToClassSchedule(params){
    if (!params) params = {};
    this.navCtrl.push(ClassSchedulePage);
  }
}
