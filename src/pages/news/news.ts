import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
	selector: 'page-news',
	templateUrl: 'news.html'
})
export class NewsPage {
	public news = {'1': {}, '2': {}, '3': {}, '4': {}, '5': {}, '6': {}, '7': {}, '8': {}, '9': {}, '10': {}};

	constructor(public navCtrl: NavController, private storage: Storage, private inAppBrowser: InAppBrowser) {
	}

	ionViewDidLoad() {
		this.storage.get('news').then(val => {
			this.news = val;
		});
	}
	
	openBrowser(link) {
		this.inAppBrowser.create(this.news[link.toString()]['link'], '_self', 'location=no');
	}
}
