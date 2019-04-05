import { Injectable } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

/*
  Generated class for the DeviceInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceInfoProvider {

  constructor(private secureStorage : SecureStorage) {
  }
//check if the device has a lock screen security
  async deviceIsSecured() : Promise<boolean> {
    try{
      let sso : SecureStorageObject = await this.secureStorage.create('test');
      return true;
    }
    catch(error) {
      return false;
    }
  }
}
