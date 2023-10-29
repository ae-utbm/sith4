import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

export type ApiError<T> = Omit<HttpErrorResponse, 'error'> & { error: T };

@Injectable({
	providedIn: 'root',
})
export class APIService {
	public constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

	private readonly DEFAULT_HEADERS = {
		Authorization: `${sessionStorage.getItem('user_token') ?? ''}`,
		'Accept-Language': localStorage.getItem('lang') ?? 'en-US',
		'Content-Type': 'application/json',
	};

	public get<R>(url: string) {
		return this.http.get<R>(url, { headers: this.DEFAULT_HEADERS });
	}

	public post<R, B>(url: string, body: B) {
		return this.http.post<R>(url, body, { headers: this.DEFAULT_HEADERS });
	}

	public put<R, B>(url: string, body: B) {
		return this.http.put<R>(url, body, { headers: this.DEFAULT_HEADERS });
	}

	public delete<R>(url: string) {
		return this.http.delete<R>(url, { headers: this.DEFAULT_HEADERS });
	}

	public patch<R, B>(url: string, body: B) {
		return this.http.patch<R>(url, body, { headers: this.DEFAULT_HEADERS });
	}

	public head<R>(url: string) {
		return this.http.head<R>(url, { headers: this.DEFAULT_HEADERS });
	}

	public options<R>(url: string) {
		return this.http.options<R>(url, { headers: this.DEFAULT_HEADERS });
	}
}
