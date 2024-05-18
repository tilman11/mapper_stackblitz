import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileLoadComponent } from './file-load/file-load.component';

const routes: Routes = [
  { path: '', component: FileLoadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataLoadRoutingModule { }
