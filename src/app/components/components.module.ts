import { NgModule } from '@angular/core';
import { SelectComponent } from './any/select/select.component';
import { SubtitleComponent } from './mobile/subtitle/subtitle.component';
import { LangSelectorComponent } from './mobile/lang-selector/lang-selector.component';
import { IconsModule } from '../icons/icons.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [SelectComponent, SubtitleComponent, LangSelectorComponent],
	exports: [SelectComponent, SubtitleComponent, LangSelectorComponent],
	imports: [IconsModule, CommonModule, TranslateModule],
})
export class ComponentsModule {}
