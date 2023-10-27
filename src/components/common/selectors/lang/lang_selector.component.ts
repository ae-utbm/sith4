import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { SelectComponentOption } from '@__old/types';
import { PageService } from '@services/page.service';
import { getLanguageCompletion, LANGUAGES } from '@utils/i18n';

@Component({
	selector: 'sith-lang-selector',
	templateUrl: './lang_selector.html',
	styleUrls: ['./lang_selector.scss'],
})
export class LangSelectorComponent implements OnInit {
	public langs: SelectComponentOption[] = LANGUAGES.map((lang) => ({
		value: lang.filename,
		label: lang.label,
		image: lang.image,
	}));

	public langsCompletion: Array<[string, Observable<number>]> = this.langs.map((lang) => [
		lang.label,
		getLanguageCompletion(lang.value),
	]);

	public constructor(
		@Inject(PageService) public readonly page: PageService,
		@Inject(TranslateService) public readonly t: TranslateService,
	) {}

	public ngOnInit(): void {
		this.langsCompletion.forEach(([lang, completion$]) => {
			completion$.subscribe((completion) => {
				const found: SelectComponentOption | undefined = this.langs.find((l) => l.label === lang);
				if (found) found.label = `${lang} (${completion}%)`;
			});
		});
	}

	public get selection(): SelectComponentOption {
		return (
			LANGUAGES.map((lang) => ({
				label: lang.label,
				value: lang.filename,
				image: lang.image,
			})).find((lang) => lang.value === this.page.lang) ?? {
				label: 'English',
				value: 'en-US',
				image: 'assets/flags/en-GB.svg',
			}
		);
	}
}
