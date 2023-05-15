export type Objected<T> = {
	[key: string]: T;
};

export interface TokenObject {
	token: string;
	user_id: number;
}

export interface UserObject {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	birthday: Date;
	nickname?: string;
	gender?: string;
	cursus?: string;
	promotion?: number;
	specialty?: string;
	pronouns?: string;
	subscriber_account?: string;
	created: Date;
	updated: Date;
	last_seen: Date;
	subscription: Date;
}

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
