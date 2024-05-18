import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingTableComponent } from './mapping-table/mapping-table.component';
import {MappingSidebarComponent} from './mapping-sidebar/mapping-sidebar.component';

const routes: Routes = [
  { path: '', component: MappingTableComponent },
  { path:'v2', component: MappingSidebarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRoutingModule { }
