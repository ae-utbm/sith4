import type { PERMISSION_NAMES } from '#types/api';

import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class UserPermissionService {
	public permissions: PERMISSION_NAMES[] = [];
	public ready$ = new Subject<boolean>();
	public ready = false;

	public constructor(@Inject(UserService) private readonly user: UserService) {
		this.fetchPermissions();
	}

	public fetchPermissions(): void {
		// this.apollo
		// 	.query<{ getPermissionsOfUser: UserPermission[] }>({
		// 		query: gql`
		// 			query ($user_id: Int!) {
		// 				getPermissionsOfUser(id: $user_id) {
		// 					name
		// 					created
		// 					expires
		// 					revoked
		// 				}
		// 			}
		// 		`,
		// 		variables: {
		// 			user_id: parseInt(sessionStorage.getItem('user_id') || '0', 10),
		// 		},
		// 		fetchPolicy: 'cache-first',
		// 		errorPolicy: 'all',
		// 	})
		// 	.subscribe(({ data }) => {
		// 		if (data) {
		// 			for (const permission of data['getPermissionsOfUser']) {
		// 				if (permission.revoked || permission.expires < new Date()) continue;
		// 				this.permissions.set(permission.name, permission);
		// 			}
		// 		}
		// 		this.ready$.next(true);
		// 		this.ready = true;
		// 	});
	}

	/**
	 * Check if the user has a given permission
	 * @param {UserPermission['name']} name The name of the permission
	 * @returns {boolean} true if the user has the permission or if the user is root
	 */
	public hasPermission(name: PERMISSION_NAMES): boolean {
		return this.permissions.includes('ROOT') || this.permissions.includes(name);
	}

	/**
	 * Determines if the user can read the private information of another user
	 * @param {number} id The id which is being checked (target id)
	 * @returns {Promise<boolean>} true if the user can read the private information of another user or if the user is itself
	 */
	public async canReadPrivateUser(id: number): Promise<boolean> {
		if (this.ready)
			return this.user.isLoggedIn() && (this.hasPermission('CAN_READ_USER_PRIVATE') || this.user.logged_user_id === id);

		await new Promise<void>((resolve) => {
			this.ready$.subscribe(() => resolve());
		});

		return this.user.isLoggedIn() && (this.hasPermission('CAN_READ_USER_PRIVATE') || this.user.logged_user_id === id);
	}
}
