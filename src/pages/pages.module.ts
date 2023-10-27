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
import { UserPaymentsComponent } from './user/payments/payments.component';
import { UserPicturesComponent } from './user/pictures/pictures.component';
import { UserProfileBannerEditModalComponent } from './user/profile/banner-modal/banner-edit-modal.component';
import { UserProfileInfosEditModalComponent } from './user/profile/infos-modal/infos-edit-modal.component';
import { UserProfilePictureEditModalComponent } from './user/profile/picture-modal/picture-edit-modal.component';
import { UserProfileComponent } from './user/profile/profile.component';
import { UsersComponent } from './user/users.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
	declarations: [
		NotFoundComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		UsersComponent,
		UserPaymentsComponent,
		UserProfileComponent,
		UserPicturesComponent,
		UserProfilePictureEditModalComponent,
		UserProfileBannerEditModalComponent,
		UserProfileInfosEditModalComponent,
	],
	exports: [
		NotFoundComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		UsersComponent,
		UserPaymentsComponent,
		UserProfileComponent,
		UserPicturesComponent,
		UserProfilePictureEditModalComponent,
		UserProfileBannerEditModalComponent,
		UserProfileInfosEditModalComponent,
	],
	imports: [
		FormsModule,
		CommonModule,
		TranslateModule,
		NgHcaptchaModule,
		FormsModule,
		ReactiveFormsModule,
		ComponentsModule,
	],
})
export class PagesModule {}
