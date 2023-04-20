import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [],
	exports: [PagesModule],
	imports: [RouterModule],
})
export class ComponentsModule {}
