import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [LoginComponent]
})
export class AppComponent {
  title = 'crema';
}
