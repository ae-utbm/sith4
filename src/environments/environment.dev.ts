export const environment = {
	PRODUCTION: false,
	REGISTER_AGE_MIN: 13,
	REGISTER_AGE_MAX: 100,
	HCAPTCHA_SITE_KEY: '10000000-ffff-ffff-ffff-000000000001',
	API_URL: 'http://localhost:3000/api',
	GRAPHQL_URL: 'http://localhost:3000/graphql',
};

export type Environment = typeof environment;
