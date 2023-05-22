import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/404/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot_password/forgot_password.component';
import { UserPaymentsComponent } from './pages/user/payments/payments.component';
import { UserPicturesComponent } from './pages/user/pictures/pictures.component';
import { UserProfileComponent } from './pages/user/profile/profile.component';
import { UserService } from './services/user.service';
import { UserPermissionService } from './services/user-permissions.service';
import { UsersComponent } from './pages/user/users.component';

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
		path: 'login',
		canActivate: [() => !inject(UserService).isLoggedIn],
		component: LoginComponent,
	},
	{
		path: 'register',
		canActivate: [() => !inject(UserService).isLoggedIn],
		component: RegisterComponent,
	},
	{
		path: 'forgot_password',
		canActivate: [() => !inject(UserService).isLoggedIn],
		component: ForgotPasswordComponent,
	},
	{
		path: 'users',
		canActivate: [() => inject(UserService).isLoggedIn],
		children: [
			{
				path: '',
				component: UsersComponent,
				pathMatch: 'full',
			},
			{
				path: ':id',
				children: [
					{
						path: '',
						component: UserProfileComponent,
						pathMatch: 'full',
					},
					{
						path: 'pictures',
						component: UserPicturesComponent,
					},
					{
						path: 'payments',
						component: UserPaymentsComponent,
						canActivate: [
							(route: ActivatedRouteSnapshot) =>
								inject(UserPermissionService).canReadPrivateUser(parseInt(route.params['id'], 10)),
						],
					},
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
