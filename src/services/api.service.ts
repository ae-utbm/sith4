import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

export type ApiError<T> = Omit<HttpErrorResponse, 'error'> & { error: T };

@Injectable({
	providedIn: 'root',
})
export class APIService {
	public constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

	private readonly DEFAULT_HEADERS = {
		Authorization: `Bearer ${sessionStorage.getItem('user_token') ?? 'invalid'}`,
		'Accept-Language': localStorage.getItem('lang') ?? 'en-US',
		'Content-Type': 'application/json',
	};

	// FIXME fix method overloads (not working properly)

	public get<R extends ArrayBuffer>(url: string, responseType: 'arraybuffer'): Observable<R>;
	public get<R>(url: string, responseType?: 'json'): Observable<R>;

	public get<R>(url: string, responseType = 'json'): Observable<R> {
		if (responseType === 'arraybuffer')
			return this.http.get(`${environment.API_URL}${url}`, {
				headers: this.DEFAULT_HEADERS,
				responseType: 'arraybuffer',
			}) as Observable<R>;

		return this.http.get<R>(`${environment.API_URL}${url}`, { headers: this.DEFAULT_HEADERS });
	}

	public post<R, B>(url: string, body: B) {
		return this.http.post<R>(`${environment.API_URL}${url}`, body, { headers: this.DEFAULT_HEADERS });
	}

	public put<R, B>(url: string, body: B) {
		return this.http.put<R>(`${environment.API_URL}${url}`, body, { headers: this.DEFAULT_HEADERS });
	}

	public delete<R>(url: string) {
		return this.http.delete<R>(`${environment.API_URL}${url}`, { headers: this.DEFAULT_HEADERS });
	}

	public patch<R, B>(url: string, body: B) {
		return this.http.patch<R>(`${environment.API_URL}${url}`, body, { headers: this.DEFAULT_HEADERS });
	}

	public head<R>(url: string) {
		return this.http.head<R>(`${environment.API_URL}${url}`, { headers: this.DEFAULT_HEADERS });
	}

	public options<R>(url: string) {
		return this.http.options<R>(`${environment.API_URL}${url}`, { headers: this.DEFAULT_HEADERS });
	}
}
