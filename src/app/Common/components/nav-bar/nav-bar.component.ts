import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Usuario/class/Usuario';
import { UsuarioService } from 'src/app/Usuario/services/usuario.service';

@Component({
  selector: 'app-nav-bar',
  styleUrls: ['./nav-bar.component.css'],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent{
  constructor(private _usuarioService:UsuarioService){}
}
