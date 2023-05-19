export type Objected<T> = {
	[key: string]: T;
};

export interface TokenObject {
	token: string;
	user_id: number;
}

/**
 * Public user object, returned by the API.
 */
export interface PublicUserObject {
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
export type PrivateUserObject = Required<PublicUserObject>;

/**
 * User object, returned by the API.
 * Configurable with the `filter` parameter.
 */
export type UserObject<T> = T extends true ? PrivateUserObject : PublicUserObject;

export interface DateObject {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
	date: Date;
}

export interface PromotionObject {
	id: number;
	number: number;
	picture?: string;
	created: Date;
	updated: Date;
}
