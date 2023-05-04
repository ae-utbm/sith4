import { Inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { UserObject } from 'src/types/objects';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public constructor(@Inject(Apollo) private readonly apollo: Apollo) {}
	private user?: undefined | UserObject['user'] = undefined;

	public get isLoggedIn(): boolean {
		if (localStorage.getItem('authToken') === null) return false;
		return true;
	}

	public get fullName(): string | undefined {
		return this.isLoggedIn && this.user ? `${this.user.first_name} ${this.user.last_name}` : undefined;
	}

	public get accountId(): string | undefined {
		return undefined;
		// return this.isLoggedIn && this.user ? this.user.account_id : undefined;
	}

	public get balance(): number | undefined {
		return undefined;
		// return this.isLoggedIn && this.user ? this.user.balance : undefined;
	}

	public get picture(): string | undefined {
		return undefined;
		// return this.isLoggedIn && this.user ? this.user.profile_picture : undefined;
	}

	public get banner(): string | undefined {
		return undefined;
		// return this.isLoggedIn && this.user ? this.user.profile_banner : undefined;
	}

	public get notifications(): string[] | undefined {
		return undefined;
		// return this.isLoggedIn && this.user ? this.user.notifications : undefined;
	}

	public get notificationsCount(): number | undefined {
		return undefined;
		// return this.isLoggedIn && this.user ? this.user.notifications.length : undefined;
	}

	public logout(): void {
		this.user = undefined;
		localStorage.removeItem('authToken');
		localStorage.removeItem('refreshToken');
	}

	public login(id: number, jwtToken: string, refreshToken: string): void {
		localStorage.setItem('authToken', jwtToken);
		localStorage.setItem('refreshToken', refreshToken);

		this.apollo
			.query<UserObject>({
				query: gql`
					query ($user_id: Int!) {
						user(id: $user_id) {
							first_name
							last_name
							nickname
							promotion
						}
					}
				`,
				variables: {
					user_id: id,
				},
			})
			.subscribe(({ data }) => {
				this.user = data.user;
			});
	}
}
