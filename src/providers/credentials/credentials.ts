import { NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the CredentialsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CredentialsProvider {

  credentials_warriorweb = 'credentialsWarriorWeb';
  username_warriorweb = 'warriorWebUsername';
  password_warriorweb = 'passwordWarriorWeb';

  constructor(private secureStorage: SecureStorage) {
  }

  async setWarriorWebUsername(value : string) {
    let storage = await this.secureStorage.create(this.credentials_warriorweb);
    return storage.set(this.username_warriorweb, value);
  }

  async setWarriorWebPassword(value : string) {
    let storage = await this.secureStorage.create(this.credentials_warriorweb);
    return storage.set(this.password_warriorweb, value);
  }

  async getWarriorWebUsername() : Promise<string> {
    let storage = await this.secureStorage.create(this.credentials_warriorweb);
    return storage.get(this.username_warriorweb);
  }

  async getWarriorWebPassword() : Promise<string> {
    let storage = await this.secureStorage.create(this.credentials_warriorweb);
    return storage.get(this.password_warriorweb);
  }
}
