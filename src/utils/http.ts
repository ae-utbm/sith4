/**
 * Default headers for all requests
 */
export const DEFAULT_HEADERS: { [key: string]: string | string[] } = {
	Authorization: `${sessionStorage.getItem('token')}`,
	'Accept-Language': localStorage.getItem('lang') ?? 'en-US',
};
