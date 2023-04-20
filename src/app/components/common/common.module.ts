import { NgModule } from '@angular/core';
import { IconsModule } from './icons/icons.module';
import { SelectComponent } from './select/select.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';

@NgModule({
	declarations: [SelectComponent, ButtonComponent],
	exports: [IconsModule, SelectComponent, ButtonComponent],
	imports: [IconsModule, CommonModule],
})
export class CommonComponentsModule {}
