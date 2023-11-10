import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '@components/components.module';

import { UserProfileDesktopComponent } from './desktop/profile-desktop.component';
import { UserProfileMobileComponent } from './mobile/profile-mobile.component';
import { UserProfileBannerEditModalComponent } from './modals/banner-modal/banner-edit-modal.component';
import { UserProfileInfosEditModalComponent } from './modals/infos-modal/infos-edit-modal.component';
import { UserProfilePictureEditModalComponent } from './modals/picture-modal/picture-edit-modal.component';
import { UserProfileComponent } from './profile.component';

@NgModule({
	declarations: [
		UserProfileComponent,
		UserProfilePictureEditModalComponent,
		UserProfileBannerEditModalComponent,
		UserProfileInfosEditModalComponent,
		UserProfileDesktopComponent,
		UserProfileMobileComponent,
	],
	exports: [
		UserProfileComponent,
		UserProfilePictureEditModalComponent,
		UserProfileBannerEditModalComponent,
		UserProfileInfosEditModalComponent,
		UserProfileDesktopComponent,
		UserProfileMobileComponent,
	],
	imports: [FormsModule, CommonModule, ComponentsModule, ReactiveFormsModule, TranslateModule],
})
export class UserPageModule {}
