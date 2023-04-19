import { NgModule } from '@angular/core';
import { MobileLangSelectorComponent } from './lang-selector/lang-selector.component';
import { MobileSubtitleComponent } from './subtitle/subtitle.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobileNavbarComponent } from './navbar/navbar.component';
import { MobileHeaderComponent } from './header/header.component';

@NgModule({
	declarations: [MobileLangSelectorComponent, MobileSubtitleComponent, MobileHeaderComponent, MobileNavbarComponent],
	exports: [MobileLangSelectorComponent, MobileSubtitleComponent, MobileHeaderComponent, MobileNavbarComponent],
	imports: [CommonModule, CommonComponentsModule, TranslateModule],
})
export class MobileComponentsModule {}
