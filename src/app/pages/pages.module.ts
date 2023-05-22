import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './404/not-found.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot_password/forgot_password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { UserPaymentsComponent } from './user/payments/payments.component';
import { UserProfileComponent } from './user/profile/profile.component';
import { UserPicturesComponent } from './user/pictures/pictures.component';
import { UserProfilePictureEditModalComponent } from './user/profile/picture-modal/picture-edit-modal.component';
import { UserProfileBannerEditModalComponent } from './user/profile/banner-modal/banner-edit-modal.component';
import { ComponentsModule } from '../components/components.module';
import { UsersComponent } from './user/users.component';

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
