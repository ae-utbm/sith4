import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as LANGS from '../../../assets/i18n/languages.json';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent {
  lang = this.translate.currentLang ?? 'en-US';
  langs = (LANGS as any).default;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Select a language and redirect to the same page
   * @param {Event} event
   */
  public selectLangage(event: Event): void {
    // Get selected from the event
    this.lang = (event.target as HTMLSelectElement).value;

    // Update router
    this.router.navigateByUrl(
      this.router.url.replace(this.translate.currentLang ?? 'en-US', this.lang)
    );

    // Update lang attribute on html tag
    this.document.documentElement.lang = this.lang;

    // Update translate service
    this.translate.use(this.lang);
  }
}
