import { NgModule } from '@angular/core';
import { MobileLangSelectorComponent } from './lang_selector/lang_selector.component';
import { MobileSubtitleComponent } from './subtitle/subtitle.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobileNavbarComponent } from './navbar/navbar.component';
import { MobileHeaderComponent } from './header/header.component';
import { MobileSideMenuComponent } from './side_menu/side_menu.component';
import { MobileTitleComponent } from './title/title.component';
import { MobileThemeSelectorComponent } from './theme_selector/theme_selector.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		MobileLangSelectorComponent,
		MobileSubtitleComponent,
		MobileTitleComponent,
		MobileHeaderComponent,
		MobileNavbarComponent,
		MobileSideMenuComponent,
		MobileThemeSelectorComponent,
	],
	exports: [
		MobileLangSelectorComponent,
		MobileSubtitleComponent,
		MobileTitleComponent,
		MobileHeaderComponent,
		MobileNavbarComponent,
		MobileSideMenuComponent,
		MobileThemeSelectorComponent,
	],
	imports: [CommonModule, CommonComponentsModule, TranslateModule, RouterModule],
})
export class MobileComponentsModule {}
