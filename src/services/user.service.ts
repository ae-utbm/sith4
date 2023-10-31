import type { imageURL } from '#types';
import type { ErrorResponseDto, UserPictureEntity, UserPrivateDto, UserPublicDto } from '#types/api';

import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { APIService, ApiError } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public constructor(@Inject(APIService) private readonly api: APIService) {}

	public login(token: string, userId: number): void {
		sessionStorage.setItem('user_token', token);
		sessionStorage.setItem('user_id', userId.toString());
	}

	public isLoggedIn(): boolean {
		return sessionStorage.getItem('user_token') !== null && sessionStorage.getItem('user_id') !== null;
	}

	public get logged_user_id(): number {
		const id = sessionStorage.getItem('user_id');
		if (id === null) {
			this.logout();
			return -1; // TODO throw ?
		}

		return parseInt(id, 10);
	}

	public logout(): void {
		sessionStorage.clear();
	}

	public user(id: number, private_data?: boolean): Observable<UserPublicDto | UserPrivateDto>;
	public user(id: number, private_data: true): Observable<UserPrivateDto>;

	public user(id: number, private_data = false): Observable<UserPublicDto> {
		if (private_data) return this.api.get<UserPrivateDto>(`/users/${id}/data`);
		return this.api.get<UserPublicDto>(`/users/${id}/data/public`);
	}

	public userPicture(id: number): Observable<imageURL | undefined> {
		return this.api.get<ArrayBuffer>(`/users/${id}/picture`, 'arraybuffer').pipe(
			catchError((err: ApiError<ArrayBuffer>) => {
				const error: ErrorResponseDto = err.error.toJSON();

				// If the user has no picture, return undefined
				if (error.statusCode === 404) return of(undefined);

				// If any other error, throw it for later handling
				return throwError(() => ({ error: error }));
			}),
			map((data) => {
				// convert the arraybuffer to base64
				if (data) return data.toImageURL();

				// If the user has no picture, return undefined
				// (should not happen as we catch the 404 error)
				return undefined;
			}),
		);
	}

	public userPictureData(file_id: number): Observable<UserPictureEntity<number>> {
		return this.api.get<UserPictureEntity<number>>(`/files/${file_id}/data`);
	}

	public userBanner(id: number): Observable<imageURL | undefined> {
		return this.api.get<ArrayBuffer>(`/users/${id}/banner`, 'arraybuffer').pipe(
			catchError((err: ApiError<ArrayBuffer>) => {
				const error: ErrorResponseDto = err.error.toJSON();

				// If the user has no picture, return undefined
				if (error.statusCode === 404) return of(undefined);

				// If any other error, throw it for later handling
				return throwError(() => ({ error: error }));
			}),
			map((data) => {
				// convert the arraybuffer to base64
				if (data) return data.toImageURL();

				// If the user has no picture, return undefined
				// (should not happen as we catch the 404 error)
				return undefined;
			}),
		);
	}

	// TODO: to be implemented (waiting for API)
	// maybe in its own service ?
	public userNotifications(id: number): Observable<[]> {
		console.warn('NYI: userNotifications');

		return new Observable((subscriber) => {
			subscriber.next([]);
			subscriber.complete();
		});
	}

	// TODO: to be implemented (waiting for API)
	public userNotificationsCount(id: number): Observable<number> {
		console.warn('NYI: userNotificationsCount');

		return new Observable((subscriber) => {
			subscriber.next(id);
			subscriber.complete();
		});
	}
}
