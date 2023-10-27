import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MobileHeaderComponent } from './header/header.component';
import { MobileNavbarComponent } from './navbar/navbar.component';
import { CommonComponentsModule } from '../common/common.module';

@NgModule({
	declarations: [MobileHeaderComponent, MobileNavbarComponent],
	exports: [MobileHeaderComponent, MobileNavbarComponent],
	imports: [CommonModule, CommonComponentsModule, TranslateModule, RouterModule],
})
export class MobileComponentsModule {}
