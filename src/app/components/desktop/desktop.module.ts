import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '../common/common.module';
import { DesktopHeaderComponent } from './header/header.component';
import { DesktopNavbarComponent } from './navbar/navbar.component';
import { DesktopAlertComponent } from './alert/alert.component';

@NgModule({
	declarations: [DesktopHeaderComponent, DesktopNavbarComponent, DesktopAlertComponent],
	exports: [DesktopHeaderComponent, DesktopNavbarComponent, DesktopAlertComponent],
	imports: [CommonModule, CommonComponentsModule, TranslateModule],
})
export class DesktopComponentsModule {}
