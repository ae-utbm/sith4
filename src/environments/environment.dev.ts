export const environment = {
	PRODUCTION: false,
	HCAPTCHA_SITE_KEY: '10000000-ffff-ffff-ffff-000000000001',
	API_URL: 'http://localhost:3000',
	DELAY_UPDATE_PROFILE_PICTURE: 604800,

	USERS: {
		MIN_AGE: 13,
		MAX_AGE: 100,

		MIN_NAME_LENGTH: 2,
		MAX_NAME_LENGTH: 50,

		MIN_PASSWORD_LENGTH: 8,
	},
};

export type Environment = typeof environment;
