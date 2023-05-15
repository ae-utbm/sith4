import { Component, Inject, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Apollo, gql } from 'apollo-angular';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { Objected, UserObject } from 'src/types/objects';
import { UserProfilePictureEditModalComponent } from './picture/picture-edit-modal.component';
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { toBase64 } from 'src/utils/buffer';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
})
export class UserProfileComponent {
	public current: 'about' | 'contact' = 'about';
	public user?: UserObject;
	public profilePicture?: string;
	public age?: number;
	public birthdayFormatted?: string;

	@ViewChild('pictureModal', { static: false }) public pictureModal!: UserProfilePictureEditModalComponent;

	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly p: PageService,
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(HttpClient) private readonly http: HttpClient,
		private activeRoute: ActivatedRoute,
	) {
		this.activeRoute.params.subscribe((params) => {
			this.getUserData(parseInt(params['id'], 10));
		});
	}

	public get nickname(): string {
		if (!this.user?.nickname) return '';
		return `${this.user?.nickname} — `;
	}

	public getUserData(user_id: number): void {
		this.http
			.get(`${environment.API_URL}/users/picture/${user_id}`, {
				headers: {
					Authorization: `${sessionStorage.getItem('token')}`,
					'Accept-Language': localStorage.getItem('lang') ?? 'en-US',
				},
				responseType: 'arraybuffer',
			})
			.subscribe((data) => {
				this.profilePicture = 'data:image/png;base64,' + toBase64(data);
			});

		this.apollo
			.query<Objected<UserObject>>({
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
					user_id,
				},
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			})
			.subscribe(({ data }) => {
				if (data) {
					this.user = data['user'];
					const TimeDiff = Math.abs(Date.now() - new Date(this.user?.birthday ?? 0).getTime());
					this.age = Math.floor(TimeDiff / (1000 * 3600 * 24) / 365.25);
				}
			});
	}
}
