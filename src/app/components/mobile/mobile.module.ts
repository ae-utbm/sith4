import { NgModule } from '@angular/core';
import { MobileLangSelectorComponent } from './lang-selector/lang-selector.component';
import { MobileSubtitleComponent } from './subtitle/subtitle.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [MobileLangSelectorComponent, MobileSubtitleComponent],
	exports: [MobileLangSelectorComponent, MobileSubtitleComponent],
	imports: [CommonModule, CommonComponentsModule, TranslateModule],
})
export class MobileComponentsModule {}
