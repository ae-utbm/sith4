import { Inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { UserObject } from 'src/types/objects';
import { PageService } from './page.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public constructor(
		@Inject(PageService) private readonly p: PageService,
		@Inject(Apollo) private readonly apollo: Apollo,
	) {}

	private fetching = false;
	private user?: UserObject['user'] = undefined;

	public get isLoggedIn(): boolean {
		if (localStorage.getItem('token') === null) return false;
		if (this.user === undefined) this.fetchUser(parseInt(localStorage.getItem('userId') ?? '0', 10));
		return true;
	}

	public get fullName(): string | undefined {
		return this.isLoggedIn && this.user ? `${this.user.first_name} ${this.user.last_name}` : undefined;
	}

	public get nickname(): string | undefined {
		return this.isLoggedIn && this.user ? this.user.nickname : undefined;
	}

	public get accountId(): string | undefined {
		return this.isLoggedIn && this.user ? this.user.subscriber_account : undefined;
	}

	public get balance(): number {
		return 0;
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
		localStorage.removeItem('token');
		localStorage.removeItem('userId');

		this.p.route = '/';
	}

	public login(id: number, jwt: string): void {
		localStorage.setItem('token', jwt);
		localStorage.setItem('userId', id.toString());

		this.fetchUser(id);
	}

	private fetchUser(id: number): void {
		if (this.fetching === true) return;
		this.fetching = true;

		this.apollo
			.query<UserObject>({
				query: gql`
					query ($user_id: Int!) {
						user(id: $user_id) {
							first_name
							last_name
							nickname
							promotion
							id
							subscriber_account
						}
					}
				`,
				variables: {
					user_id: id,
				},
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			})
			.subscribe(({ data, errors }) => {
				if (data) this.user = data.user;
				else this.logout();

				// Logout if the jwt token is invalid
				if (errors) this.logout();
			});

		this.fetching = false;
	}
}
