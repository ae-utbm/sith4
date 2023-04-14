import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/404/not-found.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: '404',
		component: NotFoundComponent,
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: '404',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
