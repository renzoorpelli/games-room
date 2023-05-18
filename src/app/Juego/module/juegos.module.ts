import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from '../routing/juegos-routing.module';
import { AhorcadoComponent } from '../Ahorcado/components/ahorcado.component';
import { MayorOMenorComponent } from '../MayorOMenor/components/mayor-omenor.component';
import { AhorcadoService } from '../Ahorcado/services/ahorcado.service';
import { MayorOMenorService } from '../MayorOMenor/services/mayor-omenor.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOMenorComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    HttpClientModule
  ],
  providers: [
    AhorcadoService,
    MayorOMenorService
  ]
})
export class JuegosModule { }
