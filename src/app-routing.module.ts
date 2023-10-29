import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '@pages/404/not-found.component';
import { ForgotPasswordComponent } from '@pages/forgot_password/forgot_password.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { UserPaymentsComponent } from '@pages/user/payments/payments.component';
import { UserPicturesComponent } from '@pages/user/pictures/pictures.component';
import { UserProfileComponent } from '@pages/user/profile/profile.component';
import { UserPermissionService } from '@services/user-permissions.service';
import { UserService } from '@services/user.service';

export type RouteData = {
	full_width?: boolean;
	headless?: boolean;
	title?: string;
};

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeComponent,
		data: {
			title: 'home.title',
		},
	},
	{
		path: '404',
		component: NotFoundComponent,
		data: {
			headless: true,
			title: '404.title',
		},
	},
	{
		path: 'login',
		canActivate: [() => !inject(UserService).isLoggedIn],
		component: LoginComponent,
		data: {
			headless: true,
			title: 'login.title',
		},
	},
	{
		path: 'register',
		canActivate: [() => !inject(UserService).isLoggedIn],
		component: RegisterComponent,
		data: {
			headless: true,
			title: 'register.title',
		},
	},
	{
		path: 'forgot_password',
		canActivate: [() => !inject(UserService).isLoggedIn],
		component: ForgotPasswordComponent,
		data: {
			headless: true,
			title: 'forgot_password.title',
		},
	},
	{
		path: 'users',
		canActivate: [() => inject(UserService).isLoggedIn],
		children: [
			{
				path: ':id',
				children: [
					{
						path: '',
						redirectTo: 'profile',
						pathMatch: 'prefix',
					},
					{
						path: 'profile',
						component: UserProfileComponent,
						pathMatch: 'full',
					},
					{
						path: 'pictures',
						component: UserPicturesComponent,
					},
					// {
					// 	path: 'payments',
					// 	component: UserPaymentsComponent,
					// 	canActivate: [
					// 		(route: ActivatedRouteSnapshot) =>
					// 		inject(UserPermissionService).canReadPrivateUser(parseInt(route.params['id'], 10)),
					// 	],
					// },
				],
			},
		],
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
