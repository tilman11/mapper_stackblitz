import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//for mappping-table component
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

// Private modules
import { AppRoutingModule } from './app-routing.module';
// Import the components
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
// import { FileUploadComponent } from './file-upload/file-upload.component';
// import { PhaseSwitcherComponent } from './phase-switcher/phase-switcher.// //component';
//import { MappingTableComponent } from './mapping-table/mapping-table.component';
import { CoreModule } from './core/core.module';
import { DataLoadModule } from './dataload/dataload.module';
import { MappingModule } from './mapping/mapping.module';
// If you're using HttpClient, import HttpClientModule from '@angular/common/http'

@NgModule({
  declarations: [
    // Declare the components here
    AppComponent,
    // FileUploadComponent,
    // PhaseSwitcherComponent,
    //MappingTableComponent,
  ],
  imports: [
    // Import BrowserModule and other modules here
    BrowserModule,
    FormsModule,
    HttpClientModule, //(if using)
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    // for mapping-table
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    CoreModule,
    DataLoadModule,
    MappingModule,
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstraps the AppComponent
})
export class AppModule {}
