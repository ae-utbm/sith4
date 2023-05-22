type Objected<T extends Record<string, unknown>> = {
	[K in keyof T]: T[K];
};

export interface Token {
	token: string;
	user_id: number;
}

/**
 * Public user object, returned by the API.
 */
export interface PublicUser {
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
	promotion?: number;
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
export type PrivateUser = Required<PublicUser>;

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
