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
		subscriber_account?: string;
	};
}
