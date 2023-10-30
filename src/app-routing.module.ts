import { NgModule, inject } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';
import { NotFoundComponent } from '@pages/404/not-found.component';
import { ForgotPasswordComponent } from '@pages/forgot_password/forgot_password.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { UserProfileComponent } from '@pages/user/profile/profile.component';
import { VerifyComponent } from '@pages/verify/verify.component';
import { LangKeys } from '@utils/i18n';

export type RouteData = {
	full_width?: boolean;
	headless?: boolean;
	title?: LangKeys;
};

const routes: Array<Omit<Route, 'data'> & { data?: RouteData }> = [
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
		canActivate: [() => inject(AuthGuard).isLoggedOut()],
		component: LoginComponent,
		data: {
			headless: true,
			title: 'login.title',
		},
	},
	{
		path: 'register',
		canActivate: [() => inject(AuthGuard).isLoggedOut()],
		component: RegisterComponent,
		data: {
			headless: true,
			title: 'register.title',
		},
	},
	{
		path: 'forgot_password',
		canActivate: [() => inject(AuthGuard).isLoggedOut()],
		component: ForgotPasswordComponent,
		data: {
			headless: true,
			title: 'forgot_password.title',
		},
	},
	{
		path: 'verify',
		canActivate: [() => inject(AuthGuard).isLoggedOut()],
		component: VerifyComponent,
		data: {
			headless: true,
			title: 'verify.page_title',
		},
	},
	{
		path: 'users',
		canActivate: [() => inject(AuthGuard).isLoggedIn()],
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
					// {
					// 	path: 'pictures',
					// 	component: UserPicturesComponent,
					// },
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
