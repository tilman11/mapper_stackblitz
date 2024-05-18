import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileLoadComponent } from './file-load/file-load.component';
import { DataLoadRoutingModule } from './dataload-routing.module'; // Assuming you have routing
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DataLoadRoutingModule, // Import routing module if you're using routing
    SharedModule,
  ],
  declarations: [
    FileLoadComponent, // Declare the FileLoadComponent
  ],
})
export class DataLoadModule {}
