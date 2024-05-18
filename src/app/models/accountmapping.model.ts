import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

export class AccountMapping {
  CompanyId: string;
  MainAccount: string;
  MainAccountDescription: string;
  selectionControl = new FormControl();
  filteredOptions: Observable<string[]>; //string[]; // Holds the filtered options
  allOptions = [
    'Anlagevermögen',
    'Baustoffe',
    'Chrombad',
    'Durchlaufposten',
    'Eigenkapital',
  ];

  constructor(
    companyId: string,
    mainAccount: string,
    mainAccountDescription: string,
    selectOptions: string[]
  ) {
    this.CompanyId = companyId;
    this.MainAccount = mainAccount;
    this.MainAccountDescription = mainAccountDescription;
    this.allOptions = selectOptions; // Set allOptions from the constructor argument

    this.filteredOptions = this.selectionControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterOptions(value))
    );
  }

  private filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private filterOptions(value: string): string[] {
    // Return the filtered options based on the value
    return this.allOptions.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }
}
