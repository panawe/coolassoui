import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LightboxModule } from 'angular2-lightbox';
import {HttpModule} from '@angular/http'; 


import {
  TabViewModule, EditorModule, SharedModule, FieldsetModule, ProgressBarModule,
  FileUploadModule, StepsModule, InputTextareaModule, SpinnerModule,
  GrowlModule, ChartModule, PasswordModule, ToggleButtonModule, CarouselModule,
  DataListModule, CheckboxModule, InputTextModule, SelectButtonModule,
  CalendarModule, RadioButtonModule, DropdownModule, InputMaskModule,
  AutoCompleteModule, DataTableModule, DialogModule, ListboxModule, AccordionModule,
  GalleriaModule, MessagesModule, TreeModule, TreeNode, OrganizationChartModule,
  DataGridModule, PanelModule, UIChart, PickListModule, ScheduleModule
} from 'primeng/primeng';


@NgModule({
  declarations: [],

  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule, ToggleButtonModule, FieldsetModule,
    TabViewModule, EditorModule, SharedModule, FileUploadModule, InputMaskModule, SpinnerModule,
    StepsModule, InputTextareaModule, GrowlModule, ChartModule, SelectButtonModule, OrganizationChartModule,
    PasswordModule, DataListModule, CheckboxModule, InputTextModule, ListboxModule, CarouselModule,
    CalendarModule, RadioButtonModule, DropdownModule, AutoCompleteModule, ScheduleModule, ProgressBarModule,
    DataTableModule, DialogModule, GalleriaModule, MessagesModule, TreeModule, AccordionModule,
    DataGridModule, PanelModule, ScheduleModule,LightboxModule
  ],

  exports: [
    // angular exports
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule,

    // primeng exports
    TabViewModule, EditorModule, SharedModule, FileUploadModule, ToggleButtonModule, SpinnerModule, FieldsetModule, ProgressBarModule,
    StepsModule, InputTextareaModule, GrowlModule, ChartModule, SelectButtonModule, ListboxModule, AccordionModule,LightboxModule,
    PasswordModule, DataListModule, CheckboxModule, InputTextModule, InputMaskModule, ScheduleModule, CarouselModule,
    CalendarModule, RadioButtonModule, DropdownModule, AutoCompleteModule, UIChart, PickListModule, OrganizationChartModule,
    DataTableModule, DialogModule, GalleriaModule, MessagesModule, TreeModule, DataGridModule, PanelModule, ScheduleModule
  ],
})

export class CommonSharedModule {

}
