import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: DashboardComponent
  },
  {
    path: `billing`,
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: `http://localhost:4201/remoteEntry.js`,
        remoteName: `billing`,
        exposedModule: `./BillingModule`
      }).then(m => m.BillingModule)
        .catch(error => console.log(`error => `, error))
    }
  },
  {
    path: `reports`,
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: `http://localhost:4202/remoteEntry.js`,
        remoteName: `reports`,
        exposedModule: `./ReportsModule`
      }).then(m => m.ReportsModule).catch(error => console.log(`error => `, error))
    }
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
