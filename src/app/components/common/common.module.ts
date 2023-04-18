import { NgModule } from '@angular/core';
import { IconsModule } from './icons/icons.module';
import { SelectComponent } from './select/select.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [SelectComponent],
	exports: [IconsModule, SelectComponent],
	imports: [IconsModule, CommonModule],
})
export class CommonComponentsModule {}
