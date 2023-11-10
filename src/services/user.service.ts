import type { email, imageURL } from '#types';
import type {
	OutputErrorResponseDto,
	OutputFileDto,
	OutputUserDto,
	OutputResponseDto,
	OutputTokenDto,
	InputSignInDto,
} from '#types/api';

import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { APIService, ApiError } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public constructor(@Inject(APIService) private readonly api: APIService) {}

	public login(email: email, password: string): Observable<void> {
		return this.api
			.post<OutputTokenDto, InputSignInDto>(`/auth/login`, {
				email,
				password,
			})
			.pipe(
				tap((data) => {
					sessionStorage.setItem('user_token', data.token);
					sessionStorage.setItem('user_id', data.user_id.toString());
				}),
				map(() => void 0),
			);
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

	public logout(): Observable<void> {
		return new Observable((subscriber) => {
			sessionStorage.clear();

			subscriber.next();
			subscriber.complete();
		});
	}

	public user(id: number, private_data = false): Observable<OutputUserDto> {
		if (private_data) return this.api.get<OutputUserDto>(`/users/${id}/data`);
		return this.api.get<OutputUserDto>(`/users/${id}/data/public`);
	}

	public userPicture(id: number): Observable<imageURL | undefined> {
		return this.api.get<ArrayBuffer>(`/users/${id}/picture`, 'arraybuffer').pipe(
			catchError((err: ApiError<ArrayBuffer>) => {
				const error: OutputResponseDto = err.error.toJSON();

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

	public updateUserPicture(user_id: number, form: FormData): Observable<OutputFileDto> {
		return this.api.post<OutputFileDto, FormData>(`/users/${user_id}/picture`, form);
	}

	public deleteUserPicture(user_id: number): Observable<OutputResponseDto> {
		return this.api.delete<OutputResponseDto, never>(`/users/${user_id}/picture`);
	}

	public userBanner(id: number): Observable<imageURL | undefined> {
		return this.api.get<ArrayBuffer>(`/users/${id}/banner`, 'arraybuffer').pipe(
			catchError((err: ApiError<ArrayBuffer>) => {
				const error: OutputErrorResponseDto = err.error.toJSON();

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

	public updateUserBanner(user_id: number, form: FormData): Observable<OutputFileDto> {
		return this.api.post<OutputFileDto, FormData>(`/users/${user_id}/banner`, form);
	}

	public deleteUserBanner(user_id: number): Observable<OutputResponseDto> {
		return this.api.delete<OutputResponseDto, never>(`/users/${user_id}/banner`);
	}

	public userFileData(file_id: number): Observable<OutputFileDto> {
		return this.api.get<OutputFileDto>(`/files/${file_id}/data`);
	}

	// TODO: to be implemented (waiting for API)
	// maybe in its own service ?
	public userNotifications(id: number): Observable<[]> {
		console.warn('NYI: userNotifications', id);

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
