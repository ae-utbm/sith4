import { environment as devEnv, Environment } from './environment.dev';

export const environment: Environment = Object.merge(devEnv, {
	PRODUCTION: true,
	HCAPTCHA_SITE_KEY: '', // TODO: Add hCaptcha site key (log with the github bot account)
});
