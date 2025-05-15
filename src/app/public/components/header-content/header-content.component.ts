import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {MatIcon} from '@angular/material/icon';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-header-content',
  imports: [
    MatToolbar,
    MatIcon,
    LanguageSwitcherComponent,
    RouterModule
  ],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})
export class HeaderContentComponent {

}
