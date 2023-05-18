import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../Ahorcado/components/ahorcado.component';
import { AuthGuardService } from '../../Usuario/services/auth.service';
import { MayorOMenorComponent } from '../MayorOMenor/components/mayor-omenor.component';

const routes: Routes = [
  {path: "ahorcado", component: AhorcadoComponent, canActivate: [AuthGuardService]},
  {path: "mayoromenor", component: MayorOMenorComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
