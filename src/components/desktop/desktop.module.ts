import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DesktopHeaderComponent } from './header/header.component';
import { DesktopNavbarComponent } from './navbar/navbar.component';
import { CommonComponentsModule } from '../common/common.module';

@NgModule({
	declarations: [DesktopHeaderComponent, DesktopNavbarComponent],
	exports: [DesktopHeaderComponent, DesktopNavbarComponent],
	imports: [CommonModule, CommonComponentsModule, TranslateModule],
})
export class DesktopComponentsModule {}
