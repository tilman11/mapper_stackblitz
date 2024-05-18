// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AccountMapping } from '../models/accountmapping.model';
import { NONE_TYPE } from '@angular/compiler';
import { map, Observable, of, tap } from 'rxjs';

import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private rawData = [
    {
      CompanyId: '1',
      MainAccount: '20234',
      MainAccountDescription: 'vermögen',
    },
    {
      CompanyId: '1',
      MainAccount: '20235',
      MainAccountDescription: 'etc',
    },
    {
      CompanyId: '1',
      MainAccount: '20236',
      MainAccountDescription: 'sonstige',
    },
    {
      CompanyId: '1',
      MainAccount: '20237',
      MainAccountDescription: 'imma vermögen',
    },
    {
      CompanyId: '2',
      MainAccount: '30231',
      MainAccountDescription: 'vebrbindlichkeiten',
    },
    {
      CompanyId: '2',
      MainAccount: '30232',
      MainAccountDescription: 'ic topics',
    },
    {
      CompanyId: '2',
      MainAccount: '30233',
      MainAccountDescription: 'storno',
    },
    {
      CompanyId: '33',
      MainAccount: '20234',
      MainAccountDescription: 'eigenkapital',
    },
    {
      CompanyId: '33',
      MainAccount: '10235',
      MainAccountDescription: 'verbindlichkeiten lul',
    },
    {
      CompanyId: '44',
      MainAccount: '23600',
      MainAccountDescription: 'perfekt',
    },
  ];

  private excelData: Array<{CompanyId: string, MainAccount: string, MainAccountDescription: string}> = [];

  constructor(private http: HttpClient) {}

  getExampleData(): AccountMapping[] {
    return this.rawData.map(
      (item) =>
        new AccountMapping(
          item.CompanyId,
          item.MainAccount,
          item.MainAccountDescription,
          []
        )
    );
  }

  getData(): AccountMapping[] {
    console.log("Trigger getData()", this.excelData.length);
    return this.excelData.map(
      (item) =>
        new AccountMapping(
          item.CompanyId,
          item.MainAccount,
          item.MainAccountDescription,
          []
        )
    );
  }

  getDisplayValuesString(): string[] {
    const b = this.http.get<Array<{ display: string; value: string }>>(
      '/assets/keylookup.json'
    );
    // Assuming selectOptions is of type Observable<Array<{ display: string; value: string }>>
    b.subscribe((options) => {
      const displayValues = options.map((option) => option.display);
      return displayValues;
      // Use displayValues here
      console.log(displayValues); // For example
    });
    return [''];
  }

  getDisplayValues(): Observable<string[]> {
    return this.http.get<any>('/assets/keylookup.json').pipe(
      tap((rawResponse) => console.log('Raw response:', rawResponse)), // Add this line for debugging
      map(optionsArray => optionsArray.map((option: { display: any; }) => option.display))
      );
  }

  getExampleDisplayValues(): Observable<string[]> {
    return of([
      'Anlagevermögen',
      'Baustoffe',
      'Chrombad',
      'Durchlaufposten',
      'Eigenkapital',
    ])
  }

  // Add more methods as needed for data manipulation


  processFile(file: File) {
    console.log("Start processFile().")
    if (!file) return;

    // Check if file is an Excel file
    if (
      file.type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      //  alert('Please upload an Excel file.');
      //  return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data_raw = XLSX.utils.sheet_to_json(worksheet);
      const data: Array<{CompanyId: string, MainAccount: string, MainAccountDescription: string}>  = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);
      this.validateColumns(data);
      this.excelData = data;
      this.getData();
    };
    reader.readAsBinaryString(file);
    console.log('File uploaded and processed successfully');
  }

  private validateColumns(data: any[]) {
    const requiredColumns = [
      'CompanyId',
      'MainAccount',
      'MainAccountDescription',
    ];
    if (data.length > 0 && requiredColumns.every((col) => col in data[0])) {
      console.log('File is valid');
      // Handle valid file here
    } else {
      alert('Required columns are missing.');
    }
  }
}
