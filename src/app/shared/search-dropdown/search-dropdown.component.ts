import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.css']
})
export class SearchDropdownComponent {
  searchControl = new FormControl();
  allOptions = ['Option 1', 'Boption 2', 'Coption 3', /* ... more options ... */];
  filteredOptions: string[] = [];

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filterOptions(value);
    });
  }

  private filterOptions(value: string) {
    if (!value) {
      this.filteredOptions = [];
      return;
    }
    this.filteredOptions = this.allOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }

  onOptionSelected(option: string) {
    this.searchControl.setValue(option);
    this.filteredOptions = [];
    // Additional logic when an option is selected, if needed
  }
}
