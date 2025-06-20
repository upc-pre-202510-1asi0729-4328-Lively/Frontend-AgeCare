import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  currentLang: string = 'en';
  languages: string[] = ['en', 'es'];

  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang || 'en';
    // Forzar idioma por defecto a inglés si no está definido
    if (!translate.currentLang) {
      translate.setDefaultLang('en');
      translate.use('en');
      this.currentLang = 'en';
    }
  }

  useLanguage(language: string) : void {
    this.translate.use(language);
    this.currentLang = language;
  }
}
