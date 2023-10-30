import type { imageURL } from '#types';
import type { ErrorResponseDto, UserPrivateDto, UserPublicDto } from '#types/api';

import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { environment } from '@environments/environment.dev';

import { APIService, ApiError } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public constructor(@Inject(APIService) private readonly api: APIService) {}

	/** @deprecated */
	fetchUserBanner = (id: number) => '';
	/** @deprecated */
	fetchUserPicture = (id: number) => '';
	/** @deprecated */
	fetchUser = (id: number) => '';

	/** @deprecated */
	get picture(): string {
		return '';
	}
	/** @deprecated */
	get banner(): string {
		return '';
	}
	/** @deprecated */
	get fullName(): string {
		return '';
	}
	/** @deprecated */
	get nickname(): string {
		return '';
	}
	/** @deprecated */
	get accountId(): string {
		return '';
	}
	/** @deprecated */
	get birthday(): Date {
		return new Date();
	}
	/** @deprecated */
	get isMinor(): boolean {
		return true;
	}
	/** @deprecated */
	get promotion(): string {
		return '';
	}
	/** @deprecated */
	get balance(): string {
		return '';
	}
	/** @deprecated */
	get notifications(): [] {
		return [];
	}
	/** @deprecated */
	get notificationsCount(): number {
		return 0;
	}

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

	public user(id: number): Observable<UserPublicDto> {
		return this.api.get<UserPublicDto>(`/users/${id}/data/public`);
	}

	public userPrivate(id: number): Observable<UserPrivateDto> {
		return this.api.get<UserPrivateDto>(`/users/${id}/data`);
	}

	public userPicture(id: number): Observable<imageURL | undefined> {
		return this.api.get<ArrayBuffer>(`/users/${id}/picture`, 'arraybuffer').pipe(
			catchError((err: ApiError<ArrayBuffer>) => {
				const error: ErrorResponseDto = err.error.toJSON();

				// If the user has no picture, return undefined
				if (error.statusCode === 404) return of(undefined);

				// If any other error, throw it for later handling
				return throwError(() => error);
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

	public userBanner(id: number): Observable<imageURL | undefined> {
		return this.api.get<ArrayBuffer>(`/users/${id}/banner`, 'arraybuffer').pipe(
			catchError((err: ApiError<ArrayBuffer>) => {
				const error: ErrorResponseDto = err.error.toJSON();

				// If the user has no picture, return undefined
				if (error.statusCode === 404) return of(undefined);

				// If any other error, throw it for later handling
				return throwError(() => error);
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
}
