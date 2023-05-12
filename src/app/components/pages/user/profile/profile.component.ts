import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Apollo, gql } from 'apollo-angular';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { UserObject } from 'src/types/objects';

@Component({
	selector: 'app-user-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
})
export class UserProfileComponent {
	public current: 'about' | 'contact' = 'about';
	public user?: UserObject['user'] = undefined;
	public age?: number = undefined;
	public birthdayFormatted?: string = undefined;

	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly p: PageService,
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(TranslateService) public readonly t: TranslateService,
	) {
		this.getUserData(parseInt(localStorage.getItem('userId') ?? '0', 10));
	}

	public get nickname(): string {
		if (!this.user?.nickname) return '';
		return `${this.user?.nickname} — `;
	}

	public getUserData(userId: number): void {
		this.apollo
			.query<UserObject>({
				query: gql`
					query ($user_id: Int!) {
						user(id: $user_id) {
							id
							first_name
							last_name
							nickname
							cursus
							gender
							birthday
							promotion
							specialty
							subscriber_account
							last_seen
							pronouns
							subscription
							created
							updated
						}
					}
				`,
				variables: {
					user_id: userId,
				},
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			})
			.subscribe(({ data, errors }) => {
				if (data) {
					this.user = data.user;
					const TimeDiff = Math.abs(Date.now() - new Date(this.user?.birthday ?? 0).getTime());
					this.age = Math.floor(TimeDiff / (1000 * 3600 * 24) / 365.25);
				} else this.u.logout();

				if (errors) this.u.logout();
			});
	}
}
