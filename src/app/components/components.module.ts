import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MobileComponentsModule } from './mobile/mobile.module';
import { DesktopComponentsModule } from './desktop/desktop.module';
import { CommonComponentsModule } from './common/common.module';

@NgModule({
	declarations: [],
	exports: [MobileComponentsModule, DesktopComponentsModule, CommonComponentsModule],
	imports: [RouterModule],
})
export class ComponentsModule {}
