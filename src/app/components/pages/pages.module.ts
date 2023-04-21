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

@NgModule({
	declarations: [NotFoundComponent, HomeComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent],
	exports: [NotFoundComponent, HomeComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent],
	imports: [CommonModule, TranslateModule, CommonComponentsModule, MobileComponentsModule, DesktopComponentsModule],
})
export class PagesModule {}
