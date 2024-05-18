import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from './data.service';
// Import other core services or components

@NgModule({
  imports: [
    CommonModule
    // Import other modules needed by services or components in CoreModule
  ],
  providers: [
    DataService,
    // Add other singleton services here
  ],
  declarations: [
    // Declare components that are used only once in the app, if any
  ],
  exports: [
    // Export any components or modules that should be accessible in other parts of the app
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
