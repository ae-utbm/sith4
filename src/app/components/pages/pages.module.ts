import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './404/not-found.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common.module';
import { MobileComponentsModule } from '../mobile/mobile.module';
import { TranslateModule } from '@ngx-translate/core';
import { DesktopComponentsModule } from '../desktop/desktop.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot_password/forgot_password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { UserPaymentsComponent } from './user/payments/payments.component';
import { UserProfileComponent } from './user/profile/profile.component';
import { UserPicturesComponent } from './user/pictures/pictures.component';
import { UserProfilePictureEditModalComponent } from './user/profile/picture/picture-edit-modal.component';
import { UserProfileBannerEditModalComponent } from './user/profile/banner/banner-edit-modal.component';

@NgModule({
	declarations: [
		NotFoundComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
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
		CommonComponentsModule,
		MobileComponentsModule,
		DesktopComponentsModule,
	],
})
export class PagesModule {}
