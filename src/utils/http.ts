/**
 * Default headers for all requests
 */
export const DEFAULT_HEADERS: { [key: string]: string | string[] } = {
	Authorization: `${sessionStorage.getItem('user_token')}`,
	'Accept-Language': localStorage.getItem('lang') ?? 'en-US',
};
