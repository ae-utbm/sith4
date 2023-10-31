import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

export type ApiError<T> = Omit<HttpErrorResponse, 'error'> & { error: T };
export type Endpoint = `/${string}`;

interface ResponseTypeMap {
	arraybuffer: ArrayBuffer;
	blob: Blob;
	text: string;
}

export type ResponseType<T> = {
	[K in keyof ResponseTypeMap]: ResponseTypeMap[K] extends T ? K : never;
}[keyof ResponseTypeMap];

type ResponseTypeKeys = keyof ResponseTypeMap | 'json';
type ResponseTypes = ResponseTypeMap[keyof ResponseTypeMap];

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

	/**
	 * Send a GET request to the API
	 * @param url API endpoint, starting with a slash
	 * @param responseType Response type, default to 'json'
	 * @returns An observable of the response
	 */
	public get<Res extends object>(
		url: Endpoint,
		responseType?: 'json',
	): Res extends ResponseTypes ? never : Observable<Res>;

	/**
	 * Send a GET request to the API, with a specific response type
	 * @param url API endpoint, starting with a slash
	 * @param responseType Response type
	 * @returns An observable of the response
	 *
	 * @remark generic type 'Res' should be one of the following: ArrayBuffer, Blob, string
	 */
	public get<Res, ResType = Res extends ResponseTypes ? ResponseType<Res> : never>(
		url: Endpoint,
		responseType: ResType,
	): Observable<Res>;

	public get<R>(url: Endpoint, responseType: ResponseTypeKeys = 'json'): Observable<R> {
		return this.http.get<R>(url, { headers: this.DEFAULT_HEADERS, responseType: responseType as 'json' });
	}

	/**
	 * Send a POST request to the API
	 * @param url API endpoint, starting with a slash
	 * @param body Request body
	 * @param responseType Response type, default to 'json'
	 */
	public post<Res extends object, Body>(
		url: Endpoint,
		body: Body,
		responseType?: 'json',
	): Res extends ResponseTypes ? never : Observable<Res>;

	/**
	 * Send a POST request to the API
	 * @param url API endpoint, starting with a slash
	 * @param body Request body
	 * @param responseType Response type
	 * @returns An observable of the response
	 *
	 * @remark generic type 'Res' should be one of the following: ArrayBuffer, Blob, string
	 */
	public post<Res, Body, ResType = Res extends ResponseTypes ? ResponseType<Res> : never>(
		url: Endpoint,
		body: Body,
		responseType: ResType,
	): Observable<Res>;

	public post<R, B>(url: Endpoint, body: B, responseType: ResponseTypeKeys = 'json'): Observable<R> {
		return this.http.post<R>(`${environment.API_URL}${url}`, body, {
			headers: this.DEFAULT_HEADERS,
			responseType: responseType as 'json',
		});
	}

	/**
	 * Send a PUT request to the API
	 * @param url API endpoint, starting with a slash
	 * @param body Request body
	 * @param responseType Response type, default to 'json'
	 */
	public put<Res extends object, Body>(
		url: Endpoint,
		body: Body,
		responseType?: 'json',
	): Res extends ResponseTypes ? never : Observable<Res>;

	/**
	 * Send a PUT request to the API
	 * @param url API endpoint, starting with a slash
	 * @param body Request body
	 * @param responseType Response type
	 * @returns An observable of the response
	 *
	 * @remark generic type 'Res' should be one of the following: ArrayBuffer, Blob, string
	 */
	public put<Res, Body, ResType = Res extends ResponseTypes ? ResponseType<Res> : never>(
		url: Endpoint,
		body: Body,
		responseType: ResType,
	): Observable<Res>;

	public put<R, B>(url: Endpoint, body: B, responseType: ResponseTypeKeys = 'json'): Observable<R> {
		return this.http.put<R>(`${environment.API_URL}${url}`, body, {
			headers: this.DEFAULT_HEADERS,
			responseType: responseType as 'json',
		});
	}

	/**
	 * Send a PATCH request to the API
	 * @param url API endpoint, starting with a slash
	 * @param body Request body
	 * @param responseType Response type, default to 'json'
	 */
	public patch<Res extends object, Body>(
		url: Endpoint,
		body: Body,
		responseType?: 'json',
	): Res extends ResponseTypes ? never : Observable<Res>;

	/**
	 * Send a PATCH request to the API
	 * @param url API endpoint, starting with a slash
	 * @param body Request body
	 * @param responseType Response type
	 * @returns An observable of the response
	 *
	 * @remark generic type 'Res' should be one of the following: ArrayBuffer, Blob, string
	 */
	public patch<Res, Body, ResType = Res extends ResponseTypes ? ResponseType<Res> : never>(
		url: Endpoint,
		body: Body,
		responseType: ResType,
	): Observable<Res>;

	public patch<R, B>(url: Endpoint, body: B, responseType: ResponseTypeKeys = 'json'): Observable<R> {
		return this.http.patch<R>(`${environment.API_URL}${url}`, body, {
			headers: this.DEFAULT_HEADERS,
			responseType: responseType as 'json',
		});
	}

	/**
	 * Send a DELETE request to the API
	 * @param url API endpoint, starting with a slash
	 * @param body Request body
	 * @param responseType Response type, default to 'json'
	 */
	public delete<Res extends object, Body>(
		url: Endpoint,
		responseType?: 'json',
		body?: Body,
	): Res extends ResponseTypes ? never : Observable<Res>;

	/**
	 * Send a DELETE request to the API
	 * @param url API endpoint, starting with a slash
	 * @param body Request body
	 * @param responseType Response type
	 * @returns An observable of the response
	 *
	 * @remark generic type 'Res' should be one of the following: ArrayBuffer, Blob, string
	 */
	public delete<Res, Body, ResType = Res extends ResponseTypes ? ResponseType<Res> : never>(
		url: Endpoint,
		responseType: ResType,
		body?: Body,
	): Observable<Res>;

	public delete<R, B>(url: Endpoint, responseType: ResponseTypeKeys = 'json', body?: B): Observable<R> {
		return this.http.delete<R>(`${environment.API_URL}${url}`, {
			headers: this.DEFAULT_HEADERS,
			responseType: responseType as 'json',
			body,
		});
	}

	public head<R>(url: Endpoint): Observable<R> {
		return this.http.head<R>(`${environment.API_URL}${url}`, { headers: this.DEFAULT_HEADERS });
	}

	public options<R>(url: Endpoint): Observable<R> {
		return this.http.options<R>(`${environment.API_URL}${url}`, { headers: this.DEFAULT_HEADERS });
	}
}
