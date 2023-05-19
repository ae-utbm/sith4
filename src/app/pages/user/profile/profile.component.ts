import type { base64 } from 'src/types';

import { Component, Inject, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Apollo, gql } from 'apollo-angular';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { Objected, PublicUserObject, UserObject } from 'src/types/objects';
import { UserProfilePictureEditModalComponent } from './picture-modal/picture-edit-modal.component';
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserProfileBannerEditModalComponent } from './banner-modal/banner-edit-modal.component';
import { DEFAULT_HEADERS } from 'src/utils/http';

@Component({
	selector: 'app-user-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
})
export class UserProfileComponent {
	public current: 'about' | 'contact' = 'about';
	public user?: UserObject<typeof this.hasPermission>;
	public age?: number;
	public birthdayFormatted?: string;

	public profilePicture?: base64;
	public profileBanner?: base64;

	// TODO implement those fields
	public suspended = false;
	public banned = false;

	private userId = 0;

	@ViewChild('pictureModal', { static: false }) public pictureModal!: UserProfilePictureEditModalComponent;
	@ViewChild('bannerModal', { static: false }) public bannerModal!: UserProfileBannerEditModalComponent;

	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly p: PageService,
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(HttpClient) private readonly http: HttpClient,
		private activeRoute: ActivatedRoute,
	) {
		this.activeRoute.params.subscribe((params) => {
			this.userId = parseInt(params['id'], 10);
			this.getUserData(this.userId);
		});
	}

	public get nickname(): string {
		if (!this.user?.nickname) return '';
		return `${this.user?.nickname} — `;
	}

	/**
	 * Returns true if the current user is the owner of the profile or has the permission to edit it.
	 * @returns {boolean} True if the current user is the owner of the profile or has the permission to edit it.
	 * TODO implement permission system
	 */
	public get isOwnerOrHasPermission(): boolean {
		return this.isOwner || this.hasPermission;
	}

	public get hasPermission(): boolean {
		return true;
	}

	public get isOwner(): boolean {
		return this.userId === this.u.user?.id;
	}

	public updatePicture(output: base64) {
		this.profilePicture = output;
	}

	public updateBanner(output: base64) {
		this.profileBanner = output;
	}

	public getUserData(user_id: number): void {
		this.http
			.get(`${environment.API_URL}/users/picture/${user_id}`, {
				headers: DEFAULT_HEADERS,
				responseType: 'arraybuffer',
			})
			.subscribe({
				next: (data) => {
					this.profilePicture = data.toBase64();
				},
				error: () => {
					// do nothing (default picture will be used)
				},
			});

		this.http
			.get(`${environment.API_URL}/users/banner/${user_id}`, {
				headers: DEFAULT_HEADERS,
				responseType: 'arraybuffer',
			})
			.subscribe({
				next: (data) => {
					this.profileBanner = data.toBase64();
				},
				error: () => {
					// do nothing (default picture will be used)
				},
			});

		this.apollo
			.query<Objected<PublicUserObject>>({
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
			.subscribe(({ data, error }) => {
				if (data) {
					this.user = data['user'];
					const TimeDiff = Math.abs(Date.now() - new Date(this.user?.birthday ?? 0).getTime());
					this.age = Math.floor(TimeDiff / (1000 * 3600 * 24) / 365.25);
				}

				if (!data || error) {
					this.p.router.navigate(['/404']);
				}
			});
	}
}
