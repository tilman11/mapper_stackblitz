import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../core/data.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-load',
  //template: '<p>Cool boys!</p>',
  templateUrl: './file-load.component.html',
  styleUrls: ['./file-load.component.css'],
})
export class FileLoadComponent {
  constructor(private dataService: DataService) {}

  @ViewChild('fileInput') fileInput!: ElementRef;
  excelData: any[] = [];

  onInit() {
    console.log('Starting FileLoadComponent!');
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files) {
      const file = event.dataTransfer.files[0];
      this.dataService.processFile(file);
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
    //add file processing like in onFileDrop!!
  }

  onFileChange(event: any) {
    //const file = event.target.files[0];
    console.log(event.target.files.length);
    if (event.target.files.length === 1) {
      const file = event.target.files[0];
      this.dataService.processFile(file);
      // problem: the following get data is not waiting for the service to process the file!
      this.excelData = this.dataService.getData();
      console.log("onFileChange", this.excelData);
//      this.dataService.getData();
    }
  }

  getTableHeaders(data: any[]): string[] {
    return data.length > 0 ? Object.keys(data[0]) : [];
  }

  getRowData(row: any): string[] {
    return Object.values(row);
  }
}
