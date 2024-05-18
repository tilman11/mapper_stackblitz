import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MappingTableComponent } from './mapping-table/mapping-table.component';
import { MappingRoutingModule } from './mapping-routing.module'; // If you have routing
import { SharedModule } from '../shared/shared.module';


// Angular Material Modules
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';


// Forms Module for Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';
import { MappingSidebarComponent } from './mapping-sidebar/mapping-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MappingRoutingModule,
    MatChipsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSortModule,
    MatInputModule,
    SharedModule,
  ],
  declarations: [
    MappingTableComponent, // Declare the FileLoadComponent
    MappingSidebarComponent
  ],
  exports: [],
})
export class MappingModule {}
