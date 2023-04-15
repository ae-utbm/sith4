import { NgModule } from '@angular/core';
import { IconExpandLessComponent } from './expand_less/expand_less';
import { IconExpandMoreComponent } from './expand_more/expand_more';

@NgModule({
	declarations: [IconExpandLessComponent, IconExpandMoreComponent],
	exports: [IconExpandLessComponent, IconExpandMoreComponent],
	imports: [],
})
export class IconsModule {}
