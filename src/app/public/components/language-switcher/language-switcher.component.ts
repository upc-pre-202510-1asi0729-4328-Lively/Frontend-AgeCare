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
    // Forzar idioma por defecto a inglés siempre
    translate.setDefaultLang('en');
    // Usar el idioma guardado en localStorage o el navegador, si existe
    const browserLang = localStorage.getItem('lang') || translate.getBrowserLang() || 'en';
    this.currentLang = browserLang;
    translate.use(browserLang);
  }

  useLanguage(language: string) : void {
    this.translate.use(language);
    this.currentLang = language;
    localStorage.setItem('lang', language);
  }
}
