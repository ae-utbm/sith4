import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './button/button.component';
import { FileInputComponent } from './file_input/file-input.component';
import { IconsModule } from './icons/icons.module';
import { ImageCropperComponent } from './image_cropper/image-cropper.component';
import { SelectComponent } from './selectors/select/select.component';
import { FontSizeSelectorComponent } from './selectors/font_size/font_size_selector.component';
import { LangSelectorComponent } from './selectors/lang/lang_selector.component';
import { ThemeSelectorComponent } from './selectors/theme/theme_selector.component';
import { SideMenuDisconnectedComponent } from './side_menu/side_disconnected/side_disconnected.component';
import { SideMenuComponent } from './side_menu/side_menu.component';
import { SideMenuOptionsComponent } from './side_menu/side_options/side_options.component';
import { SideMenuProfileComponent } from './side_menu/side_profile/side_profile.component';
import { SubtitleComponent } from './subtitle/subtitle.component';
import { TitleComponent } from './title/title.component';

@NgModule({
	declarations: [
		SelectComponent,
		ButtonComponent,
		SideMenuComponent,
		SideMenuOptionsComponent,
		SideMenuProfileComponent,
		SideMenuDisconnectedComponent,
		LangSelectorComponent,
		TitleComponent,
		SubtitleComponent,
		ThemeSelectorComponent,
		FontSizeSelectorComponent,
		ImageCropperComponent,
		FileInputComponent,
	],
	exports: [
		IconsModule,
		SelectComponent,
		ButtonComponent,
		SideMenuComponent,
		SideMenuOptionsComponent,
		SideMenuProfileComponent,
		SideMenuDisconnectedComponent,
		LangSelectorComponent,
		TitleComponent,
		SubtitleComponent,
		ThemeSelectorComponent,
		FontSizeSelectorComponent,
		ImageCropperComponent,
		FileInputComponent,
	],
	imports: [IconsModule, CommonModule, TranslateModule],
})
export class CommonComponentsModule {}
