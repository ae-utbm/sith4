import { environment as devEnv, Environment } from './environment.dev';

export const environment: Environment = Object.merge(devEnv, {
	PRODUCTION: true,
});
