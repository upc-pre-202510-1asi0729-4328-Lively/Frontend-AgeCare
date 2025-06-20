import { Component, HostListener } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.css'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    NgOptimizedImage,
    NgIf,
    LanguageSwitcherComponent,
    TranslateModule,
  ]
})
export class HeaderContentComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // Detecta clics fuera del menú
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-links') && !target.closest('.menu-toggle')) {
      this.menuOpen = false;
    }
  }
}
