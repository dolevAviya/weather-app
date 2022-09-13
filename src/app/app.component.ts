import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'abra-weather';
  isDarkMode: boolean = false;

  toggleTheme() {
    document.body.classList.toggle('dark');
    this.isDarkMode = !this.isDarkMode;
  }
}
