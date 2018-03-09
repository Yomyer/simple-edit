import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  entity = {
    title: 'xDD',
    content: 'lorem',
    date: new Date()
  };
}
