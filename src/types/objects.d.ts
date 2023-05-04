export interface LoginObject {
	login: {
		accessToken: string;
		refreshToken: string;
		user_id: number;
	};
}

export interface UserObject {
	user: {
		first_name: string;
		last_name: string;
		email: string;
		birthday: Date;
		nickname?: string;
		gender?: string;
		cursus?: string;
		promotion?: number;
	};
}
