import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '../common/common.module';

@NgModule({
	declarations: [],
	exports: [],
	imports: [CommonModule, CommonComponentsModule, TranslateModule],
})
export class DesktopComponentsModule {}
