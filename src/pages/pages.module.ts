import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgHcaptchaModule } from 'ng-hcaptcha';

import { NotFoundComponent } from './404/not-found.component';
import { ForgotPasswordComponent } from './forgot_password/forgot_password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserPageModule } from './user/profile/profile.module';
import { VerifyComponent } from './verify/verify.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
	declarations: [
		NotFoundComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		VerifyComponent,
	],
	exports: [
		NotFoundComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		VerifyComponent,
	],
	imports: [
		FormsModule,
		CommonModule,
		TranslateModule,
		NgHcaptchaModule,
		UserPageModule,
		ReactiveFormsModule,
		ComponentsModule,
	],
})
export class PagesModule {}
