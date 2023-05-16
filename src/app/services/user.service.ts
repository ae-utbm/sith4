import type { Objected, UserObject } from 'src/types/objects';

import { Inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { PageService } from './page.service';
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public constructor(
		@Inject(PageService) private readonly p: PageService,
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(HttpClient) private readonly http: HttpClient,
	) {}

	public login(token: string, userId: number): void {
		sessionStorage.setItem('user_token', token);
		sessionStorage.setItem('user_id', userId.toString());

		this.fetchUser(userId);
		this.fetchUserPicture(userId);
		this.fetchUserBanner(userId);

		this.p.route = `profile/${userId}`;
	}

	public fetchUser(id: number) {
		this.apollo
			.query<Objected<UserObject>>({
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
				if (data) sessionStorage.setItem('user', JSON.stringify(data['user']));
				else this.logout();

				// Logout if the jwt token is invalid
				if (errors) this.logout();
			});
	}

	public fetchUserPicture(id: number) {
		this.http
			.get(`${environment.API_URL}/users/picture/${id}`, {
				headers: {
					Authorization: `${sessionStorage.getItem('token')}`,
					'Accept-Language': sessionStorage.getItem('lang') ?? 'en-US',
				},
				responseType: 'arraybuffer',
			})
			.subscribe({
				next: (data) => {
					if (data) sessionStorage.setItem('user_picture', data.toBase64());
				},
				error: () => sessionStorage.removeItem('user_picture'),
			});
	}

	public fetchUserBanner(id: number) {
		this.http
			.get(`${environment.API_URL}/users/banner/${id}`, {
				headers: {
					Authorization: `${sessionStorage.getItem('token')}`,
					'Accept-Language': sessionStorage.getItem('lang') ?? 'en-US',
				},
				responseType: 'arraybuffer',
			})
			.subscribe({
				next: (data) => {
					if (data) sessionStorage.setItem('user_banner', data.toBase64());
				},
				error: () => sessionStorage.removeItem('user_banner'),
			});
	}

	public refreshUser(): void {
		if (this.isLoggedIn) this.fetchUser(this.id ?? -1);
	}

	public refreshUserPicture(): void {
		if (this.isLoggedIn) this.fetchUserPicture(this.id ?? -1);
	}

	public refreshUserBanner(): void {
		if (this.isLoggedIn) this.fetchUserBanner(this.id ?? -1);
	}

	public logout(): void {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('user_id');
		sessionStorage.removeItem('user_token');
		sessionStorage.removeItem('user_picture');

		// this.p.route = '/';
	}

	public get user(): Partial<UserObject> {
		return JSON.parse(sessionStorage.getItem('user') ?? '{}');
	}

	public get picture(): string | undefined {
		return sessionStorage.getItem('user_picture') ?? undefined;
	}

	public get banner(): string | undefined {
		return sessionStorage.getItem('user_banner') ?? undefined;
	}

	public get isLoggedIn(): boolean {
		return sessionStorage.getItem('user_token') !== null && sessionStorage.getItem('user') !== null;
	}

	public get id(): number | undefined {
		return this.isLoggedIn && this.user ? this.user.id : undefined;
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

	// TODO
	public get balance(): number {
		return 0;
		// return this.isLoggedIn && this.user ? this.user.balance : undefined;
	}

	// TODO
	public get notifications(): string[] | undefined {
		return undefined;
		// return this.isLoggedIn && this.user ? this.user.notifications : undefined;
	}

	// TODO
	public get notificationsCount(): number | undefined {
		return undefined;
		// return this.isLoggedIn && this.user ? this.user.notifications.length : undefined;
	}
}
