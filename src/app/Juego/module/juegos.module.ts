import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from '../routing/juegos-routing.module';
import { AhorcadoComponent } from '../Ahorcado/components/ahorcado.component';
import { MayorOMenorComponent } from '../MayorOMenor/components/mayor-omenor.component';
import { AhorcadoService } from '../Ahorcado/services/ahorcado.service';
import { MayorOMenorService } from '../MayorOMenor/services/mayor-omenor.service';
import { HttpClientModule } from '@angular/common/http';
import { PreguntadosComponent } from '../Preguntados/components/preguntados.component';
import { PreguntadosService } from '../Preguntados/services/preguntados.service';
import { PongService } from '../Pong/services/pong.service';
import { PongComponent } from '../Pong/components/pong.component';

@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    PongComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    HttpClientModule
  ],
  providers: [
    AhorcadoService,
    MayorOMenorService,
    PreguntadosService,
    PongService
  ]
})
export class JuegosModule { }
