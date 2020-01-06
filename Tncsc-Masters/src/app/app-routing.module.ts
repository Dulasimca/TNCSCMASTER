import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegionMasterComponent } from './region-master/region-master.component';
import { AuthGuard } from './services/auth.guard';
import { GunnyTypeMasterComponent } from './gunny-type-master/gunny-type-master.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'regions', component: RegionMasterComponent },
  { path: 'gunnyType', component: GunnyTypeMasterComponent },
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { 

  
}
