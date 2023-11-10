import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonComponentsModule } from './common/common.module';
import { DesktopComponentsModule } from './desktop/desktop.module';
import { MobileComponentsModule } from './mobile/mobile.module';

@NgModule({
	declarations: [],
	exports: [MobileComponentsModule, DesktopComponentsModule, CommonComponentsModule],
	imports: [RouterModule],
})
export class ComponentsModule {}
