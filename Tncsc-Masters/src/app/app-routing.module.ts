import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegionMasterComponent } from './region-master/region-master.component';
import { AuthGuard } from './services/auth.guard';
import { GunnyTypeMasterComponent } from './gunny-type-master/gunny-type-master.component';
import { TransactionMasterComponent } from './MasterNew/transaction-master/transaction-master.component';
import { TypeMasterComponent } from './MasterNew/type-master/type-master.component';
import { DepositorMasterComponent } from './MasterNew/depositor-master/depositor-master.component';
import { CerealNoncerealComponent } from './MasterNew/cereal-noncereal/cereal-noncereal.component';
import { CommodityMasterComponent } from './MasterNew/commodity-master/commodity-master.component';
import { VehicleMasterComponent } from './MasterNew/vehicle-master/vehicle-master.component';
import { WeighmentMasterComponent } from './MasterNew/weighment-master/weighment-master.component';
import { RailYardMasterComponent } from './MasterNew/rail-yard-master/rail-yard-master.component';
import { SchemeMasterComponent } from './MasterNew/scheme-master/scheme-master.component';
import { SchemeCommodityMasterComponent } from './MasterNew/scheme-commodity-master/scheme-commodity-master.component';
import { PackingMasterComponent } from './MasterNew/packing-master/packing-master.component';
import { GodownProfileComponent } from './godown-profile/godown-profile.component';
import { HomeComponent } from './home/home.component';
import { IssuerMasterComponent } from './MasterNew/IssuerMaster/Issuer-master.component';
import { GodownMasterComponent } from './MasterNew/godown-master/godown-master.component';
import { MRMDataComponent } from './MasterNew/mrmdata/mrmdata.component';
import { FCIDataComponent } from './MasterNew/fcidata/fcidata.component';
import { AADSDataComponent } from './MasterNew/aadsdata/aadsdata.component';
import { HullingAgenciesComponent } from './MasterNew/hulling-agencies/hulling-agencies.component';
import { DepositorsComponent } from './MasterNew/supplierdata/depositors.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Home', component: HomeComponent},
  { path: 'menu', component: MenuComponent },
  { path: 'GodownMaster', component: GodownMasterComponent },
  { path: 'DepositorMaster', component: DepositorMasterComponent },
  { path: 'TypeMaster', component: TypeMasterComponent },
  { path: 'TransactionMaster', component: TransactionMasterComponent },
  { path: 'CerealNoncereal', component: CerealNoncerealComponent },
  { path: 'CommodityMaster', component: CommodityMasterComponent },
  { path: 'VehicleMaster', component: VehicleMasterComponent },
  { path: 'WeighmentMaster', component: WeighmentMasterComponent },
  { path: 'RailwayYardMaster', component: RailYardMasterComponent },
  { path: 'SchemeMaster', component: SchemeMasterComponent },
  { path: 'SchemeCommodityMaster', component: SchemeCommodityMasterComponent },
  { path: 'PackingMaster', component: PackingMasterComponent },
  { path: 'Godown Profile', component: GodownProfileComponent, canActivate: [AuthGuard] },
  { path: 'Issuer Master Report', component: IssuerMasterComponent, canActivate: [AuthGuard] },
  { path: 'RegionMaster', component: RegionMasterComponent },
  { path: 'GunnyType', component: GunnyTypeMasterComponent },
  { path: 'MrmData', component: MRMDataComponent },
  { path: 'FciData', component: FCIDataComponent },
  { path: 'AADS', component: AADSDataComponent },
  { path: 'HullingAgencies', component: HullingAgenciesComponent },
  { path: 'SuppliersData', component: DepositorsComponent },
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { 

  
}
