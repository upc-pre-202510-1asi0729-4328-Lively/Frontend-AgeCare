import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { FooterContentComponent } from './public/components/footer-content/footer-content.component';
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderContentComponent, FooterContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'open-frontend';
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
