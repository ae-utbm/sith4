import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobileNavbarComponent } from './navbar/navbar.component';
import { MobileHeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MobileAlertComponent } from './alert/alert.component';

@NgModule({
	declarations: [MobileHeaderComponent, MobileNavbarComponent, MobileAlertComponent],
	exports: [MobileHeaderComponent, MobileNavbarComponent, MobileAlertComponent],
	imports: [CommonModule, CommonComponentsModule, TranslateModule, RouterModule],
})
export class MobileComponentsModule {}
