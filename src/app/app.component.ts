import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sith4';

  constructor(
    private readonly translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en-US');
    const lang = window.location.pathname.split('/')[1] ?? 'en-US';

    this.translate.use(lang);
    this.document.documentElement.lang = lang;
  }
}
