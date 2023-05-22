export interface Token {
	token: string;
	user_id: number;
}

/**
 * Public user object, returned by the API.
 */
export interface PrivateUser {
	birthday?: Date;
	created: Date;
	cursus?: string;
	email?: string;
	first_name: string;
	gender?: string;
	id: number;
	last_name: string;
	last_seen?: Date;
	nickname?: string;
	parent_contact?: string;
	phone?: string;
	promotion?: Promotion;
	pronouns?: string;
	secondary_email?: string;
	specialty?: string;
	subscriber_account?: string;
	subscription?: Date;
	updated: Date;
}

/**
 * Private user object, returned by the API.
 * Basically, it's the same as the public user object, but with all fields required.
 */
export type PublicUser = Partial<PrivateUser> & { id: number; first_name: string; last_name: string };

/**
 * User object, returned by the API.
 * Configurable with the `filter` parameter.
 */
export type User<T> = T extends true ? PrivateUser : PublicUser;

export interface Time {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
	date: Date;
}

export interface Promotion {
	id: number;
	number: number;
	picture?: string;
	created: Date;
	updated: Date;
}
