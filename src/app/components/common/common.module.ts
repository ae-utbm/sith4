import { NgModule } from '@angular/core';
import { IconsModule } from './icons/icons.module';
import { SelectComponent } from './select/select.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SideMenuComponent } from './side_menu/side_menu.component';
import { SideMenuOptionsComponent } from './side_menu/side_options/side_options.component';
import { SideMenuProfileComponent } from './side_menu/side_profile/side_profile.component';
import { SideMenuDisconnectedComponent } from './side_menu/side_disconnected/side_disconnected.component';
import { TranslateModule } from '@ngx-translate/core';
import { LangSelectorComponent } from './lang_selector/lang_selector.component';
import { TitleComponent } from './title/title.component';
import { SubtitleComponent } from './subtitle/subtitle.component';
import { ThemeSelectorComponent } from './theme_selector/theme_selector.component';
import { FontSizeSelectorComponent } from './text_size_selector/text_size_selector.component';

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
	],
	imports: [IconsModule, CommonModule, TranslateModule],
})
export class CommonComponentsModule {}
