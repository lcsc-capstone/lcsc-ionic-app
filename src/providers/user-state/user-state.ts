import { Injectable } from '@angular/core';

/*
  Generated class for the UserStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserStateProvider {

	user_state: UserState;

	constructor() {
	}

	getUserState(): UserState {
		return this.user_state;
	}

	updateUserState(userState: UserState) {
		this.user_state = userState;
	}

}

export enum UserState {
	Guest,
	Credentialed,
}
