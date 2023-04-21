import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobileNavbarComponent } from './navbar/navbar.component';
import { MobileHeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [MobileHeaderComponent, MobileNavbarComponent],
	exports: [MobileHeaderComponent, MobileNavbarComponent],
	imports: [CommonModule, CommonComponentsModule, TranslateModule, RouterModule],
})
export class MobileComponentsModule {}
