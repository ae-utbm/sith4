import type { PERMISSION_NAMES, PermissionGetDto, UserPermissionsGetDto, UserRolesGetDto } from '#types/api';

import { Inject, Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

import { APIService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class PermissionService {
	public constructor(@Inject(APIService) private readonly api: APIService) {}

	public userPermissions(id: number): Observable<PermissionGetDto> {
		return this.api.get<PermissionGetDto>(`/permissions/${id}`);
	}

	// FIXME Move that to the API !!
	// it might be better to check if the user has the permission on the server side (instead of piping)
	// -> this avoid useless requests as the result of this method might decided if another request (with required perms)
	//    is made or not
	public hasPermissions(id: number, permissions: PERMISSION_NAMES[]): Observable<Record<PERMISSION_NAMES, boolean>> {
		return this.api.get<UserPermissionsGetDto[]>(`/users/${id}/permissions`).pipe(
			switchMap((perms) => {
				return this.api.get<UserRolesGetDto[]>(`/users/${id}/roles`).pipe(map((roles) => ({ perms, roles })));
			}),
			map((res) => {
				const out: Record<string, boolean> = {};

				const userPerms = [
					...res.perms.filter((p) => p.revoked !== true).map((p) => p.name),
					...res.roles
						.filter((p) => p.revoked !== true)
						.map((p) => p.permissions)
						.flat(),
				].unique();

				if (userPerms.includes('ROOT')) permissions.forEach((p) => (out[p] = true));
				else permissions.forEach((p) => (out[p] = userPerms.includes(p)));

				return out as Record<PERMISSION_NAMES, boolean>;
			}),
		);
	}
}
