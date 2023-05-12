export interface LoginObject {
	login: {
		token: string;
		user_id: number;
	};
}

export interface RegisterObject {
	register: {
		token: string;
		user_id: number;
	};
}

export interface UserObject {
	user: {
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
	};
}

export interface PromotionObject {
	promotion: {
		id: number;
		number: number;
		picture?: string;
		created: Date;
		updated: Date;
	};
}
