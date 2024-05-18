import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { DataService } from '../../core/data.service';
import { AccountMapping } from '../../models/accountmapping.model';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
//filter and sort
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapping-table',
  templateUrl: './mapping-table.component.html',
  styleUrls: ['./mapping-table.component.css'],
})
export class MappingTableComponent implements OnInit {
  dataSource: MatTableDataSource<AccountMapping>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  displayedColumns: string[] = [
    'CompanyId',
    'MainAccount',
    'MainAccountDescription',
    'select',
    'delete',
  ];
  /**
  selectOptions = [
    'Anlagevermögen',
    'Baustoffe',
    'Chrombad',
    'Durchlaufposten',
    'Eigenkapital',
  ];
   */
  selectOptions: Array<{ display: string; value: string }> = [];

  searchControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  currentMode = 'HGB-GKV';

  constructor(private dataService: DataService, private http: HttpClient) {
    this.dataSource = new MatTableDataSource(this.dataService.getData());
    this.filteredOptions = of(
      this.selectOptions.map((option) => option.display)
    );
  }

  ngOnInit() {
    //const accountMappings = this.dataService.getData();
    const accountMappings: AccountMapping[] = [];

    this.dataService.getDisplayValues().subscribe((displayValues) => {
      console.log('Retrieved data:', displayValues);
      // Create AccountMapping instances here
      if (this.dataService.getData().length === 0) {
        this.dataService.getExampleData().forEach((dataItem) => {
          accountMappings.push(
            new AccountMapping(
              dataItem.CompanyId,
              dataItem.MainAccount,
              dataItem.MainAccountDescription,
              displayValues
            )
          );
        });
      }
      else {
        // this is the real call for data. above is only triggered when no data provided
        this.dataService.getData().forEach((dataItem) => {
          accountMappings.push(
            new AccountMapping(
              dataItem.CompanyId,
              dataItem.MainAccount,
              dataItem.MainAccountDescription,
              displayValues
            )
          );
        });
      }

      this.dataSource = new MatTableDataSource(accountMappings);
      this.dataSource.sort = this.sort;
      console.log('Filter Options next!');

      this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }
  // filter function that filter the displayed table according to the input
  // TODO: von bis filter. preload all values then select the corrrect ones (siehe Napta)

  // filters the values of the input for each row selection
  private _filter(value: string): string[] {
    console.log('Filter Value:', value);
    const filterValue = value.toLowerCase();

    const filteredOptions = this.selectOptions
      .map((option) => option.display)
      .filter((option) => option.toLowerCase().includes(filterValue));
    console.log('Filtered Options:', filteredOptions);
    return filteredOptions;
  }

  moveFocusUp(rowIndex: number): void {
    if (rowIndex > 0) {
      this.blurInputField(rowIndex);
      this.focusInputField(rowIndex - 1);
    }
  }

  moveFocusDown(rowIndex: number): void {
    if (rowIndex < this.dataSource.data.length - 1) {
      this.blurInputField(rowIndex);
      this.focusInputField(rowIndex + 1);
    }
  }

  copyDownSelection(rowIndex: number): void {
    const currentSelection =
      this.dataSource.data[rowIndex].selectionControl.value;

    if (currentSelection) {
      this.dataSource.data[rowIndex + 1].selectionControl.setValue(
        currentSelection
      );
      // Close current dropdown by triggering a blur event
      this.blurInputField(rowIndex);
      // Move focus to the next line
      this.focusInputField(rowIndex + 1);
    }
  }

  private focusInputField(rowIndex: number): void {
    const inputFieldsArray = this.inputFields.toArray();
    if (inputFieldsArray[rowIndex]) {
      const inputFieldElement = inputFieldsArray[rowIndex].nativeElement;
      console.log('InputFieldType: ', inputFieldElement);
      inputFieldElement.focus();
    }
  }

  private blurInputField(rowIndex: number): void {
    const inputFieldsArray = this.inputFields.toArray();
    console.log('Blur field: ', rowIndex);
    if (inputFieldsArray[rowIndex]) {
      const inputFieldElement = inputFieldsArray[rowIndex].nativeElement;
      inputFieldElement.blur();
    }
  }

  clearInputField(rowIndex: number): void {
    if (this.dataSource.data[rowIndex]) {
      this.dataSource.data[rowIndex].selectionControl.reset('');
    }
  }

  ngAfterViewInit() {
    console.log(this.inputFields.toArray().length); // Log the length here
  }

  changeMode(newMode: string) {
    this.currentMode = newMode;
    // Additional logic for what happens when the mode changes
  }

  exportToJson(): void {
    const dataToExport = this.dataSource.data.map((item) => {
      return {
        CompanyId: item.CompanyId,
        MainAccount: item.MainAccount,
        MainAccountDescription: item.MainAccountDescription,
        MappingKey: item.selectionControl.value,
      };
    });
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
