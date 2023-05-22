import { Inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { UserPermission } from 'src/types/objects';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class UserPermissionService {
	public permissions = new Map<UserPermission['name'], UserPermission>();
	public ready$ = new Subject<boolean>();
	public ready = false;

	public constructor(
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(UserService) private readonly user: UserService,
	) {
		this.fetchPermissions();
	}

	public async fetchPermissions(): Promise<void> {
		this.apollo
			.query<{ getPermissionsOfUser: UserPermission[] }>({
				query: gql`
					query ($user_id: Int!) {
						getPermissionsOfUser(id: $user_id) {
							name
							created
							expires
							revoked
						}
					}
				`,
				variables: {
					user_id: parseInt(sessionStorage.getItem('user_id') || '0', 10),
				},
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			})
			.subscribe(({ data }) => {
				if (data) {
					for (const permission of data['getPermissionsOfUser']) {
						if (permission.revoked || permission.expires < new Date()) continue;
						this.permissions.set(permission.name, permission);
					}
				}

				this.ready$.next(true);
				this.ready = true;
			});
	}

	/**
	 * Check if the user has a given permission
	 * @param {UserPermission['name']} name The name of the permission
	 * @returns {boolean} true if the user has the permission or if the user is root
	 */
	public hasPermission(name: UserPermission['name']): boolean {
		return this.permissions.has('ROOT') || this.permissions.has(name);
	}

	/**
	 * Determines if the user can read the private information of another user
	 * @param {number} id The id which is being checked (target id)
	 * @returns {Promise<boolean>} true if the user can read the private information of another user or if the user is itself
	 */
	public async canReadPrivateUser(id: number): Promise<boolean> {
		if (this.ready) return this.user.isLoggedIn && (this.hasPermission('CAN_READ_USER_PRIVATE') || this.user.id === id);

		await new Promise<void>((resolve) => {
			this.ready$.subscribe(() => resolve());
		});

		return this.user.isLoggedIn && (this.hasPermission('CAN_READ_USER_PRIVATE') || this.user.id === id);
	}
}
