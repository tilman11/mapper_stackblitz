import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <h1>Welcome to Our Application!</h1>
    <p>This is the welcome page.</p>
    <button>Start Mapping</button>
  `,
  styles: [`
    h1 {
      color: #5b6de0;
    }
    p {
      font-size: 18px;
    }
  `]
})
export class WelcomeComponent { }
