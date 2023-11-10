import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app.module';
import '@exported/global/utils';

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
