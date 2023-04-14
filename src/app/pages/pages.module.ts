import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './404/not-found.component';
import { IconsModule } from '../icons/icons.module';
import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
	declarations: [NotFoundComponent, HomeComponent],
	exports: [NotFoundComponent, HomeComponent],
	imports: [IconsModule, ComponentsModule, AppRoutingModule],
})
export class PagesModule {}
