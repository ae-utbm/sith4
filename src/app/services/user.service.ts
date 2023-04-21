import { Injectable } from '@angular/core';

const FAKE_USER = {
	balance: 100,
	account_id: '12345a',
	name: 'DOE',
	first_name: 'John',
	profile_picture: 'https://avatars.githubusercontent.com/u/106403460',
	profile_banner: 'https://gifdb.com/images/high/the-office-michael-yikes-x8pzowd0ud2o8e15.gif',
};

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private user?: undefined | typeof FAKE_USER = undefined;

	public get isLoggedIn(): boolean {
		if (localStorage.getItem('authToken') === null) return false;
		this.user = FAKE_USER; // todo call api to get user info in real time
		return true;
	}

	public get fullName(): string | undefined {
		return this.isLoggedIn && this.user ? `${this.user.first_name} ${this.user.name}` : undefined;
	}

	public get accountId(): string | undefined {
		return this.isLoggedIn && this.user ? this.user.account_id : undefined;
	}

	public get balance(): number | undefined {
		return this.isLoggedIn && this.user ? this.user.balance : undefined;
	}

	public get picture(): string | undefined {
		return this.isLoggedIn && this.user ? this.user.profile_picture : undefined;
	}

	public get banner(): string | undefined {
		return this.isLoggedIn && this.user ? this.user.profile_banner : undefined;
	}

	public logout(): void {
		this.user = undefined;
		localStorage.removeItem('authToken');
	}

	public login(jwt: string): void {
		this.user = FAKE_USER;
		localStorage.setItem('authToken', jwt);
	}
}
