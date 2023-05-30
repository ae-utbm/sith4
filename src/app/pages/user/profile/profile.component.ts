import type { base64 } from 'src/types';
import type { PrivateUser, PublicUser } from 'src/types/objects';

import { Component, Inject, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Apollo, gql } from 'apollo-angular';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { UserProfilePictureEditModalComponent } from './picture-modal/picture-edit-modal.component';
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserProfileBannerEditModalComponent } from './banner-modal/banner-edit-modal.component';
import { DEFAULT_HEADERS } from 'src/utils/http';
import { UserPermissionService } from 'src/app/services/user-permissions.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
})
export class UserProfileComponent {
	public currentTab: 'about' | 'contact' = 'about';
	public user?: PrivateUser | PublicUser;
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
	@ViewChild('infosModal', { static: false }) public infosModal!: UserProfileBannerEditModalComponent;

	public constructor(
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(HttpClient) private readonly http: HttpClient,
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly page: PageService,
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(UserPermissionService) public readonly perms: UserPermissionService,
		private activeRoute: ActivatedRoute,
	) {
		this.activeRoute.params.subscribe((params) => {
			this.userId = parseInt(params['id'], 10);

			if (this.perms.ready) this.getUserData(this.userId);
			else this.perms.ready$.subscribe(() => this.getUserData(this.userId));
		});
	}

	public get nickname(): string {
		if (!this.user?.nickname) return '';
		return `${this.user?.nickname} —`;
	}

	/**
	 * Returns true if the current user is the owner of the profile or has the permission to edit it.
	 * @returns {boolean} True if the current user is the owner of the profile or has the permission to edit it.
	 */
	public get isOwnerOrHasPermission(): boolean {
		return this.isOwner || this.perms.hasPermission('EDIT_USER');
	}

	public get shouldSeePrivateData(): boolean {
		return !this.isOwner && this.perms.hasPermission('EDIT_USER');
	}

	public get isOwner(): boolean {
		return this.userId === this.u.id;
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
					this.profilePicture = undefined;
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
					this.profileBanner = undefined;
				},
			});

		const endpoint = this.shouldSeePrivateData ? 'userPrivate' : 'userPublic';

		this.apollo
			.query<{ userPublic: PublicUser; userPrivate: PrivateUser }>({
				query: gql`
					query ($user_id: Int!) {
						${endpoint}(id: $user_id) {
							id
							first_name
							last_name
							nickname
							cursus
							gender
							birthday
							promotion {
								number
								id
							}
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
					switch (endpoint) {
						case 'userPrivate':
							this.user = data['userPrivate'];
							break;

						default:
							this.user = data['userPublic'];
							break;
					}

					const TimeDiff = Math.abs(Date.now() - new Date(this.user?.birthday ?? 0).getTime());
					this.age = Math.floor(TimeDiff / (1000 * 3600 * 24) / 365.25);
					this.currentTab = 'about';
					this.t.get('profile.title', { name: this.user.first_name }).subscribe((title) => (this.page.title = title));
				}

				if (!data || error) {
					this.page.route = '/404';
				}
			});
	}
}
