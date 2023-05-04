import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/404/not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ForgotPasswordComponent } from './components/pages/forgot_password/forgot_password.component';
import { UserPaymentsComponent } from './components/pages/user/payments/payments.component';
import { UserPicturesComponent } from './components/pages/user/pictures/pictures.component';
import { UserProfileComponent } from './components/pages/user/profile/profile.component';

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
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: 'forgot_password',
		component: ForgotPasswordComponent,
	},
	{
		path: ':id',
		children: [
			{
				path: 'profile',
				component: UserProfileComponent,
			},
			{
				path: 'pictures',
				component: UserPicturesComponent,
			},
			{
				path: 'payments',
				component: UserPaymentsComponent,
			},
		],
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
