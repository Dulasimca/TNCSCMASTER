import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { BlockUIModule } from 'primeng/blockui';
import { ListboxModule } from 'primeng/listbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExcelService } from './services/excel.service';
import { RestAPIService } from './services/restAPI.service';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RegionMasterComponent } from './region-master/region-master.component';
import { AppRoutingModule } from './app-routing.module';
import { GunnyTypeMasterComponent } from './gunny-type-master/gunny-type-master.component';
import { DepositorMasterComponent } from './MasterNew/depositor-master/depositor-master.component';
import { TypeMasterComponent } from './MasterNew/type-master/type-master.component';
import { TransactionMasterComponent } from './MasterNew/transaction-master/transaction-master.component';
import { CerealNoncerealComponent } from './MasterNew/cereal-noncereal/cereal-noncereal.component';
import { CommodityMasterComponent } from './MasterNew/commodity-master/commodity-master.component';
import { MenubarModule } from 'primeng/menubar';
import {InputMaskModule} from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { TableConstants } from './constants/table.constants';
import { StatusMessage } from './constants/Messages';
import { LoginService } from './login/login.service';
import { DatePipe } from '@angular/common';
import { PathConstants } from './constants/path.constants';
import { RoleBasedService } from './shared/role-based.service';
import { VehicleMasterComponent } from './MasterNew/vehicle-master/vehicle-master.component';
import { WeighmentMasterComponent } from './MasterNew/weighment-master/weighment-master.component';
import { RailYardMasterComponent } from './MasterNew/rail-yard-master/rail-yard-master.component';
import { SchemeMasterComponent } from './MasterNew/scheme-master/scheme-master.component';
import { SchemeCommodityMasterComponent } from './MasterNew/scheme-commodity-master/scheme-commodity-master.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    MenuComponent,
    DepositorMasterComponent,
    TypeMasterComponent,
    TransactionMasterComponent,
    CerealNoncerealComponent,
    CommodityMasterComponent,
    RegionMasterComponent,
    GunnyTypeMasterComponent,
    VehicleMasterComponent,
    WeighmentMasterComponent,
    RailYardMasterComponent,
    SchemeMasterComponent,
    SchemeCommodityMasterComponent
  ],
  imports: [
    BrowserModule,
    DialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule,
    TableModule,
    OverlayPanelModule,
    AppRoutingModule,
    // MenubarModule,
    BrowserAnimationsModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    FieldsetModule,
    CalendarModule,
    CardModule,
    PanelModule,
    TreeTableModule,
    SplitButtonModule,
    AutoCompleteModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    TooltipModule,
    BlockUIModule,
    // ListboxModule,
    // ProgressSpinnerModule,
    // InputMaskModule,
    // FileUploadModule
  ],
  providers: [AuthService, ConfirmationService, TableConstants, StatusMessage, LoginService,
    DatePipe, RestAPIService, PathConstants, ExcelService, MessageService, RoleBasedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
