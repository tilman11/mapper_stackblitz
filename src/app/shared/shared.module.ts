import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PhaseSwitcher } from './phase-switcher/phase-switcher.component';
import { SearchDropdownComponent } from './search-dropdown/search-dropdown.component';


@NgModule({
  declarations: [PhaseSwitcher, SearchDropdownComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PhaseSwitcher, SearchDropdownComponent]
})
export class SharedModule { }
