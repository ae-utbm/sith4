import { NgModule } from '@angular/core';
import { MobileLangSelectorComponent } from './lang-selector/lang-selector.component';
import { MobileSubtitleComponent } from './subtitle/subtitle.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobileMenuNavbarComponent } from './navbar/navbar.component';
import { MobileNavbarComponent } from './header/header.component';

@NgModule({
	declarations: [
		MobileLangSelectorComponent,
		MobileSubtitleComponent,
		MobileMenuNavbarComponent,
		MobileNavbarComponent,
	],
	exports: [MobileLangSelectorComponent, MobileSubtitleComponent, MobileMenuNavbarComponent, MobileNavbarComponent],
	imports: [CommonModule, CommonComponentsModule, TranslateModule],
})
export class MobileComponentsModule {}
