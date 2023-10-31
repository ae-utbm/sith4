import type { imageURL } from '#types';
import type { ErrorResponseDto } from '#types/api';

import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { APIService, ApiError } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class PromotionService {
	public constructor(@Inject(APIService) private readonly api: APIService) {}

	public promotionPicture(id: number): Observable<imageURL | undefined> {
		return this.api.get<ArrayBuffer>(`/promotions/${id}/logo`, 'arraybuffer').pipe(
			catchError((err: ApiError<ArrayBuffer>) => {
				const error: ErrorResponseDto = err.error.toJSON();

				// If the user has no picture, return undefined
				if (error.statusCode === 404) return of(undefined);

				// If any other error, throw it for later handling
				return throwError(() => ({ error: error }));
			}),
			map((data) => {
				// convert the arraybuffer to blob url
				if (data) return data.toImageURL();

				// If the user has no picture, return undefined
				// (should not happen as we catch the 404 error)
				return undefined;
			}),
		);
	}
}
