import { NgModule } from '@angular/core';
import { MobileLangSelectorComponent } from './lang-selector/lang-selector.component';
import { MobileSubtitleComponent } from './subtitle/subtitle.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobileNavbarComponent } from './navbar/navbar.component';
import { MobileHeaderComponent } from './header/header.component';
import { MobileSideMenuComponent } from './side-menu/side-menu.component';
import { MobileTitleComponent } from './title/title.component';

@NgModule({
	declarations: [
		MobileLangSelectorComponent,
		MobileSubtitleComponent,
		MobileTitleComponent,
		MobileHeaderComponent,
		MobileNavbarComponent,
		MobileSideMenuComponent,
	],
	exports: [
		MobileLangSelectorComponent,
		MobileSubtitleComponent,
		MobileTitleComponent,
		MobileHeaderComponent,
		MobileNavbarComponent,
		MobileSideMenuComponent,
	],
	imports: [CommonModule, CommonComponentsModule, TranslateModule],
})
export class MobileComponentsModule {}
