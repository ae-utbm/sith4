export const environment = {
	PRODUCTION: false,
	REGISTER_AGE_MIN: 13,
	REGISTER_AGE_MAX: 100,
	HCAPTCHA_SITE_KEY: '10000000-ffff-ffff-ffff-000000000001',
	API_URL: 'http://localhost:3000',
	DELAY_UPDATE_PROFILE_PICTURE: 604800,
};

export type Environment = typeof environment;
